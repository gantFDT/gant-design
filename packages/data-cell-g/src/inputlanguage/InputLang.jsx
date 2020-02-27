import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { zipWith, get, map, pick, isUndefined } from 'lodash'
import { compose, defaultProps, withState, withProps, withHandlers, mapProps, withPropsOnChange, toClass } from 'recompose'

import { withEdit } from '../compose'

const withLangSelect = compose(
  // withState('cacheMap', 'setCacheMap', new Map()),
  mapProps(({ localeList = [], ...props }) => {
    return {
      ...props,
      localeList,
      language: map(localeList, item => pick(item, ['locale', 'label'])),
    }
  }),
  withPropsOnChange(['cacheId', 'localeList'], ({ localeList }) => {
    const cacheEntries = map(localeList, item => ([item.locale, item.value]))
    return {
      cacheMap: new Map(cacheEntries)
    }
  }),
  defaultProps({
    allowClear: true,
    placeholder: '请输入文本',
    onChange: () => { },
    value: {},
  }),
  withHandlers({
    onLocaleChange: ({ cacheMap, onChange }) => (locale) => {
      const value = cacheMap.get(locale)
      onChange({ value, locale })
    }
  }),
  withProps(({ onLocaleChange, language, cacheMap, onSave, ...props }) => {
    const currentLocale = get(props, 'value.locale', get(props, 'language[0].locale'))
    return {
      addonBefore: (
        <Select style={{ width: 75 }} value={currentLocale} onChange={onLocaleChange}>
          {language.map(item => <Select.Option value={item.locale} key={item.locale}>{item.label}</Select.Option>)}
        </Select>
      ),
      locale: currentLocale,
    }
  })
)


@compose(
  toClass,
  withLangSelect,
  withEdit(({ value, locale, cacheMap }) => isUndefined(value.value) ? cacheMap.get(locale) : value.value),
  withProps(props => {
    return {
      value: isUndefined(props.value.value) ? props.cacheMap.get(props.locale) : props.value.value,
    }
  })
)
class InputLang extends Component {

  componentDidMount() {
    const { value, locale, cacheMap } = this.props
    cacheMap.set(locale, value)
  }

  onInputChange = (e) => {
    const { value } = e.target;
    const { locale, onChange, cacheMap } = this.props
    cacheMap.set(locale, value)
    // 回调给调用层
    onChange({
      value,
      locale
    })
  }

  render() {
    const { onEnter, setlocale, cacheId, cacheMap, localeList, onLocaleChange, ...props } = this.props
    return (
      <Input {...props} onKeyDown={onEnter} onChange={this.onInputChange} />
    );
  }
}


export default InputLang
