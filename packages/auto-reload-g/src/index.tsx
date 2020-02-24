import './index.less';
import React, { useCallback, useState, useEffect } from 'react';
import { Tooltip, Divider, Switch, InputNumber, Icon } from 'antd'
import moment from 'moment';
import classnames from 'classnames'

const format = "hh:mm:ss"

interface Props {
  locale?: {
    tips: string,
    close: string,
    open: string,
    set: string,
    unit: string
  },
  prefixCls?: string,
  auto?: boolean,
  interval?: number,
  refresh: () => void,
  time?: string,
  className?: string,
  style?: object
}
let playFun: any = null;

const AutoReload: React.SFC<Props> = ({ auto = false, interval = 1,  ...props }) => {
  const {
    locale: autoReloadLocale = {
      tips: '最新数据更新时间，点击更新数据',
      close: '关闭自动更新',
      open: '开启自动更新',
      set: '设置自动更新触发时间',
      unit: '单位：分'
    },
    prefixCls: customizePrefixCls = 'gant',
    className,
    style,
    time,
    refresh = () => { }
  } = props;

  const prefixCls = customizePrefixCls + 'auto-reload';

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

  return <><div className={classnames('ant-btn', 'ant-btn-sm', prefixCls + '-container', clsString)} style={style} >
    <Tooltip title={autoReloadLocale.tips} >
      <div onClick={handleRefresh} className={prefixCls + '-toolTipTime'} ><span style={{ verticalAlign: 0 }} > <Icon type='redo' /></span> {updateTime}</div>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title={autoRefresh ? autoReloadLocale.close : autoReloadLocale.open} >
      <Switch className={prefixCls + '-autoSwitch'} size="small" checked={autoRefresh} onChange={switchChange} />
    </Tooltip>
    {
      autoRefresh && <>
        <Divider type="vertical" />
        <Tooltip title={<div className={prefixCls + '-toolTipContainer'} >
          <p>{autoReloadLocale.set}</p>
          <p>({autoReloadLocale.unit})</p>
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
  </>
}

export default AutoReload;