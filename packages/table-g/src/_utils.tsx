import React, { useMemo, useCallback, useState, useEffect } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { Tooltip, Checkbox } from 'antd'
import { measureScrollbar } from 'rc-table/es/utils'
import CSS from 'csstype'
import { RowSelection, Record, RowKey } from './index'


function transcode(value, codeData) {
  const index = _.findIndex(codeData, { value });
  if (index < 0) return "-";
  return codeData[index].label
}
export function renderColumnItem(item, text, record, index) {
  const wrappedCilItem = {
    showTip: false,
    placement: 'rightBottom',
    ...item
  }
  let _text = text;
  _text = wrappedCilItem.codeData && Array.isArray(wrappedCilItem.codeData) ? transcode(_text, wrappedCilItem.codeData) : _text;
  _text = wrappedCilItem.isDate ? (wrappedCilItem.format ? moment(_text).format(wrappedCilItem.format) : moment(_text).format('YYYY-MM-DD')) : _text
  if (wrappedCilItem.render && typeof wrappedCilItem.render === 'function') {
    _text = wrappedCilItem.render(_text, record, index)
  }
  if (wrappedCilItem.showTip) return ( // showTip开启才显示tip
    <Tooltip placement={wrappedCilItem.placement} title={_text} arrowPointAtCenter >
      <span>{_text} </span>
    </Tooltip>
  )
  return _text

}

// columnWidth	自定义列表选择框宽度	string|number	60px
// columnTitle	自定义列表选择框标题	string|React.ReactNode	-
// fixed	把选择框列固定在左边	boolean	-
// getCheckboxProps	选择框的默认属性配置	Function(record)	-
// hideDefaultSelections	自定义选择项时去掉『全选』『反选』两个默认选项	boolean	false
// selectedRowKeys	指定选中项的 key 数组，需要和 onChange 进行配合	string[]	[]
// selections	自定义选择项 配置项, 设为 true 时使用默认选择项	object[]|boolean	true
// type	多选/单选，checkbox or radio	string	checkbox
// onChange	选中项发生变化时的回调	Function(selectedRowKeys, selectedRows)	-
// onSelect	用户手动选择/取消选择某行的回调	Function(record, selected, selectedRows, nativeEvent)	-
// onSelectAll	用户手动选择/取消选择所有行的回调	Function(selected, selectedRows, changeRows)	-
// onSelectInvert	用户手动选择反选的回调	Function(selectedRows)	-

// 获取级联选择的key值
function getSubKeys(record, computedRowKey) {
  const keys = []
  if (record.children && record.children.length) {
    record.children.reduce((keys, item, index) => {
      const key = computedRowKey(item, index)
      const subKeys = getSubKeys(item, computedRowKey)
      keys.push(key, ...subKeys)
      return keys
    }, keys)
  }
  return keys
}


