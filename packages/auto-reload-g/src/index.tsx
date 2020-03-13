import React, { useCallback, useState, useEffect } from 'react'
import { Tooltip, Divider, Switch, InputNumber, Icon } from 'antd'
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver'
import moment from 'moment'
import classnames from 'classnames'
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
  locale?: LocaleProps,
  prefixCls?: string,
  auto?: boolean,
  interval?: number,
  refresh?: () => void,
  time?: string,
  className?: string,
  style?: object
}

const langs = {
  'en': en,
  'zh-cn': zh
}

let playFun: any = null;

const AutoReload: React.SFC<Props> = ({ auto = false, interval = 1, locale: customLocale, ...props }) => {
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

  return <LocaleReceiver>
    {(local, localeCode = 'zh-cn') => {
      let lang = langs[localeCode] || langs['zh-cn']
      const locale = { ...lang, ...customLocale }
      return <div className={classnames('ant-btn', 'ant-btn-sm', prefixCls + '-container', clsString)} style={style} >
        <Tooltip title={locale.tips}>
          <div onClick={handleRefresh} className={prefixCls + '-toolTipTime'} ><span style={{ verticalAlign: 0 }} ><Icon type='redo' /></span> {updateTime}</div>
        </Tooltip>
        <Divider type="vertical" />
        <Tooltip title={autoRefresh ? locale.close : locale.open} >
          <Switch className={prefixCls + '-autoSwitch'} size="small" checked={autoRefresh} onChange={switchChange} />
        </Tooltip>
        {
          autoRefresh && <>
            <Divider type="vertical" />
            <Tooltip title={<div className={prefixCls + '-toolTipContainer'} >
              <p>{locale.set}</p>
              <p>({locale.unit})</p>
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
    }
  </LocaleReceiver>
}

export default AutoReload