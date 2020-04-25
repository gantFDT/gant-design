import { List, Record, Map, fromJS } from 'immutable'
import { EventEmitter } from 'events'
import { updateStateByKey } from "./utils"
import { isList } from "../utils"


interface State<T> {
    index: number,
    list?: List<List<T>>,
    trash?: List<List<T>>,
    diff?: List<Map<string, T>>
}

interface DiffItem {
    add: object,
    modify: object,
    remove: object
}
const initstate: State<any> = {
    index: -1,
    list: List([]),
    trash: List([]),
    diff: List([])
}

class History<T> extends EventEmitter {

    private index: number = initstate.index
    private list: List<List<T>> = initstate.list
    private trash: List<List<T>> = initstate.trash
    private diff: List<Map<string, any>> = initstate.diff

    constructor() {
        super()
    }

    private merge(obj: State<T>, init: boolean = false) {
        this.index = obj.index
        this.list = obj.list || this.list
        this.trash = obj.trash || this.trash
        this.diff = obj.diff || this.diff
        if (!init) {
            this.emit("manager:update")
        }
        return this
    }

    // 是否可以撤销
    public get canUndo() {
        return this.list.size > 1
    }

    // 是否可以前进
    public get canRedo() {
        return this.trash.size > 0
    }

    public get isChanged() {
        return this.currentDiff.some(d => d.size > 0)
    }

    /**获取当前状态 */
    public get currentState() {
        return this.list.get(this.index)
    }

    get currentDiff() {
        return this.diff.get(this.index)
    }

    get first() {
        return this.list.first()
    }

    get last() {
        return this.list.last()
    }

    init(state: List<T>) {
        return this.merge(initstate, true).push(state)
    }


    /**替换状态 */
    appendChild(groupKeys: (number | string)[], key: string, children: List<T>, getGroupKey: (d: any) => string | number, isCompute: boolean) {
        if (isCompute) {
            //计算模型下
            this.list = this.list.map(state => updateStateByKey(state, groupKeys, key, children, getGroupKey)) as List<List<T>>
            if (this.canRedo) {
                this.trash = this.trash.map(state => updateStateByKey(state, groupKeys, key, children, getGroupKey)) as List<List<T>>
            }
        } else {
            // 非计算模型下直接插入数据
            this.list = this.list.map(state => state.concat(children)) as List<List<T>>
            if (this.canRedo) {
                this.trash = this.trash.map(state => state.concat(children)) as List<List<T>>
            }
        }


        this.emit("manager:update")
    }

    // 添加新状态
    push(state: List<T>) {
        this.emit("manager:diff")
        return this.merge({
            index: this.index + 1,
            list: this.list.push(state),
            trash: initstate.trash
        })
    }

    // 撤销
    undo() {
        if (this.canUndo) {
            const popedState = this.list.last()
            return this.merge({
                index: this.index - 1,
                list: this.list.pop(),
                trash: this.trash.push(popedState)
            })
        }
        return this
    }

    // 前进
    redo() {
        if (this.canRedo) {
            const popedState = this.trash.last()
            return this.merge({
                index: this.index + 1,
                list: this.list.push(popedState),
                trash: this.trash.pop()
            })

        }
        return this
    }

    handleDiff(diff: DiffItem) {
        if (this.diff.size - 1 > this.index) {
            // 有回撤的情况、需要将垃圾数据清除
            const newList = this.diff.filter((item, index) => index <= this.index)
            if (isList<Map<string, any>>(newList)) {
                this.diff = newList
            }
        }
        this.diff = this.diff.push(fromJS(diff))
    }

}


export default History