const defaultColumnWidth = 35 // 勾选列的宽度
export const useRowSelection = <T extends Record>(rowSelection: RowSelection<T>, dataSource: Array<T>, computedRowKey: RowKey<T>, bordered: boolean): [RowSelection<T>, (record: T) => void, null | React.ReactElement] => {
  const getFlatRecords = useCallback(
    (list) => {
      return list.reduce(
        (records: T[], record: T) => {
          records.push(record)
          if (record.children && record.children.length) {
            records.push.apply(records, getFlatRecords(record.children))
          }
          return records
        },
        []
      )
    },
    []
  )
  const [flatRecords, setFlatRecords] = useState([] as T[])
  useEffect(
    () => {
      setFlatRecords(getFlatRecords(dataSource))
    },
    [dataSource]
  )
  // 用户传递的key，所有计算以此为准
  const originSelectedKeys: string[] = useMemo(() => _.get(rowSelection, 'selectedRowKeys', []), [rowSelection])
  const columnWidth = useMemo(() => _.get(rowSelection, 'columnWidth', defaultColumnWidth), [rowSelection])
  const showFooterSelection = useMemo(() => _.get(rowSelection, 'showFooterSelection', true), [rowSelection])
  const isMultiple = useMemo(() => _.get(rowSelection, 'type', 'checkbox') === 'checkbox', [rowSelection])
  const [selectedRowKeys, setselectedRowKeys] = useState(originSelectedKeys)

  // 计算选中行
  useEffect(
    () => {
      const rows = flatRecords.filter((record, index) => selectedRowKeys.includes(computedRowKey(record, index)))
      if (typeof _.get(rowSelection, 'onChange') === 'function') {
        rowSelection.onChange(selectedRowKeys, rows)
      }
    },
    [selectedRowKeys]
  )

  // 计算最终选中的key、每次计算都用rowSelection.selectedRowKeys来获得最新的keys
  const getSelectedKeys = useCallback(
    (keys: string[], selected: boolean): string[] => {
      if (selected) {
        return _.union(originSelectedKeys, keys)
      }
      return _.difference(originSelectedKeys, keys)
    },
    [originSelectedKeys]
  )

  // 勾选或者点击行选中
  const onSelectRow = useCallback(
    (record: T, selected: boolean) => {
      if (!rowSelection) return
      const key = computedRowKey(record) // 当前节点的key
      let subKeys = []
      if (isMultiple) {
        if (record.children && record.children.length) { // 也可以不用判断,只是对于没有子节点的节点来说不用执行下面的代码
          subKeys = getSubKeys(record, computedRowKey) // 子节点的key
        }
        const computedKeys = getSelectedKeys([key, ...subKeys], selected)
        setselectedRowKeys(computedKeys)
      }
      else {
        setselectedRowKeys([key])
      }
      if (typeof rowSelection.onSelect === 'function') {
        const rows = isMultiple ? getFlatRecords([record]) : record
        rowSelection.onSelect(rows, selected)
      }
    },
    [rowSelection],
  )


  // 设置选中的行,供外部使用
  const setKeys = useCallback(
    (record: T): void => {
      const key = computedRowKey(record)
      const selected = !originSelectedKeys.includes(key)
      onSelectRow(record, selected)
    },
    [originSelectedKeys]
  )
  // 点击选择框
  const onSelect = useCallback(
    (...args) => {
      onSelectRow(...args as [T, boolean]);
    },
    [rowSelection]
  )

  const onChange = useCallback( // 防止onChange多次调用，所以加一个拦截
    (...args) => {
      const [rowKeys] = args
      setselectedRowKeys(rowKeys)
    },
    [],
  )

  const footerselectionstyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px 0 4px',
    marginLeft: '-4px',
    width: columnWidth + 4,
    visibility: (isMultiple ? 'show' : 'hidden') as CSS.VisibilityProperty,
    borderRight: bordered ? '1px solid transparent' : undefined
  }), [isMultiple, columnWidth, bordered])

  const [indeterminate, footerselectionchecked] = useMemo(() => ([originSelectedKeys.length > 0 && originSelectedKeys.length < flatRecords.length, originSelectedKeys.length > 0]), [originSelectedKeys, flatRecords])

  const onFooterSelectionChange = useCallback((e) => {
    if (indeterminate === footerselectionchecked) { //全选
      const keys = flatRecords.map((record, index) => computedRowKey(record, index))
      setselectedRowKeys(keys)
    } else { // 取消全选
      setselectedRowKeys([])
    }
  }, [indeterminate, footerselectionchecked, flatRecords])
  const footerselection = useMemo(() => {
    if (!showFooterSelection || !isMultiple) return null
    return (
      <div style={footerselectionstyle} >
        <Checkbox indeterminate={indeterminate} checked={footerselectionchecked} onChange={onFooterSelectionChange} />
      </div>
    )
  }, [showFooterSelection, indeterminate, originSelectedKeys, onFooterSelectionChange, isMultiple])


  if (!rowSelection) return [null, setKeys, null]
  const { preventDefault, ...rowS } = rowSelection
  if (preventDefault) {
    return [{ columnWidth, ...rowS }, setKeys, footerselection]
  }
  return [
    {
      columnWidth,
      ...rowSelection,
      onSelect,
      onChange
    },
    setKeys,
    footerselection
  ]
}


