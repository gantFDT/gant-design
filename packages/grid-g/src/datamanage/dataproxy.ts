import { get } from 'lodash'



import { isDeleted, trackEditValueChange } from '../utils'
import DataManage from './datamanage'
import { DataActions } from '../interface'

export default class DataProxy<T extends object = any>{

    proxy: any

    action: DataActions

    newData: T

    id: string

    constructor(data: T, manager: DataManage<T>) {
        const _this = this;
        const id =
            this.id = manager.getRowNodeId(data)
        this.proxy = new Proxy(data, {
            set(target, key, value, receiver) {
                const prevValue = get(target, key)
                const isChanged = value != prevValue
                if (isChanged) {
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
                            console.log(target)
                            manager._removed = manager._removed.set(id, target)
                            _this.action = DataActions.remove
                        } else {
                            manager._removed = manager._removed.delete(id)
                        }
                    }
                    else {
                        const newData = trackEditValueChange(target, key as string, value, prevValue)
                        if (Reflect.has(get(newData, "_rowData", {}), key)) {
                            manager._modify = manager._modify.set(id, target)
                        } else {
                            manager._modify = manager._modify.delete(id)
                        }
                        _this.action = DataActions.modify
                        _this.newData = newData
                    }
                }

                return true
            }
        })
    }
}