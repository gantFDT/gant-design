import React, { PureComponent, Component } from 'react'
import { Select } from 'antd'
import SelectC, { SelectProps, SelectValue as AntSelectValue } from 'antd/lib/select'
import { debounce, isPlainObject, isNil, cloneDeep, isEqual, zipWith, groupBy, pick } from 'lodash'
import { compose, defaultProps, withProps, withPropsOnChange, withState, mapProps, withHandlers, lifecycle, toClass, setDisplayName } from 'recompose'
import warning from '@util/warning'
import classnames from 'classnames'
import { default as withEdit, WithEditInProps, WithEditOutProps } from '../with-edit'

type ProtoExtends<T, U> = U & {
  [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>
}

const selectorCache = new Map()
const { Option } = Select


const defaultprop = {
  query: null, // 组合使用的时候,query方法作为查询数据的Promise方法, 需要返回数据列表
  valueProp: 'value', // 告诉组件作为value的值是哪一个字段, 为空将取整个值
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

  onSearch: _ => _,
  onSelect: _ => _,
  onChange: _ => _,
  onDeselect: _ => _,
  onDropdownVisibleChange: _ => _,
  // 由外部组件来实现的获取label的方法, 一般在初始化的时候调用
  getLabelText: (value, setLabel) => setLabel(value),
  blurOnSelect: true,
}

type NArray<T> = T | T[];

export type SelectValue = AntSelectValue | NArray<boolean>

export type Query<T> = (f: string) => Promise<T[]>

type Label = NArray<string>

export type GetLabelText = (v: SelectValue, s: (v: SelectValue) => void) => void

// 重写defaultProps中部分数据的类型
type DefaultProps<R> = ProtoExtends<typeof defaultprop, {
  query: Query<R>,
  dataSource: R[],
  style: React.CSSProperties,
  optionLabel: Label,
  getLabelText: GetLabelText,
  multiple: boolean,
  onSelect: (k: string, item: R) => void,
  selectorId: string,
  onChange: (key: SelectValue) => void,
}>

type BasicSelectorProps<T, R> = ProtoExtends<SelectProps<T>, DefaultProps<R>>

export type SelectorProps<T, R> = ProtoExtends<WithEditInProps<T>, BasicSelectorProps<T, R>>

type SelectorInnerProps<T, R> = ProtoExtends<BasicSelectorProps<T, R>, {
  setFilter: (v: string) => void,
  getData(): void,
  label: Label,
  setLabel: (l: Label) => void,
  setCacheLabel: (lable: Label) => Label,
  dataList: R[],
  storageList: R[],
  getValue: (v: R) => string,
  updateStorage: (d: R, u: boolean) => void,
  selectRef: SelectC,
  setSelectRef: (c: SelectC) => void,
  filter: string,
  forceUpdateStorageList(): void,
  reg: RegExp,
  addonAfter: React.ReactElement,
  renderList: React.ReactElement[]
}>


const withLocalStorage = compose(
  defaultProps({
    selectorId: 'selector',
  }),
  // setDisplayName('Selector'),
  withProps(({ selectorId }) => {
    warning(selectorId, `请确保selectorId为一个有效字符串`)
    return {
      reg: new RegExp(`^${selectorId}-(.*)$`),
      selectorStorageId: `selector:${selectorId}`
    }
  }),
  withState('storageList', 'setStorageList', ({ selectorStorageId }) => JSON.parse(localStorage.getItem(selectorStorageId) || '[]')),
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
    transformDataToList: ({ labelProp, valueProp, renderItem }) => list => list.map(item => {
      if (renderItem) {
        return renderItem(item, Option)
      }
      if (isPlainObject(item)) {
        const { disabled, title, className } = item
        const value = item[valueProp] || item.value;
        const key = value || item.key;
        const label = item[labelProp]

        return <Option key={key} value={value} disabled={disabled} title={title} className={className}>{label}</Option>
      }
      return <Option key={item} value={item}>{item}</Option>
    }),
    getValue: ({ valueProp }) => data => valueProp && isPlainObject(data) ? data[valueProp] : data, // 获取选项的value
    getLabel: ({ labelProp }) => data => labelProp && isPlainObject(data) ? data[labelProp] : data, // 获取选项的label
    setLabel: ({ setLabel: originSetLabel }) => labels => originSetLabel(Array.isArray(labels) ? labels.join('、') : labels), // 重置setlabel方法,增加格式化的功能
  }),
  withHandlers({
    // 从dataList或者storageList中找到数据
    getItemLabel: ({ dataList, storageList, selectorId, getValue, getLabel, optionLabel }) => (value, index = 0) => {
      let list = dataList
      if (value.startsWith(selectorId)) {
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
  withPropsOnChange(
    ['value'],
    ({ dataList, storageList, value, getValue, selectorId }) => {
      const isArray = Array.isArray(value)
      let cValue = isArray ? value : [value]
      const transormedValue = cValue.map(v => {
        const isInList = dataList.find(item => getValue(item) === v)
        const isInStorage = storageList.find(item => getValue(item) === v)
        // 选择的缓存中的数据，需要做一层转化
        if (!isInList && isInStorage) {
          return `${selectorId}-${v}`
        }
        return v
      })
      return {
        value: isArray ? transormedValue : transormedValue[0]
      }
    }
  ),
  withHandlers({
    setLabelWithValue: ({ value, setLabel, multiple, mode, setCacheLabel, getItemLabel }) => () => {
      if (isNil(value)) {
        setLabel(null)
        return
      }
      let computedValue = value
      let label = null
      const isArray = Array.isArray(value)
      if (multiple || mode === 'multiple') {
        if (!isArray) computedValue = [value]
      }
      else if (isArray) computedValue = value[0]

      // 从dataList找到value对应的项
      // 如果没有找到就从storagelist里面找
      // 如果还是没有找到，那么就要使用optionLabel参数
      if (Array.isArray(computedValue)) { // 多选
        label = computedValue.map((itemValue, index) => getItemLabel(itemValue, index))
      } else {
        label = getItemLabel(computedValue)
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
    getData: ({ taskId, useCache, loading, setLoading, query, filter, setDataList }) => () => {
      if (!query) return
      let task = null

      if (!useCache) {
        // 不使用选择器缓存，由业务自己决定缓存
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
    ({ dataList, filter, storageList, transformDataToList, loading, useStorage, query, labelProp, getLabel, isFilter }) => {
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
          <Select.OptGroup key='recent' label='最近选择'>
            {
              storageList.length ? transformDataToList(storageList) : <Select.Option key='empty' disabled>没有最近选择</Select.Option>
            }
          </Select.OptGroup>
        )
        return {
          renderList: [selectedItems].concat(newItems)
        }
      }
      else {
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
  withPropsOnChange(['optionLabel'], ({ optionLabel, setCacheLabel }) => setCacheLabel(optionLabel)),
  // 去支持只传递dataSource，并且希望更新dataSource的情况
  withPropsOnChange(['dataSource'], ({ dataSource, setDataList }) => setDataList(dataSource)),
  mapProps(({ dataSource, transformDataToList, ...props }) => props)
)

const withChange = withPropsOnChange( // 外部value到内部value对象形式的转换
  ['value', 'cacheLabel'],
  ({ value, cacheLabel, multiple, mode }) => { // 这里的value是外部传进来的value,约定是一个基础类型的值
    if (isNil(value)) return { value: undefined }
    let realValue = value
    if (multiple || mode === 'multiple') {
      if (!Array.isArray(value)) realValue = [value]
    } else {
      if (Array.isArray(value)) realValue = value[0]
    }
    if (Array.isArray(realValue)) { // multiple
      let sValue = undefined
      if (Array.isArray(cacheLabel)) {
        sValue = zipWith(realValue, cacheLabel, (key, label) => ({ key, label }))
      } else {
        sValue = realValue.map(key => ({ key, label: '' }))
      }
      return {
        value: sValue
      }
    }
    return {
      value: { key: realValue, label: cacheLabel }
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

  onChange = (...args) => {
    const [value] = args
    const { onChange, setCacheLabel } = this.props
    let keys: SelectValue = undefined
    let labels: NArray<string> = undefined
    if (value) {
      if (Array.isArray(value)) {
        const keyMap = new Map()
        value.forEach(({ key, label }) => {
          const realKey = this.storageToReal(key)
          if (!keyMap.has(realKey)) {
            keyMap.set(realKey, label)
          } else {
            // 如果已经有相同的key了，那么说明这是需要删除的项
            keyMap.delete(realKey)
          }
        })
        if (keyMap.size) {
          keys = [...keyMap.keys()]
          labels = [...keyMap.values()]
        }
      } else {
        keys = this.storageToReal(value.key)
        labels = value.label
      }
    }

    setCacheLabel(labels)
    onChange(keys)
    // 清除状态下重新搜索
    if (!value) {
      this.onSearch('')
    }

  }

  onSelect(select, option) {
    const { onSelect, dataList, storageList, selectorId, getValue, updateStorage, selectRef, multiple, mode, query, filter, setFilter, blurOnSelect } = this.props

    const key = this.storageToReal(select.key) // 获取真实的key值
    const originItem = dataList.find(item => getValue(item) === key)

    let isStorage = select.key.startsWith(selectorId)
    if (!isStorage || originItem) { // 从搜索出来的数据中选择.或者在最近选择中选择了有搜索出来的数据
      onSelect(key, originItem)
      updateStorage(originItem, isStorage) // isStorage为true,表示当前只是更新操作.加快updateStorage的速度
    } else {
      const item = storageList.find(item => getValue(item) === select.key)
      onSelect(key, item)
    }

    if (blurOnSelect && !multiple && !['multiple', 'tags'].includes(mode)) { // 单选的情况下、选中失焦
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

  /**
   * 将最近选择的转化为正式的id
   * 主要是避免最近选择的那条数据已经更新
   */
  storageToReal = (value) => {
    const { selectorId, reg } = this.props
    if (value.startsWith(selectorId)) { // 最近选择
      return value.replace(reg, '$1')
    }
    return value
  }

  renderSelect = () => {
    const { onSearch, onSelect, onChange, onopen } = this
    const { multiple, readOnly, renderList, loading, style, addonAfter, setSelectRef, dropdownClassName, children, ...props } = this.props;
    if (readOnly) {
      props.open = false
      props.showSearch = false
    }

    if (multiple) props.mode = 'multiple'
    const select = (
      <Select
        loading={loading}
        {...props}
        ref={setSelectRef}
        className={'gant-selector'}
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
    const { className } = this.props
    return this.renderSelect()
  }
}

const SelectorComponent = compose(
  toClass,
  withLocalStorage,
  withSelector,
  withEdit<SelectorInnerProps<any, any>>(({ label }) => label, 'gant-selector-dropdown'),
  withChange, // 单独将value的处理放到withEdit后面，
)(BasicSelector)

export default class Selector<T, R> extends Component<SelectorProps<T, R>>{
  render() {
    return <SelectorComponent {...this.props} />
  }
}