export const usePagination = (pagination, rowselection, length = 0) => {
  const showTotal = useCallback((total, range) => total > 0 ? `第${range[0]} - ${range[1]}条，共${total}条` : '', [])
  const [defaultPagination] = useState({ //分页信息
    defaultPageSize: 50,
    defaultCurrent: 1,
    pageSizeOptions: ["20", "50", "80", "120"],
    showSizeChanger: true,         //是否可以改变 pageSize
    showQuickJumper: true,         //是否可以快速跳转至某页
    showTotal,
    total: length
  })

  const computedPagination = useMemo(
    () => {
      if (pagination) {
        if (_.isPlainObject(pagination)) return { ...defaultPagination, ...pagination }
        return defaultPagination
      }
      return false
    },
    [pagination]
  )

  const onChange = useCallback((...args) => {
    const onChange = _.get(computedPagination, 'onChange')
    onChange && onChange(...args)
  }, [computedPagination])

  if (pagination) {
    return { ...computedPagination, onShowSizeChange: onChange, onChange }
  }

}

export const setStorageWidth = (ele, tableKey, key) => {
  const { width } = ele.getBoundingClientRect()
  if (tableKey) {
    const storage = window.localStorage.getItem(tableKey)
    const obj = (storage && /{.*}/.test(storage)) ? JSON.parse(storage) : {}
    let storageWidth: object = _.get(obj, 'width', {})

    storageWidth[key] = width
    obj.width = storageWidth
    window.localStorage.setItem(tableKey, JSON.stringify(obj))
  }
}
export const getStorageWidth = (key) => {
  if (key) {
    const obj = window.localStorage.getItem(key)
    if (obj && /{.*}/.test(obj)) {
      return _.get(JSON.parse(obj), 'width', {})
    }
    return {}
    // if (!_.isNil(width) && Number.isFinite(Number(width))) { // 从缓存中取得数据
    //   return Number(width)
    // }
  }
}

/**
 * 
 * @param {HTMLTbaleElement} table 主table
 */
export const toggleFixedTable = (tableParent: HTMLTableElement, scrollY: boolean, scrollX: boolean): void => {
  // 找打content区域
  const tablecontent = _.get(tableParent, 'parentElement.parentElement')
  if (!tablecontent) return
  const left = tablecontent.querySelector('.ant-table-fixed-left')
  const right = tablecontent.querySelector('.ant-table-fixed-right')
  toggleFixedTableScroll(left, scrollY, scrollX)
  toggleFixedTableScroll(right, scrollY, scrollX)
}

export const setStyle = (dom, text) => {
  if (!dom) return
  requestAnimationFrame(() => {
    const { cssText } = dom.style
    dom.style.cssText = cssText ? `${cssText};${text}` : text
  })
}

// 在有固定列的情况下，如果主table的宽度小于容器宽度要隐藏滚动条的占位
/**
 * 
 * @param {*} fix 固定列容器
 * @param {*} hide 隐藏还是显示
 */
export const toggleFixedTableScroll = (fix, scrollY, scrollX) => {
  const scrollbarmeasure = measureScrollbar({ direction: 'horizontal', prefixCls: 'antd' })
  if (fix) {
    const outer = fix.querySelector('.ant-table-body-outer')
    const inner = fix.querySelector('.ant-table-body-inner')
    // setStyle(inner, "overflow-y: hidden")
    // scrollX --- 设置outer的margin-bottom属性为负值
    // scrollY --- 设置inner的overflow-x属性为scroll

    if (scrollY) {
      setStyle(inner, `overflow-y: scroll`)
      if (scrollX) {
        // 负值保证主table在拖拽的时候不会卡住
        setStyle(outer, `margin-bottom: -${scrollbarmeasure}px`)
        setStyle(inner, `overflow-x: scroll`)
      } else {
        setStyle(outer, `margin-bottom: 0`)
        setStyle(inner, `overflow-x: hidden`)
      }
    } else {
      setStyle(inner, `overflow-y: hidden`)
      if (scrollX) {
        setStyle(outer, `margin-bottom: -${scrollbarmeasure}px`)
        setStyle(inner, `overflow-x: hidden`)
      } else {
        setStyle(outer, `margin-bottom: 0`)
        setStyle(inner, `overflow-x: hidden`)
      }
    }
    const table = inner.querySelector('table')
    setTableBorderBottom(table, !scrollY || scrollY && scrollX)
  }
}

