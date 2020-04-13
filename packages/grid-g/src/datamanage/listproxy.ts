import DataManage from './datamanage'

import { getPureRecord } from './utils'
import { DataActions } from '../interface'

class ListProxy<T extends object>{

    originList: any[]

    public list: any[] = []

    isChanged: boolean = false

    constructor(public manager?: DataManage) {
        this.originList = manager.renderList
        this.mapList(this.originList)
    }

    mapList(list) {
        const manager = this.manager
        const _this = this;
        list.forEach(nodeItem => {
            const proxy = new Proxy(nodeItem, {
                set(target, key, value, receiver) {
                    const isChanged = Reflect.get(target, key) !== value
                    if (isChanged) {
                        _this.isChanged = true
                        Reflect.set(target, key, value, receiver)
                        const id = manager.getRowNodeId(target)
                        if (target._rowType === DataActions.add) {
                            target._rowType = DataActions.add
                            this._add.set(id, getPureRecord(target))
                        }
                        else {
                            if (target._rowData) {
                                this._modify.set(id, getPureRecord(target))
                            } else {
                                this._modify.delete(id)
                            }
                        }
                    }

                    return true
                }
            })

            this.list.push(proxy)
            if (Reflect.has(nodeItem, this.manager.childrenName)) {
                this.mapList(nodeItem[this.manager.childrenName])
            }
        })
    }


}


export default ListProxy