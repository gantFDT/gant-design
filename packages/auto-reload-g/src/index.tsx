import './index.less';
import React, { useCallback, useState, useEffect } from 'react';
import { Tooltip, Divider, Switch, InputNumber, Icon } from 'antd'
import moment from 'moment';
import classnames from 'classnames'
import { IntlProvider, useIntl } from 'react-intl'
import en from './locale/en-US'
import zh from './locale/zh-CN'
const format = "hh:mm:ss"

export interface LocaleProps {
  tips: string,
  close: string,
  open: string,
  set: string,
  unit: string
}

export interface Props {
  prefixCls?: string,
  auto?: boolean,
  interval?: number,
  refresh?: () => void,
  time?: string,
  className?: string,
  style?: object
}

export enum langEnum {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
}
export interface LocalLocalWrapperProps extends Props {
  i18n?: langEnum,
  locale?: LocaleProps
}

let playFun: any = null;

const AutoReload: React.SFC<Props> = ({ auto = false, interval = 1, ...props }) => {
  const { formatMessage: f } = useIntl();
  const {
    prefixCls: customizePrefixCls = 'gant',
    className,
    style,
    time,
    refresh = () => { }
  } = props;

  const prefixCls = customizePrefixCls + '-auto-reload';

  const clsString = classnames(prefixCls, className);

  const [updateTime, setUpdateTime] = useState(time ? time : moment().format(format));

  useEffect(() => {
    if (time) setUpdateTime(time)
  }, [time, setUpdateTime, playFun])

  const [autoRefresh, setAutoRefresh] = useState(auto);

  const [autoTime, setAutoTime] = useState(interval as number);

  const handleRefresh = useCallback(() => {
    if (refresh) refresh();
    if (!time) setUpdateTime(moment().format(format))
  }, [refresh, setUpdateTime])

  useEffect(() => {
    if (autoRefresh) {
      if (playFun) clearInterval(playFun);
      playFun = setInterval(handleRefresh, 60 * 1000 * autoTime)
    } else {
      clearInterval(playFun);
      playFun = null
    }
    return () => {
      if (playFun) clearInterval(playFun);
    }
  }, [autoTime, handleRefresh, autoRefresh])

  const switchChange = useCallback((checked) => {
    setAutoRefresh(checked)
  }, [setAutoRefresh])

  const inputChange = useCallback((value) => {
    const reg = /(^[1-9]\d*$)/;
    if (reg.test(value)) {
      setAutoTime(value)
    }
  }, [setAutoTime])

  return <div className={classnames('ant-btn', 'ant-btn-sm', prefixCls + '-container', clsString)} style={style} >
    <Tooltip title={f({ id: 'tips' })} >
      <div onClick={handleRefresh} className={prefixCls + '-toolTipTime'} ><span style={{ verticalAlign: 0 }} ><Icon type='redo' /></span> {updateTime}</div>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title={autoRefresh ? f({ id: 'close' }) : f({ id: 'open' })} >
      <Switch className={prefixCls + '-autoSwitch'} size="small" checked={autoRefresh} onChange={switchChange} />
    </Tooltip>
    {
      autoRefresh && <>
        <Divider type="vertical" />
        <Tooltip title={<div className={prefixCls + '-toolTipContainer'} >
          <p>{f({ id: 'set' })}</p>
          <p>({f({ id: 'unit' })})</p>
        </div>} >
          <InputNumber value={autoTime}
            min={1}
            max={30}
            size='small'
            onChange={inputChange}
            className={prefixCls + '-autoTimeInput'}
          />
        </Tooltip>
      </>
    }
  </div>
}

const LocalWrapper = (props: LocalLocalWrapperProps) => {
  const { i18n = navigator.language, locale, ...restProps } = props
  const langs = {
    'en-US': en,
    'zh-CN': zh
  }
  let _i18n = Object.keys(langs).find(i => i == i18n)
  let _locale = _i18n ? _i18n.split('-')[0] : 'en'
  let messages = langs[i18n] || en
  if (locale) messages = { ...messages, ...locale }
  return <IntlProvider locale={_locale} messages={messages}>
    <AutoReload {...restProps} />
  </IntlProvider>
}
export default LocalWrapper