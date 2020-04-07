import { ColumnApi, GridApi, RowNode, RowNodeTransaction } from 'ag-grid-community';
import { List } from 'immutable'
import { EventEmitter } from 'events'
import { groupBy } from 'lodash'


import History from './history'
import { cloneDeep, findChildren, removeDeepItem } from './utils'
import { Record } from '../interface'
import { isnumber } from '../utils'


// TODO:移动
// TODO:取消编辑时恢复添加和删除的数据
// TODO:保存时返回diff数据，并且清空
// TODO:修改添加功能API
class DataManage<T extends Record = any> extends EventEmitter {


    // private _state: List<T>
    private _originList: T[]
    private _pureList: T[]
    private _currentPureList: T[]
    private history: History<T>
    private updated = false // 通知getCurrentList当前列表是否发生变化
    private _dataSource: T[]
    private _removed: any[] = []
    private _add: any[] = []
    private _modify: any[] = []

    static getRowNodeId: (d: any) => string
    static treeDataChildrenName: string = 'children'


    constructor(public gridApi: React.MutableRefObject<GridApi>, public columnApi: React.MutableRefObject<ColumnApi>) {
        super();
        this.history = new History()
        this.history.on("manager:update", this.update.bind(this))
    }

    /**是否有变更 */
    get isChanged() {
        return this.history.isChanged
    }

    get state() {
        return this.history.currentState
    }

    // 用于渲染的包含__origin的数据,
    get renderList(): T[] {
        return this.state.toJS()
    }

    // 初始化
    reset() {
        const state = List(this._originList)
        this.history.init(state)
    }

    // 编辑时更新history并且触发组件更新
    private update() {
        // 触发组件更新，将最新的列表返回
        this.emit("update", this.renderList)
        this.updated = true
    }

    init(dataSource: T[]) {
        // 添加__origin属性
        const [list, pureList] = cloneDeep(dataSource)
        // 重置的时候使用的原始数据
        this._originList = list
        this._pureList = pureList
        this._currentPureList = pureList
        this.reset()
        /**清空diff数据 */
        this._add = []
        this._modify = []
        this._removed = []
    }

    // // 获取原始纯净数据、不会包含新增的数据
    get purelist() {
        return this._pureList
    }

    // // 获取当前状态下的数据行
    // getCurrentList() {
    //     console.log(this.updated)
    //     if (this.updated) {
    //         this.updated = false
    //         const [, pureList] = cloneDeep(this.getRenderList())
    //         this._currentPureList = pureList
    //         return pureList
    //     }
    //     return this._currentPureList
    // }

    create(index: number, item: T): void;

    create(path: string[], index: number, item: T): void;
    // 新增节点
    create(path: string[] | number, index: number | T, item?: T) {
        let newState = null
        if (isnumber(path) && !isnumber(index)) {
            // 添加到根节点
            const inserIndex = Math.max(Math.min(path, this.state.size), 0)
            newState = this.state.insert(inserIndex, index)
        } else if (!isnumber(path) && isnumber(index)) {
            // path, index, item
            let list = this.state;
            const pathCount = path.length
            let keyPath = path.flatMap((key, index) => {
                const pathIndex = list.findIndex(value => value["g-row-key"] === key)
                const item = list.get(pathIndex);
                if (index !== pathCount - 1 && item.children) {
                    list = List(item.children as T[])
                }
                return [pathIndex, 'children']
            })
            let subList = this.state.getIn(keyPath)
            if (!Array.isArray(subList)) {
                subList = []
                subList.push(item)
            } else {
                const inserIndex = Math.max(Math.min(index, subList.length), 0)
                subList = [...subList]
                subList.splice(inserIndex, 0, item)
            }
            newState = this.state.setIn(keyPath, subList);
        }
        // 更新history
        if (newState !== this.state) this.history.push(newState)
    }


    remove(rows: RowNode[], removeChildren: boolean): Promise<Array<RowNode>> {
        const children = rows.flatMap(node => findChildren(node))

        return new Promise<RowNode[]>((res, rej) => {
            if (removeChildren) {
                const deleteRows = [...rows, ...children]
                this._removed.push.apply(this._removed, deleteRows)
                res(deleteRows)
            } else {
                if (children.length) {
                    rej("某个节点的子节点未选中")
                }
                this._removed.push.apply(this._removed, rows)
                res(rows)
            }
        }).then((deleteRows) => {
            const keyPathsArray = rows.map(row => {
                let currentNode = row
                let keyPath = []
                while (currentNode.level >= 0) {
                    keyPath.unshift(currentNode.childIndex)
                    currentNode = currentNode.parent
                }
                return keyPath
            })
            const keyMap = new Map<string, number[]>();
            keyPathsArray.forEach((paths) => {
                const key = paths.join('')
                if (keyMap.size > 0) {
                    const pathstr = keyMap.keys()
                    // 当前节点的父节点已添加到数组中
                    const hasParent = [...pathstr].some(p => key.startsWith(p))
                    if (!hasParent) {
                        keyMap.set(key, paths)
                    }
                    // 如果map中有当前节点的子节点，需要删除掉
                    for (let p of pathstr) {
                        if (p.startsWith(key)) {
                            keyMap.delete(p)
                        }
                    }
                } else {
                    keyMap.set(key, paths)
                }
            })


            const newState = [...keyMap.values()].reduce((state, keyPath) => {
                const [startIndex, ...resetPath] = keyPath
                if (keyPath.length === 1) {
                    return state.delete(startIndex)
                } else if (keyPath.length >= 2) {
                    return state.update(startIndex, ({ ...item }) => removeDeepItem<T>(DataManage.treeDataChildrenName, resetPath, item))
                }
                return state
                // return state.deleteIn(keyPath)
            }, this.state)
            this.history.push(newState)
            return deleteRows
        })

    }

    // 修改
    modify(changed: any) {
        this._modify.push(changed)
        const { data } = changed
        let node = changed.node
        let keyPath = []
        let newState = this.state
        while (node.level >= 0) {
            keyPath.push(node.childIndex)
            node = node.parent
        }
        const [startIndex, ...resetPath] = keyPath.reverse()
        if (keyPath.length === 1) {
            newState = newState.set(startIndex, data)
        } else if (keyPath.length >= 2) {
            newState = newState.update(startIndex, ({ ...item }) => removeDeepItem<T>(DataManage.treeDataChildrenName, resetPath, item, data))
        }
        this.history.push(newState)
    }

    // // 移动
    // move() {

    // }

    /**更新diff数据 */
    updateDiff(diff: RowNodeTransaction) {
        this._removed.push.apply(this._removed, diff.remove)
        this._add.push.apply(this._add, diff.add)
        this._modify.push.apply(this._modify, diff.update)
    }


    /**添加状态 */
    push(list: T[]) {
        const state = List(list)
        // 添加一个新状态并且不触发更新
        this.history.push(state)
    }

    // 撤销
    undo() {
        this.history.undo()
    }

    // 前进
    redo() {
        this.history.redo()
    }


    // 是否可以前进
    public get canRedo() {
        return this.history.canRedo
    }

    // 是否可以撤销
    public get canUndo() {
        return this.history.canUndo
    }


}

export default DataManage