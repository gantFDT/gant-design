import { get, cloneDeep } from 'lodash'
import { EventEmitter } from 'events'

import { getPureRecord } from './utils'
import { isDeleted, trackEditValueChange } from '../utils'
import DataManage from './datamanage'
import { DataActions } from '../interface'

export default class DataProxy<T extends object = any> extends EventEmitter {

    // 控制操作行为
    action: DataActions

    // 修改之后的新值、保证脏标识能正确显示隐藏
    newData: T

    id: string

    isChanged: boolean = false

    constructor(private data: T, private manager: DataManage<T>) {
        super()
        this.id = manager.getRowNodeId(data)
    }

    get proxy() {
        const manager = this.manager
        const id = this.id
        const _this = this;
        const originData = cloneDeep(this.data)
        return new Proxy(this.data, {
            set(target, key, value, receiver) {
                const prevValue = get(target, key)
                const isChanged = value != prevValue
                if (isChanged) {
                    _this.isChanged = true
                    if (isDeleted(target) && key !== 'isDeleted') {
                        throw new Error('不允许修改一个被删除的节点')
                    }

                    Reflect.set(target, key, value, receiver)
                    if (get(target, "_rowType", {}) === DataActions.add) {
                        if (key === "isDeleted" && value) {
                            manager._add = manager._add.delete(id)
                            _this.action = DataActions.remove
                        } else {
                            manager._add = manager._add.set(id, target)
                            // modify行为下，需要设置newData
                            _this.action = DataActions.modify
                            _this.newData = target
                        }
                    }
                    else if (key === "isDeleted") {
                        if (value) {
                            if (manager._add.has(id)) {
                                manager._add = manager._add.delete(id)
                            }
                            else if (manager._modify.has(id)) {
                                manager._modify = manager._modify.delete(id)
                            }
                            manager._removed = manager._removed.set(id, getPureRecord({ ...originData, ...originData._rowData }))
                            _this.action = DataActions.remove
                        } else {
                            manager._removed = manager._removed.delete(id)
                        }
                    }
                    else {
                        const newData = trackEditValueChange(target, key as string, value, prevValue)
                        if (Reflect.has(get(newData, "_rowData", {}), key)) {
                            manager._modify = manager._modify.set(id, getPureRecord(newData))
                        } else {
                            manager._modify = manager._modify.delete(id)
                        }
                        _this.action = DataActions.modify
                        _this.newData = newData
                    }
                    _this.emit("setted", _this)
                }

                return true
            }
        })
    }
}