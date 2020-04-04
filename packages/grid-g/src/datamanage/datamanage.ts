import { ColumnApi, GridApi } from 'ag-grid-community';
import { List } from 'immutable'
import { EventEmitter } from 'events'


import History from './history'
import { cloneDeep } from './utils'
import { Record } from '../interface'
import { isnumber } from '../utils'

class DataManage<T extends Record = any> extends EventEmitter {


    // private _state: List<T>
    private _originList: T[]
    private _pureList: T[]
    private _currentPureList: T[]
    private history: History<T>
    private updated = false // 通知getCurrentList当前列表是否发生变化
    private _dataSource: T[]

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

    // // 删除
    // delete(index: number): void
    // delete(path: string[], index: number): void
    // delete(path: string[] | number, index?: number) {
    //     let newState = this.state;
    //     if (this.pathIsNumber(path)) {
    //         if (path >= 0 && path <= this.state.size) {
    //             newState = this.state.delete(path)
    //         }
    //     }
    //     else {
    //         let list = this.state;
    //         const pathCount = path.length;
    //         const keyPath = path.flatMap((key, index) => {
    //             const pathIndex = list.findIndex(value => value["g-row-key"] === key)
    //             const item = list.get(pathIndex)
    //             if (!(pathIndex < 0 || pathIndex > list.size) && index < pathCount - 1) {
    //                 list = List(item.children as T[])
    //             }

    //             return [pathIndex, "children"]
    //         })
    //         if (keyPath.length) {
    //             let subList = this.state.getIn(keyPath)
    //             if (subList.length) {
    //                 subList = [...subList]
    //                 subList.splice(index, 1)
    //             }
    //             newState = this.state.setIn(keyPath, subList)
    //         }
    //     }
    //     if (newState !== this.state) this.updateHistory(this.history.push(newState))
    // }

    // // 修改
    // modify() {

    // }

    // // 移动
    // move() {

    // }

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