import { get } from 'lodash'
import { List, fromJS } from "immutable"
import DataManage from './datamanage'
import DataProxy from './dataproxy'
import { getPureRecord } from './utils'
import { DataActions } from '../interface'
import { trackEditValueChange, isDeleted } from '../utils'

class ListProxy {

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

                const dataProxy = new DataProxy(nodeItem, manager)
                dataProxy.on("setted", () => {
                    _this.isChanged = true
                    const id = dataProxy.id

                    if (dataProxy.action === DataActions.remove) {
                        _this.removedNodes.push({
                            keyPath: currentPath,
                            id
                        })
                    }
                    else {
                        _this.modifyNodes.push({
                            keyPath: currentPath,
                            node: dataProxy.newData
                        })
                    }
                })

                this.list.push(dataProxy.proxy)
                if (Reflect.has(nodeItem, manager.childrenName)) {
                    this.mapList(nodeItem[manager.childrenName], currentPath)
                }
            })
        }
    }


}


export default ListProxy