export const switchIndex = ([...list], from, to) => {
  list.splice(to < 0 ? list.length + to : to, 0, list.splice(from, 1)[0]);
  return list
}

// 根据内容高度计算是否显示border-bottom
export const setMainTableBorder = (table, headerFixed, dataLength) => {
  let showBorderBottom = false
  // 非固定头部的table，并且没有数据的时候，设置一个border-bottom
  // 防止被placeholder
  if (!headerFixed) {
    if (!dataLength) showBorderBottom = true
  }
  else {
    const parent = _.get(table, 'parentElement')
    if (!parent) return
    const scrollHeight = parent.offsetWidth > parent.clientWidth; // 出现纵向滚动
    const scrollWidth = parent.offsetHeight > parent.clientHeight // 出现横向滚动
    showBorderBottom = !scrollHeight || scrollHeight && scrollWidth
  }

  setTableBorderBottom(table, showBorderBottom)
}

const setTableBorderBottom = (table, show) => {
  setStyle(table, show ? 'border-bottom: 1px solid rgba(126,126,126,0.3)' : 'border-bottom: 0');
}

/**
 * 计算diff数据
 * @param {Array<any>} oldList 编辑之前的原始数据
 * @param {Array<any>} newList 编辑之后的列表
 * @param {function} computedRowKey  计算数据的key
 * @param {boolean} isTree 是否是树状结构
 */
export const diffList = <T extends Record>(oldList: T[], newList: T[], computedRowKey: RowKey<T>, isTree = false, addList = [], delList = [], modifyList = []) => {

  // 2、计算新增节点
  console.time('计算新增节点')
  newList.reduce((list, item) => {
    const isAdd = oldList.every(oldItem => computedRowKey(oldItem) !== computedRowKey(item))
    if (isAdd) {
      list.push(item)
      if (isTree && item.children && item.children.length) {
        pushChildrenToList(list, item.children)
      }
    }
    return list
  }, addList)
  console.timeEnd('计算新增节点')
  // 3、计算删除节点
  // 4、计算修改节点
  console.time('计算删改节点')
  oldList.reduce((result, oldItem) => {
    const isDelete = newList.every(newItem => computedRowKey(oldItem) !== computedRowKey(newItem))
    if (isDelete) {
      // 删除的数据
      result[0].push(oldItem)
      if (isTree && oldItem.children && oldItem.children.length) {
        pushChildrenToList(result[0], oldItem.children)
      }
    } else {
      // 修改的数据
      const newItem = newList.find(newItem => computedRowKey(oldItem) === computedRowKey(newItem))

      let [oi, ni] = [oldItem, newItem];
      if (isTree) {
        oi = _.omit(oldItem, 'children');
        ni = _.omit(newItem, 'children')
        // 比较子树
        const oldChildLength = _.get(oldItem, 'children.length')
        const newChildLength = _.get(newItem, 'children.length')
        if (oldChildLength || newChildLength) {
          // 进入子级比较
          const [subAddList, subDelList, subModifyList] = diffList(
            _.get(oldItem, 'children', []),
            _.get(newItem, 'children', []),
            computedRowKey,
            isTree
          )
          addList.push.apply(addList, subAddList)
          result[0].push.apply(result[0], subDelList)
          result[1].push.apply(result[1], subModifyList)
        }
      }
      // 比较数据本身
      if (!_.isEqual(oi, ni)) {
        result[1].push(ni)
      }
    }
    return result
  }, [delList, modifyList])
  console.timeEnd('计算删改节点')
  // 5、
  return [addList, delList, modifyList]
}

