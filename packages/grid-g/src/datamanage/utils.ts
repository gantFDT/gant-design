import _ from 'lodash'
import { ColumnApi, GridApi, RowNode } from 'ag-grid-community';
import { List, Map } from 'immutable'
import { Record } from '../interface'

export const originKey = "__origin"
export const cloneDeep = function cloneDeep<T extends Record>(list: T[]): T[] {
    if (!list.length) return []
    const cloneList = list.map((item: T) => {

        const { children } = item
        let copyItem = _.cloneDeep(item);

        if (_.get(children, "length")) {
            const cloneChildren = cloneDeep(children)
            copyItem.children = cloneChildren;
        }
        return copyItem
    })
    return cloneList
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

/**根据keyPath移除深层节点，如果有newData则是修改 */
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

/**找到grid rownode的节点path */
export const getIndexPath = function (node: RowNode): number[] {
    const paths = []
    let currentNode = node
    while (currentNode.level >= 0) {
        paths.unshift(currentNode.childIndex)
        currentNode = currentNode.parent
    }
    return paths
}

/**
 * 
 * @param state 要修改的状态
 * @param keyPaths 修改的路径
 * @param key 修改的字段
 * @param children 修改的子级节点数据
 * @param getKey 获取key的方法
 */
export function updateStateByKey<T>(state: List<any>, keyPaths: (string | number)[], key: string, children: List<T>, getKey: (d: any) => string | number) {

    function innerUpdate(state: List<any>, paths = [...keyPaths]) {
        let newState = children
        if (paths.length) {
            const groupKey = paths.shift()
            const index = state.findIndex(row => getKey(row.toJS()) === groupKey)
            const subState = innerUpdate(state.getIn([index, key]), paths)
            newState = state.setIn([index, key], subState)
        }
        return newState
    }

    return innerUpdate(state)
}