import _ from 'lodash'

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