const pushChildrenToList = (list, sub) => {
  sub.forEach(item => {
    list.push(item)
    if (item.children && item.children.length) {
      pushChildrenToList(list, item.children)
    }
  })
}

/**
 * 获取dataindex对应的index
 * 用于列缩放是找到对应的col元素，来设置实际的宽度
 * @param {*} cols 列数据
 */
export const getComputedColIndex = (cols): string[] => {
  console.time('计算columnIndex')
  const colIndexs = []
  const inner = (subCols) => {
    subCols.forEach((subCol) => {
      const childrenLength = _.get(subCol, "children.length")
      if (childrenLength) {
        inner(_.get(subCol, "children", []))
      } else {
        colIndexs.push(subCol.dataIndex)
      }
    })
  }
  inner(cols)
  console.timeEnd('计算columnIndex')
  return colIndexs
}

function computeIndexInner<T>([...list], parent): [Array<T>, number] {
  let start = parent;
  const c = list.map(({ ...item }) => {
    item['g-index'] = ++start
    if (_.get(item, 'children.length')) {
      const [children, subStart] = computeIndexInner(item.children, start)
      item.children = children;
      start = subStart as number
    }
    return item
  })
  return [c, start]
}
/**
 * 给list计算g-index属性
 * @param {Array} list 
 * @param {number} withIndex 
 * @param {number} parent 
 */
export const computeIndex = function computeIndex<T>([...list]: Array<T>, expandRowKeys = [], computedRowKey): [T[], string[], T[]] {
  console.time('计算序号')
  const renderRowKeys: string[] = []
  const tilingList: T[] = [];
  const items = []
  const root = {
    'g-root': true,
    children: list
  }
  items.push({
    nestLevel: 0,
    node: root
  })
  let index = 0;

  while (items.length) {
    const { node, nestLevel, "g-parent-row-key": gprk, "g-parent": gp } = items.shift();
    let rowKey;
    if (!node['g-root']) {
      node["g-index"] = ++index
      node["g-level"] = nestLevel
      rowKey = computedRowKey(node, node["g-index"])
      node["g-row-key"] = rowKey
      // 关联父级节点
      if (gprk !== undefined) {
        node["g-parent-row-key"] = gprk;
        node["g-parent"] = gp
      } else {
        // 根节点
        node["g-parent-row-key"] = 'root'
      }
      renderRowKeys.push(rowKey)
      tilingList.push(node)
    }
    if (node.children !== undefined) {
      if (_.get(node, "children.length")) {
        if (node['g-root'] || expandRowKeys.includes(rowKey)) {
          items.unshift(...node.children.map(child => ({
            node: child,
            nestLevel: nestLevel + 1,
            "g-parent-row-key": rowKey,
            "g-parent": node
          })));
        } else {
          node.children = []
        }
      }
    }
  }
  console.timeEnd('计算序号')
  return [list, renderRowKeys, tilingList]
}


export const getVirtualList = function getVirtualList<T>(start: number, length: number, renderRowKeys: string[], [...list]: Array<T>): Array<T> {
  // const keys = renderRowKeys.slice(start, start+length);
  let result = list.slice(start, start + length);
  if (!result.length) return result
  do {
    const { root = [], ...groups } = _.groupBy(result, 'g-parent-row-key')
    for (const [key, nodes] of Object.entries(groups).reverse()) {
      let seted = false;
      for (const item of root) {
        if (String(item['g-row-key']) === key) {
          item.children = nodes
          seted = true;
          break;
        }
      }
      // 在root中没有找到父级节点
      if (!seted) {
        const gp = nodes[0]["g-parent"]
        gp.children = nodes;
        root.unshift(gp)
      }
    }
    result = root
  } while (!result.every(item => item["g-parent-row-key"] === 'root'))

  return result
}