import { List, Record } from 'immutable'
import { EventEmitter } from 'events'
import { RowNode } from 'ag-grid-community'

import { Record as DataRecord } from '../interface'
import { updateStateByKey } from "./utils"

const initstate = {
    index: -1,
    list: List([]),
    trash: List([])
}

const HistoryRecord = Record(initstate, "[[History]]")

class History<T extends DataRecord> extends EventEmitter {

    private index: number = initstate.index
    private list: List<List<T>> = initstate.list
    private trash: List<List<T>> = initstate.trash

    constructor() {
        super()
    }

    private merge(obj: typeof initstate, init: boolean = false) {
        this.index = obj.index
        this.list = obj.list
        this.trash = obj.trash || this.trash
        !init && this.emit("manager:update")
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
        return this.index > 0
    }

    /**获取当前状态 */
    public get currentState() {
        return this.list.get(this.index)
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
    appendChild(groupKeys: (number | string)[], key: string, children: List<T>, getGroupKey: (d: any) => string | number) {

        this.list = this.list.map(state => updateStateByKey(state, groupKeys, key, children, getGroupKey)) as List<List<T>>
        if (this.canRedo) {
            this.trash = this.trash.map(state => updateStateByKey(state, groupKeys, key, children, getGroupKey)) as List<List<T>>
        }
        this.emit("manager:update")
    }

    // 添加新状态
    push(state: List<T>) {
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

}

export default History