import DataManage from './datamanage'

import { originKey, getPureRecord } from './utils'
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
                        console.log(target)
                        if (target[originKey]) {
                            manager._modify.set(id, getPureRecord(target))
                        } else {
                            // 添加到add数组
                            target._rowType = DataActions.add
                            manager._add.set(id, getPureRecord(target))
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