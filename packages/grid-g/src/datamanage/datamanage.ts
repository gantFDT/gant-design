import { ColumnApi, GridApi, RowNode, RowNodeTransaction } from 'ag-grid-community';
import { List } from 'immutable'
import { EventEmitter } from 'events'


import History from './history'
import { originKey, cloneDeep, findChildren, removeDeepItem, getPureRecord, getPureList } from './utils'
import { Record, DataActions, RemoveCallBack } from '../interface'
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
    private _removed = new Map<string, any>()
    private _add = new Map<string, any>()
    private _modify = new Map<string, any>()
    private _dataSource: T[]

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

    // 是否可以前进
    public get canRedo() {
        return this.history.canRedo
    }

    // 是否可以撤销
    public get canUndo() {
        return this.history.canUndo
    }

    /**
     * 获取原始纯净数据、不会包含新增的数据
     * @deprecated
     */
    get purelist() {
        return this._pureList
    }

    // 撤销
    undo() {
        this.history.undo()
    }

    // 前进
    redo() {
        this.history.redo()
    }

    // 初始化
    reset() {
        const state = List(this._originList)
        this.history.init(state)
    }

    /**进入编辑，初始化状态 */
    edit() {

    }

    /**取消编辑 */
    cancel() {
        const firstList = this.history.first
        this.history.init(firstList)
    }

    /**保存, 清空历史栈 */
    save() {
        const lastList = this.history.last
        const list = getPureList(this.renderList)
        const diff = this.getDiff()
        this.history.init(lastList)

        return {
            list,
            diff
        }
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
        this._add = new Map<string, any>()
        this._modify = new Map<string, any>()
        this._removed = new Map<string, any>()
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
            this._add.set(DataManage.getRowNodeId(index), index)
            newState = this.state.insert(inserIndex, { ...index, _rowType: DataActions.add })
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
            this._add.set(DataManage.getRowNodeId(item), { ...item, _rowType: DataActions.add })
            newState = this.state.setIn(keyPath, subList);
        }
        // 更新history
        if (newState !== this.state) this.history.push(newState)
    }


    remove(cb: RemoveCallBack, removeChildren: boolean = true): Promise<Array<RowNode>> {
        const selectedNodes = this.gridApi.current.getSelectedNodes()
        const selected = selectedNodes.map(node => node.data)
        return new Promise((res, rej) => {
            let allowDelete: boolean | Promise<boolean> = true
            if (cb) allowDelete = cb(selected)
            res(allowDelete)
        }).then(allowDelete => {
            if (allowDelete) {
                if (selectedNodes.length) {
                    const children = selectedNodes.flatMap(node => findChildren(node))
                    if (removeChildren) {
                        const deleteRows = [...selectedNodes, ...children]
                        return deleteRows
                    } else {
                        if (children.length) {
                            throw new Error("某个节点的子节点未选中")
                        }
                        return selectedNodes
                    }
                }
            }
            return Promise.reject()
        }).then((deleteRows) => {
            /**处理diff数据 */
            deleteRows.forEach(({ data }) => {
                const rowKey = DataManage.getRowNodeId(data)
                if (!data[originKey]) {
                    // 添加的节点
                    if (this._add.has(rowKey)) this._add.delete(rowKey)
                } else {
                    if (data._rowType === DataActions.modify && this._modify.has(rowKey)) {
                        // 移除修改的节点
                        this._modify.delete(rowKey)
                    }
                    this._removed.set(rowKey, data[originKey])
                }
            })

            const keyPathsArray = selectedNodes.map(row => {
                let currentNode = row
                let keyPath = []
                while (currentNode.level >= 0) {
                    keyPath.unshift(currentNode.childIndex)
                    currentNode = currentNode.parent
                }
                return keyPath
            })
            /**处理删除的节点中同时包含子父节点时，从keyPathsArray去掉子节点id */
            // [[0,2],[0,3], [0,3,4]] ===> [[0,2], [0,3]]
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
            }, this.state)
            // 添加history数据
            this.history.push(newState)
            // 调用api删除数据
            this.gridApi.current.updateRowData({
                remove: deleteRows.map(node => node.data)
            })
            return deleteRows
        })

    }

    // 修改
    modify(changed: any) {
        const { data, node: { id } } = changed
        // 添加到对应的modify数组
        // const id = DataManage.getRowNodeId(data)
        if (data[originKey]) {
            this._modify.set(id, getPureRecord(data))
        } else {
            // 添加到add数组
            data._rowType = DataActions.add
            this._add.set(id, getPureRecord(data))
        }


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

    /**添加子级节点 */
    appendChild(idPaths: string[], children: T[]) {
        const indexPaths: number[] = idPaths.map(id => this.gridApi.current.getRowNode(id).childIndex)
        this.history.addpenChild(indexPaths, children)
    }

    // // 移动
    // move() {

    // }

    getDiff(): RowNodeTransaction {
        return {
            add: getPureList([...this._add.values()]),
            remove: getPureList([...this._removed.values()]),
            update: getPureList([...this._modify.values()])
        }
    }

}

export default DataManage