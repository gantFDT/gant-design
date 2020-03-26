import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { map, pick, } from 'lodash'
import { compose, defaultProps, withState, withProps, withHandlers, toClass } from 'recompose'
import { withEdit } from '../compose'
import { WidthBasicProps } from '../compose/widthbasic';
export interface GantInputLangProps extends WidthBasicProps {
  allowClear?: boolean,
  placeholder?: string,
  onChange?: (val: value) => void
  value?: value,
  localeList?: localeItem[]
}
interface value {
  locale: string,
  value: string
}
interface localeItem {
  locale: string,
  label: string,
}

const defaultLocaleList: localeItem[] = [
  {
    locale: 'zh-CN',
    label: '中文',
  },
  {
    locale: 'en-US',
    label: 'English',
  }
]

const getMergeLocale = (list) => {
  if (list.length) {
    const entries: any = [...defaultLocaleList, ...list].map(item => [item.locale, item.label]);
    const map = new Map(entries)
    const localeList = []
    for (const [locale, label] of map.entries()) {
      localeList.push({
        label, locale
      })
    }
  }
  return defaultLocaleList
}

const withLangSelect = compose(
  defaultProps({
    allowClear: true,
    placeholder: '请输入文本',
    onChange: () => { },
    localeList: [],
  }),
  withState('cacheMap', 'setCacheMap', ({ value = [] }) => {
    if (Array.isArray(value) && value.length) {
      const cacheEntries = map(value, item => ([item.locale, item.value]))
      return new Map(cacheEntries)
    }
    return new Map()

  }),
  withProps(({ localeList, cacheMap, onChange }) => {
    return {
      language: map(getMergeLocale(localeList), item => pick(item, ['locale', 'label'])),
      onChange() {
        const newValue = []
        for (const [locale, value] of cacheMap.entries()) {
          newValue.push({ locale, value })
        }
        onChange(newValue)
      }
    }
  }),
  withState("currentLocale", "setCurrentLocale", ({ value = [], language }) => (value[0] || language[0]).locale),
  withHandlers({
    onLocaleChange: ({ setCurrentLocale }) => (locale) => {
      setCurrentLocale(locale)
    }
  })
)


@compose(
  toClass,
  withLangSelect,
  withEdit(({ currentLocale, cacheMap }) => cacheMap.get(currentLocale), "gantd-input-lang-addonBefore"),
  withProps(({ onLocaleChange, language, cacheMap, currentLocale, size }) => {
    return {
      addonBefore: (
        <Select dropdownClassName="gantd-input-lang-addonBefore" style={{ width: 75 }}
          size={size}
          value={currentLocale} onChange={onLocaleChange}>
          {language.map(item => <Select.Option value={item.locale} key={item.locale}>{item.label}</Select.Option>)}
        </Select>
      ),
      currentValue: cacheMap.get(currentLocale)
    }
  })
)
class InputLang extends Component<any> {
  onInputChange = (e) => {
    const { value } = e.target;
    const { currentLocale, onChange, cacheMap } = this.props
    cacheMap.set(currentLocale, value)
    onChange()
  }

  render() {
    const { onEnter, setlocale, cacheId, cacheMap, localeList, setCurrentLocale, onLocaleChange, currentValue, setCacheMap, currentLocale, ...props } = this.props
    return (
      <Input {...props} value={currentValue} onKeyDown={onEnter} onChange={this.onInputChange} />
    );
  }
}


export default class InputLangWapper extends Component<GantInputLangProps> {
  render() {
    return <InputLang {...this.props} />
  }
}