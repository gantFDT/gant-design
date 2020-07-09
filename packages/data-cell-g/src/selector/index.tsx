import React, { PureComponent, Component } from 'react'
import { Select, Icon } from 'antd'
import AntSelect, { SelectProps, SelectValue as AntSelectValue } from 'antd/lib/select'
import { debounce, isPlainObject, isNil, cloneDeep, isEqual, zipWith, groupBy, pick } from 'lodash'
import { compose, defaultProps, withProps, withPropsOnChange, withState, mapProps, withHandlers, lifecycle, toClass, setDisplayName } from 'recompose'
import warning from '@util/warning'
import classnames from 'classnames'
import { default as withEdit, WithEditInProps } from '../with-edit';
import { WithBasicProps } from '../compose/withbasic';

type ProtoExtends<T, U> = U & {
  [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>
}

const selectorCache = new Map()
const { Option } = Select

export enum ValueType {
  number = "number",
  string = "string"
}

const valueFormatter = {
  [ValueType.number]: Number,
  [ValueType.string]: String,
}


const defaultprop = {
  query: null, // 组合使用的时候,query方法作为查询数据的Promise方法, 需要返回数据列表
  valueProp: 'value', // 告诉组件作为value的值是哪一个字段, 为空将取整个值
  valuePropType: "string",
  labelProp: 'label',
  style: {},
  dataSource: [],
  multiple: false,
  allowClear: true,
  showSearch: true,
  readOnly: false,
  useStorage: true,
  useCache: true, // 是否开启选择器的缓存功能
  optionLabel: null,  // 用于接收外部传递的选项的label，一般应用于选择的项不再列表中
  isFilter: true, // 过滤模式
  hideSelected: false,
  onSearch: _ => _,
  onSelect: _ => _,
  onChange: _ => _,
  onDeselect: _ => _,
  onDropdownVisibleChange: _ => _,
  blurOnSelect: false,
  wrap: false
}

type NArray<T> = T | T[];

export type SelectValue = AntSelectValue | NArray<boolean>

export type Query<T> = (f: string) => Promise<T[]>

type Label = NArray<string>


// 重写defaultProps中部分数据的类型
type DefaultProps<R> = ProtoExtends<typeof defaultprop, {
  query?: Query<R>,
  dataSource?: R[],
  style?: React.CSSProperties,
  optionLabel?: Label,
  multiple?: boolean,
  onSelect?: (k: string, item: R) => void,
  selectorId?: string,
  onChange?: (key: SelectValue, items: R[]) => void,
  wrap?: boolean
}>

type BasicSelectorProps<T, R> = ProtoExtends<SelectProps<T>, DefaultProps<R>>

export type SelectorProps<T, R> = ProtoExtends<WithBasicProps, BasicSelectorProps<T, R>>

type SelectorInnerProps<T, R> = ProtoExtends<BasicSelectorProps<T, R>, {
  setFilter?: (v: string) => void,
  getData(): void,
  label?: Label,
  setLabel?: (l: Label) => void,
  setCacheLabel?: (lable: Label) => Label,
  dataList?: R[],
  storageList?: R[],
  getValue?: (v: R) => string,
  updateStorage?: (d: R, u: boolean) => void,
  selectRef?: AntSelect,
  setSelectRef?: (c: AntSelect) => void,
  splitStr?: string,
  filter?: string,
  forceUpdateStorageList(): void,
  reg: RegExp,
  addonAfter: React.ReactElement,
  renderList: React.ReactElement[],
  storageToReal: <T>(v: T) => T,
  isMultiple: boolean,
  wrapperRef?: any
}>


const withLocalStorage = compose(
  defaultProps({
    selectorId: 'selector',
  }),
  // setDisplayName('Selector'),
  withProps(({ selectorId }) => {
    warning(selectorId, `请确保selectorId为一个有效字符串`)
    return {
      reg: new RegExp(`^${selectorId}-(.*)$`), // 转化最近选择的valueProp
      selectorStorageId: `selector:${selectorId}`, // 存储在storage的key
    }
  }),
  withState(
    'storageList',
    'setStorageList',
    ({ selectorStorageId }) => JSON.parse(localStorage.getItem(selectorStorageId) || '[]')
  ),
  withHandlers({
    forceUpdateStorageList: ({ setStorageList, storageList, selectorStorageId }) => () => {
      const list = JSON.parse(localStorage.getItem(selectorStorageId) || '[]')
      if (!isEqual(storageList, list)) {
        setStorageList(list)
      }
    }
  })
)

const withSelector = compose(
  defaultProps(defaultprop),
  withState('label', 'setLabel', null), // 读模式下的显示文本
  withState('cacheLabel', 'setCacheLabel', ({ optionLabel }) => optionLabel), // 当前选项的文本, 在点确认的时候才更新
  withState('loading', 'setLoading', false),
  withState('filter', 'setFilter', ''),
  withState('selectRef', 'setSelectRef', null), // select组件
  withState('dataList', 'setDataList', ({ dataSource }) => dataSource),

  // 监听搜索
  withPropsOnChange(
    ['filter'],
    ({ filter, selectorId }) => ({
      taskId: `${selectorId}:${escape(filter).replace(/\%u/g, '')}`
    })
  ),
  withHandlers({
    //将最近选择的项的key转化为真实的key
    storageToReal: ({ selectorId, reg }) => (value) => {
      if (value.startsWith(selectorId)) { // 最近选择
        return value.replace(reg, '$1')
      }
      return value
    },
    getValue: ({ valueProp }) => data => String(valueProp && isPlainObject(data) ? data[valueProp] : data), // 获取选项的value
    getLabel: ({ labelProp }) => data => labelProp && isPlainObject(data) ? data[labelProp] : data, // 获取选项的label
    setLabel: ({ setLabel: originSetLabel, splitStr = '、' }) => labels => originSetLabel(Array.isArray(labels) ? labels.filter(Boolean).join(splitStr) : labels), // 重置setlabel方法,增加格式化的功能
  }),
  withHandlers({
    // 从dataList或者storageList中找到数据
    getItemLabel: ({ dataList, storageList, selectorId, getValue, getLabel, optionLabel, useStorage }) => (value, index = 0) => {
      let list = dataList
      // 启用缓存的情况下执行判断
      // fix: 解决当storageId恰好是value的前缀的情况
      if (useStorage && value.startsWith(selectorId)) {
        list = storageList
      }
      const valueItem = list.find(item => getValue(item) === value)
      if (valueItem) {
        return getLabel(valueItem)
      }
      const optionLabelArray = Array.isArray(optionLabel) ? optionLabel : [optionLabel]
      return optionLabelArray[index]
    }
  }),
  withPropsOnChange(['multiple', "mode"], ({ multiple, mode }) => ({ isMultiple: (multiple || mode === 'multiple' || mode === 'tags') })),
  withPropsOnChange(
    ['value'],
    ({ dataList, storageList, value, getValue, selectorId, isMultiple }) => {
      if (isNil(value)) {
        return {
          value: undefined
        }
      }
      const isArray = Array.isArray(value)
      let cValue = isArray ? value : [value]
      const transormedValue = cValue.map(cv => {
        const v = String(cv)
        const isInList = dataList.find(item => getValue(item) === v)
        const isInStorage = storageList.find(item => getValue(item) === v)
        // 选择的缓存中的数据，需要做一层转化
        if (!isInList && isInStorage) {
          return `${selectorId}-${v}`
        }
        return v
      })
      return {
        value: isMultiple ? transormedValue : transormedValue[0]
      }
    }
  ),
  withHandlers({
    // 依赖转化后的value
    transformDataToList: ({ getLabel, getValue, renderItem, hideSelected, isMultiple, value: comValue }) => list => list.map(item => {
      if (renderItem) {
        return renderItem(item, Option)
      }
      if (isPlainObject(item)) {
        const { disabled, title, className } = item
        const value = getValue(item);
        const key = value || item.key;
        const label = getLabel(item)
        let show = true, style
        if (hideSelected) {
          if (isMultiple) {
            show = comValue.every(v => v !== value)
          } else {
            show = comValue !== value
          }
        }

        if (!show) style = { display: 'none' }
        return <Option key={key} value={value} disabled={disabled} title={title} style={style} className={className}>
          {label}
        </Option>
      }
      return <Option key={item} value={item}>
        {item}
      </Option>
    }),
    setLabelWithValue: ({ value, setLabel, setCacheLabel, getItemLabel }) => () => {
      if (isNil(value)) {
        setLabel(null)
        return
      }
      let label = null
      // 从dataList找到value对应的项
      // 如果没有找到就从storagelist里面找
      // 如果还是没有找到，那么就要使用optionLabel参数
      if (Array.isArray(value)) { // 多选
        label = value.map((itemValue, index) => itemValue ? getItemLabel(itemValue, index) : null)
      } else {
        label = getItemLabel(value)
      }

      setLabel(label) // 设置读模式下的显示文本
      setCacheLabel(label) // 设置选项的label
    }
  }),
  withHandlers({
    updateStorage: ({ selectorId, selectorStorageId, storageList, getValue, valueProp, setStorageList, useStorage }) => (data, update) => {
      if (!useStorage) return; // 不启用缓存

      const id = `${selectorId}-${getValue(data)}`
      let isUpdate = update // 为true表示从最近选择的项里面选择,只更新
      if (!isUpdate) { // 
        const existed = storageList.some(pItem => getValue(pItem) === id)
        isUpdate = existed // 如果最近选择种已存在,将直接更新数据
        if (!existed) { // 新增最近被选择的数据
          if (valueProp && isPlainObject(data)) {
            storageList.push({ ...data, [valueProp]: id })
          } else {
            storageList.push(id)
          }
          storageList.slice(-5) // 保留最近5条       
        }
      }

      if (isUpdate) {
        storageList.map(item => {
          if (getValue(item) === id) { // 找到被选择的那一条，更新数据
            return valueProp && isPlainObject(data) ? { ...data, [valueProp]: id } : id
          }
          return item
        })
      }
      const copyList = cloneDeep(storageList)
      setStorageList(copyList) // 更新list
      localStorage.setItem(selectorStorageId, JSON.stringify(copyList)) // 更新缓存
    },
    cleanStorage:({ selectorId, selectorStorageId, storageList, getValue, valueProp, setStorageList, useStorage }) => (data, update) => {
      setStorageList([]) // 更新list
      localStorage.setItem(selectorStorageId, JSON.stringify([])) // 更新缓存
    },
    getData: ({ taskId, useCache, loading, setLoading, query, filter, setDataList }) => () => {
      if (!query) return
      let task = null

      if (!useCache) {
        // 不使用选择器缓存，由业务自己决定缓存
        setLoading(true)
        task = query(filter)
      } else {
        task = selectorCache.get(taskId);
        if (!task) {
          if (loading) return
          setLoading(true)
          task = query(filter)
          selectorCache.set(taskId, task)
        }
      }

      if (!(task.then && typeof task.then === 'function')) task = Promise.resolve(task)
      task.then(data => {
        setLoading(false)
        if (Array.isArray(data)) {
          setDataList(data)
        }
        else {
          throw new Error('选择器选项列表只能是数组格式')
        }
      })
    },
  }),
  // 更新选项列表
  //#region
  withPropsOnChange(
    ['dataList', 'filter', 'storageList', 'loading'],
    ({ dataList, filter, storageList,selectorStorageId, cleanStorage,transformDataToList, setStorageList, updateStorage, forceUpdateStorageList, loading, useStorage, query, labelProp, getLabel, isFilter }) => {

      let result = dataList
      if (!query && filter && isFilter) {
        /**
         * 筛选算法
         * axbxcx ---> abc true
         * abcabc ---> abc true
         * bacbcc ---> abc true
         * bbabdd ---> abc false 没有c
         */

        try {
          result = dataList.filter(item => {
            const LastIndex = filter.split('').reduce(
              (index, char) => {
                if (index === -1) return -1;
                const label = getLabel(item)
                if (!label) {
                  throw new Error(`应用选择器的过滤功能，请确保列表数据中${labelProp}属性存在，或修改'labelProp'对应的属性名称,作为过滤的依据`)
                }
                return label.slice(index).indexOf(char)
              },
              0
            )
            return ~LastIndex
          })
        }
        catch (e) {
          console.error(e)
        }
      }
      let list = [<Select.Option key='none' disabled>{loading ? "加载中..." : "没有查询到数据"}</Select.Option>]
      if (result.length) {
        const hasGroup = result.some(item => item.group)
        if (!hasGroup) {
          list = transformDataToList(result)
        } else {
          const everyGroup = result.every(item => item.group)
          const group = groupBy(result, 'group')
          // 某些项没有写group
          if (!everyGroup) {
            group['其他选项'] = group['undefined']
          }

          list = Object.entries(group).reduce((result, [key, data]) => {
            if (key !== 'undefined') {
              result.push(
                <Select.OptGroup key={key} label={key}>{transformDataToList(data)}</Select.OptGroup>
              )
            }
            return result
          }, [] as React.ReactElement[])
        }

      }
      if (useStorage) {
        const newItems = (
          <Select.OptGroup key='result' label='搜索结果'>{list}</Select.OptGroup>
        )

        const selectedItems = (
          <Select.OptGroup key='recent' label={
            <div style={{ width: '100%', display: 'flex' }}>
              <span style={{ flex: 1 }}>最近选择</span>
              <Icon
                type="delete"
                style={{
                  fontSize: '12px',
                  lineHeight: '32px'
                }}
                onClick={() => {
                  cleanStorage()
                }}
              />
            </div>
          }>
            {
              storageList.length
                ?
                transformDataToList(storageList)
                :
                <Select.Option key='empty' disabled>没有最近选择</Select.Option>
            }
          </Select.OptGroup>
        )
        return {
          renderList: [selectedItems].concat(newItems)
        }
      }else {
        return {
          renderList: list
        }
      }
    }
  ),
  //#endregion
  withPropsOnChange(['query'], ({ getData }) => getData()),
  // 下列属性变化的时候重新根据value值设置label
  withPropsOnChange(['value', 'optionLabel', 'dataList'], ({ setLabelWithValue }) => setLabelWithValue()),
  // 监听label
  withPropsOnChange(['optionLabel'], ({ optionLabel }) => {
    return {
      cacheLabel: optionLabel
    }
  }),
  // 去支持只传递dataSource，并且希望更新dataSource的情况
  withPropsOnChange(['dataSource'], ({ dataSource, setDataList }) => setDataList(dataSource)),
  mapProps(({ dataSource, transformDataToList, ...props }) => props)
)

const withChange = withPropsOnChange( // 外部value到内部value对象形式的转换
  ['value', 'cacheLabel'],
  ({ value, cacheLabel, isMultiple }) => { // 这里的value是外部传进来的value,约定是一个基础类型的值
    if (isNil(value)) return { value: undefined }
    if (isMultiple) {
      let sValue = undefined
      if (Array.isArray(cacheLabel)) {
        sValue = zipWith(value, cacheLabel, (key, label) => ({ key, label }))
      } else {
        sValue = value.map(key => ({ key, label: cacheLabel }))
      }
      return {
        value: sValue.slice(0, value.length)
      }
    }
    return {
      value: { key: value, label: cacheLabel }
    }
  }
)

class BasicSelector<T, R> extends PureComponent<SelectorInnerProps<T, R>> {

  constructor(props) {
    super(props)

    this.onSelect = this.onSelect.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch = debounce((value) => {
    const { onSearch, setFilter, getData } = this.props
    setFilter(value)
    getData()
    onSearch(value)
  }, 300)


  getItem = (realKey: string) => {
    const { selectorId, dataList, storageList, getValue } = this.props
    const isStorage = realKey.startsWith(selectorId)
    let dataSource = isStorage ? storageList : dataList
    return dataSource.find(item => getValue(item) === realKey)
  }

  onChange = (...args) => {
    const [value] = args
    const { onChange, setCacheLabel, storageToReal, valuePropType } = this.props
    let keys: SelectValue = undefined
    let labels: NArray<string> = undefined
    let items: R[] = []
    if (value) {
      if (Array.isArray(value)) {
        const keyMap = new Map()
        const ItemMap = new Map()
        value.forEach(({ key, label }) => {
          const realKey = storageToReal(key)
          if (!keyMap.has(realKey)) {
            keyMap.set(realKey, label)
            ItemMap.set(realKey, this.getItem(realKey))
          } else {
            // 如果已经有相同的key了，那么说明这是需要删除的项
            keyMap.delete(realKey)
            ItemMap.delete(realKey)
          }
        })
        if (keyMap.size) {
          keys = [...keyMap.keys()].map(key => valueFormatter[valuePropType](key))
          labels = [...keyMap.values()]
          items = [...ItemMap.values()]
        }
      } else {
        keys = valueFormatter[valuePropType](storageToReal(value.key))
        labels = value.label
        items = [this.getItem(value.key)]
      }
    }
    setCacheLabel(labels)
    onChange(keys, items)
    // 清除状态下重新搜索
    if (!value) {
      this.onSearch('')
    }

  }

  onSelect(select, option) {
    const { onSelect, dataList, storageList, selectorId, getValue, updateStorage, selectRef, isMultiple, query, filter, setFilter, blurOnSelect, storageToReal } = this.props

    const key = storageToReal(select.key) // 获取真实的key值
    const originItem = dataList.find(item => getValue(item) === key)

    let isStorage = select.key.startsWith(selectorId)
    if (!isStorage || originItem) { // 从搜索出来的数据中选择.或者在最近选择中选择了有搜索出来的数据
      onSelect(key, originItem)
      updateStorage(originItem, isStorage) // isStorage为true,表示当前只是更新操作.加快updateStorage的速度
    } else {
      const item = storageList.find(item => getValue(item) === select.key)
      onSelect(key, item)
    }

    if (blurOnSelect && !isMultiple) { // 单选的情况下、选中失焦
      setTimeout(() => {
        selectRef.blur()
      }, 0)
    }

    // 配合在不是通过query获取数据的情况下的过滤行为，
    // 选中的时候要去掉过滤条件
    if (!query && filter) {
      setFilter('')
    }
  }

  onopen = (open) => {
    const { onDropdownVisibleChange, forceUpdateStorageList } = this.props
    // 展开选择面板的时候执行一次query，重置数据
    // 适用场景是一个页面有多个相同的组件的时候，，打开第一个并选择会更新缓存
    // 打开第二个时候也能重新拿到最新的缓存数据
    if (open) {
      forceUpdateStorageList()
    }
    onDropdownVisibleChange(open)
  }

  onFocus = () => {
    if (!this.props.selectRef) return
    const { readOnly, isMultiple } = this.props
    const { rcSelect: { getInputDOMNode, getInputElement } } = this.props.selectRef as any
    const input = getInputDOMNode() || getInputElement()
    if (input) {
      if (readOnly && isMultiple) {
        const isReadOnly = input.getAttribute("readOnly")
        if (!isReadOnly) input.setAttribute("readOnly", "readOnly")
      }

    }
  }

  renderSelect = () => {
    const { onSearch, onSelect, onChange, onopen, onFocus } = this
    const { multiple, readOnly, renderList, loading, style, wrapperRef, addonAfter, setSelectRef, dropdownClassName, className, wrap, children, ...props } = this.props;
    if (readOnly) {
      props.open = false
      props.showSearch = false
    }

    if (multiple) props.mode = 'multiple'

    const select = (
      <Select
        loading={loading}
        {...props}
        onFocus={onFocus}
        ref={setSelectRef}
        className={classnames('gant-selector', className, !wrap && 'gant-selector-no-wrap')}
        onSearch={onSearch}
        onSelect={onSelect}
        onChange={onChange}
        onDropdownVisibleChange={onopen}
        labelInValue
        filterOption={false}
        dropdownClassName={classnames(dropdownClassName, 'gant-selector-dropdown')}
      >
        {children || renderList}
      </Select>
    )
    return select
  }

  render() {
    return this.renderSelect()
  }
}

const SelectorComponent = compose(
  toClass,
  withLocalStorage,
  withSelector,
  withEdit<SelectorInnerProps<any, any>>(({ label }) => label),
  withChange, // 单独将value的处理放到withEdit后面，
)(BasicSelector)

export default class Selector<T, R> extends Component<SelectorProps<T, R>>{
  render() {
    return <SelectorComponent {...this.props} />
  }
}
