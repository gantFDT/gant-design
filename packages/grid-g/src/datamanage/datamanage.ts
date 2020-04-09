import { ColumnApi, GridApi, RowNode, RowNodeTransaction } from 'ag-grid-community';
import { List, fromJS } from 'immutable'
import { EventEmitter } from 'events'


import History from './history'
import { originKey, cloneDeep, findChildren, removeDeepItem, getPureRecord, getPureList, getIndexPath } from './utils'
import { Record, DataActions, RemoveCallBack } from '../interface'
import { isnumber, isbool } from '../utils'


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

    gridApi: GridApi
    columnApi: ColumnApi

    // 获取nodeid
    getRowNodeId: (d: any) => string
    // 获取group key path
    getServerSideGroupKey: (d: any) => string
    childrenName: string = 'children'


    constructor() {
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
        const state = fromJS(this._originList)
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

    /**
     * 
     * @param item 添加的数据
     * @param index 添加的位置
     */
    create(item: T, index?: number): void;
    /**
     * 
     * @param item 添加的数据
     * @param node 添加的相对节点
     * @param index 添加的位置
     * @param isChild 是否是作为子节点插入
     */
    create(item: T, node: RowNode, index?: number, isChild?: boolean): void
    create(item: T, node: RowNode, isChild?: boolean, index?: number): void
    create(item: T, node: RowNode | number = 0, index: number | boolean = 0, isChild?: number | boolean) {
        const itemNode = fromJS({ ...item, _rowType: DataActions.add })
        let newState = null
        const id = this.getRowNodeId(item)
        this._add.set(id, item)
        // const indexPath = getIndexPath()
        if (isnumber(node)) {
            const index = node
            newState = this.state.insert(index, itemNode)
        } else {
            const indexPath = getIndexPath(node).flatMap(index => [index, this.childrenName])
            let addIndex: number, append: boolean
            if (isnumber(index)) {
                addIndex = index
                if (isbool(isChild)) append = isChild
                else append = true // undefined
            } else {
                append = index
                if (isnumber(isChild)) addIndex = isChild
                else addIndex = 0 // undefined
            }
            const paths = append ? indexPath : indexPath.slice(0, -2)
            newState = this.state.updateIn(paths, children => children ? children.insert(addIndex, itemNode) : List([]).push(itemNode))
        }

        if (newState !== this.state) this.history.push(newState)
    }

    remove(cb: RemoveCallBack, removeChildren: boolean = true): Promise<Array<RowNode>> {
        const selectedNodes = this.gridApi.getSelectedNodes()
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
                const rowKey = this.getRowNodeId(data)
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

            const keyPathsArray = selectedNodes.map(getIndexPath)
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
                    return state.update(startIndex, ({ ...item }) => removeDeepItem<T>(this.childrenName, resetPath, item))
                }
                return state
            }, this.state)
            // 添加history数据
            this.history.push(newState)
            // 调用api删除数据
            this.gridApi.updateRowData({
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


        let keyPath = getIndexPath(changed.node)
        let newState = this.state

        const [startIndex, ...resetPath] = keyPath
        if (keyPath.length === 1) {
            newState = newState.set(startIndex, data)
        } else if (keyPath.length >= 2) {
            newState = newState.update(startIndex, ({ ...item }) => removeDeepItem<T>(this.childrenName, resetPath, item, data))
        }
        this.history.push(newState)
    }

    /**添加子级节点 */
    appendChild(groupKeys: (string | number)[], children: T[]) {
        this.history.appendChild(groupKeys, this.childrenName, fromJS(children), this.getServerSideGroupKey)
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