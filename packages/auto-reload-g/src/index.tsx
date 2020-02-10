import 'antd/dist/antd.css';
// import 'antd/lib/switch/style/index.css';
// import 'antd/lib/InputNumber/style/index.css';
import React, { useCallback, useState, useEffect } from 'react';
// import { ConfigConsumer } from '@gantd/config-provider';
import { Button, Tooltip, Divider, Switch, InputNumber, Icon } from 'antd'
import './index.less';
import moment from 'moment';
import classnames from 'classnames'

const tr = a => a

const format = "hh:mm:ss"

interface Props {
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
    className,
    style,
    time,
    refresh = () => { }
  } = props;
  // const prefixCls = getPrefixCls('auto-reload');
  const prefixCls = 'gant-auto-reload'
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
    <Tooltip title={`${tr("最新数据更新时间")},${tr("点击更新数据")}`} >
      <div onClick={handleRefresh} className={prefixCls + '-toolTipTime'} ><span style={{ verticalAlign: 0 }} > <Icon type='redo' /></span> {updateTime}</div>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title={autoRefresh ? tr("关闭自动更新") : tr("开启自动更新")} >
      <Switch className={prefixCls + '-autoSwitch'} size="small" checked={autoRefresh} onChange={switchChange} />
    </Tooltip>
    {
      autoRefresh && <>
        <Divider type="vertical" />
        <Tooltip title={<div className={prefixCls + '-toolTipContainer'} >
          <p>{tr("设置自动更新触发时间")}</p>
          <p>({tr("单位")}：{tr("分")})</p>
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

export default AutoReload
