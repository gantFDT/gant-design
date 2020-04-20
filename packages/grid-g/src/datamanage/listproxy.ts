import { get } from 'lodash'
import { List, fromJS } from "immutable"
import DataManage from './datamanage'

import { getPureRecord } from './utils'
import { DataActions } from '../interface'
import { trackEditValueChange, isDeleted } from '../utils'

class ListProxy<T extends object>{

    originList: any[]

    public list: any[] = []

    isChanged: boolean = false

    removedNodes = []

    modifyNodes = []

    constructor(public manager?: DataManage) {
        this.originList = manager.renderList
        this.mapList(this.originList)
    }

    mapList(list, paths = []) {
        const manager = this.manager
        const _this = this;
        if (Array.isArray(list) && list.length) {
            list.forEach((nodeItem, index) => {
                const currentPath = paths.concat(index)
                const proxy = new Proxy(nodeItem, {
                    set(target, key, value, receiver) {
                        const prevValue = Reflect.get(target, key)
                        const isChanged = prevValue !== value
                        if (isChanged) {
                            _this.isChanged = true
                            const id = manager.getRowNodeId(target)
                            if (isDeleted(target) && key !== 'isDeleted') {
                                throw new Error('不允许修改一个被删除的节点')
                            }

                            Reflect.set(target, key, value, receiver)
                            const pureRecord = getPureRecord(target)
                            if (target._rowType === DataActions.add) {
                                if (key === "isDeleted" && value) {
                                    manager._add = manager._add.delete(id)
                                    _this.removedNodes.push({
                                        keyPath: currentPath,
                                        id
                                    })
                                } else {
                                    manager._add = manager._add.set(id, pureRecord)
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
                                    manager._removed = manager._removed.set(id, pureRecord)
                                    _this.removedNodes.push({
                                        keyPath: currentPath,
                                        id
                                    })
                                } else {
                                    manager._removed = manager._removed.delete(id)
                                }
                            }
                            else {
                                const newData = trackEditValueChange(target, key as string, value, prevValue)
                                if (Reflect.has(get(newData, "_rowData", {}), key)) {
                                    manager._modify = manager._modify.set(id, pureRecord)
                                } else {
                                    manager._modify = manager._modify.delete(id)
                                }
                                _this.modifyNodes.push({
                                    keyPath: currentPath,
                                    node: newData
                                })
                            }
                        }

                        return true
                    }
                })

                this.list.push(proxy)
                if (Reflect.has(nodeItem, manager.childrenName)) {
                    this.mapList(nodeItem[manager.childrenName], currentPath)
                }
            })
        }
    }


}


export default ListProxy