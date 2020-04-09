import _ from 'lodash'
import { ColumnApi, GridApi, RowNode } from 'ag-grid-community';
import { Record } from '../interface'

export const originKey = "__origin"
export const cloneDeep = function cloneDeep<T extends Record>(list: T[]): T[][] {
    if (!list.length) return []
    const pureList = []
    const cloneList = list.map((item: T) => {

        const { children } = item
        let copyItem = null
        // 获取纯净item,保留children
        const pureItem = _.cloneDeep(item)// getPureRecord(item, ["children"])


        if (_.get(children, "length")) {
            const [cloneChildren, originChildren] = cloneDeep(children)
            item.children = cloneChildren;

            Object.freeze(originChildren)
            pureItem.children = originChildren
        }
        copyItem = _.cloneDeep(item);

        // freezeObj有2个作用
        // 1是追加到新数据中
        // 2是返回出去作为纯净数据
        Object.freeze(pureItem)
        pureList.push(pureItem)
        Object.defineProperty(copyItem, originKey, { value: pureItem, writable: false, configurable: false, enumerable: true })

        return copyItem
    })
    return [cloneList, pureList]
}

/**找到没有选中的子节点 */
export const findChildren = function findChildren(node: RowNode): RowNode[] {
    const children: RowNode[] = [] as RowNode[]

    const { childrenMapped } = node

    const sub = Object.values(childrenMapped)

    for (let subNode of sub) {
        // 处理没有选中的子节点
        if (!subNode) continue;
        if (!subNode.selected) {
            children.push(subNode)
            const subChildren = findChildren(subNode)
            if (subChildren.length) {
                children.push.apply(children, subChildren)
            }
        }
    }
    return children
}

/**根据keyPath移除深层节点 */
export const removeDeepItem = function removeDeepItem<T extends Record>(treeDataChildrenName: string, keyPath: Array<number>, { ...node }: Record, newData?: any): T {
    let currentKey = keyPath.splice(0, 1)[0]
    let children = [...node[treeDataChildrenName]]
    if (keyPath.length) {
        children[currentKey] = removeDeepItem(treeDataChildrenName, keyPath, children[currentKey])
    } else {
        if (!newData) {
            children = [...children.slice(0, currentKey), ...children.slice(currentKey + 1)]
        } else {
            children[currentKey] = newData
        }
    }
    node[treeDataChildrenName] = children
    return node as T
}

export const getPureRecord = function getPureRecord<T>(data: T): T {
    return _.omit(data, ["treeDataPath", "_rowData", "_rowType", "__origin"])
}

export const getPureList = function getPureList<T extends Record>(list: T[]): T[] {
    if (!list.length) return []
    const cloneList = list.map((item: T) => {
        const record = getPureRecord<T>(item)
        if (item.children && item.children.length) {
            record.children = getPureList(item.children)
        }
        return record
    })
    return cloneList
}
