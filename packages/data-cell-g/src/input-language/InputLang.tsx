import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { map, pick, cloneDeep } from 'lodash'
import { compose, defaultProps, withState, withProps, withHandlers, toClass, withPropsOnChange } from 'recompose'
import { withEdit } from '../compose'
import { WithBasicProps } from '../compose/withbasic';
export interface GantInputLangProps extends WithBasicProps {
  allowClear?: boolean,
  placeholder?: string,
  onChange?: (val: value) => void
  value?: value | {},
  localeList?: localeItem[],
  [props:string]:any
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

    return localeList
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
  withProps(({ localeList }) => {
    return {
      language: localeList.length ? map(localeList, item => pick(item, ['locale', 'label'])) : defaultLocaleList,
    }
  }),
  withState("currentLocale", "setCurrentLocale", ({ language, defalutLocale }) => defalutLocale || language[0].locale),
  withHandlers({
    onLocaleChange: ({ setCurrentLocale }) => (locale) => {
      setCurrentLocale(locale)
    }
  })
)


@compose(
  toClass,
  withLangSelect,
  withEdit(({ currentLocale, value }) => value[currentLocale], "gantd-input-lang-addonBefore"),
  withProps(({ onLocaleChange, language, currentLocale, size, value }) => {
    return {
      addonBefore: (
        <Select dropdownClassName="gantd-input-lang-addonBefore" style={{ width: 75 }}
          size={size}
          value={currentLocale} onChange={onLocaleChange}>
          {language.map(item => <Select.Option value={item.locale} key={item.locale}>{item.label}</Select.Option>)}
        </Select>
      ),
      currentValue: value[currentLocale]
    }
  })
)
class InputLang extends Component<any> {
  onInputChange = (e) => {
    const { value: v } = e.target;
    const { currentLocale, onChange, value } = this.props
    const cv = cloneDeep(value)
    cv[currentLocale] = v
    onChange(cv)
  }

  render() {
    const { onEnter, setlocale, cacheId, localeList, wrapperRef, setCurrentLocale, onLocaleChange, currentValue, currentLocale, ...props } = this.props
    return (
      <Input {...props} value={currentValue}
        ref={wrapperRef}
        onKeyDown={onEnter} onChange={this.onInputChange} />
    );
  }
}


export default class InputLangWapper extends Component<GantInputLangProps> {
  render() {
    return <InputLang {...this.props} />
  }
}