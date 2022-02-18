import '@header/style';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';
/*! Start !*/
import React, { useState, useMemo } from 'react';
import { message, Icon, Button, Tooltip, Slider,Radio } from 'antd';
import { Header } from '@gantd';
/*! Split !*/
function BasicUse() {
  return (
    <>
      <Header type="line" title="标题(短线)" />
      <Header type="icon" icon="file-text" title="标题(图标)" />
      <Header type="num" title="标题(数字)" />
      <Header
        title="标题(回退)"
        beforeExtra={
          <Icon
            type="left"
            style={{ marginRight: 10 }}
            onClick={() => {
              message.info('goback success');
            }}
          />
        }
      />
    </>
  );
}
/*! Split !*/
function ExtraUse() {
  const [value, setvalue] = useState(100);
  const onChange = React.useCallback(v => {
    setvalue(v);
  }, []);
  return (
    <>
      <Slider min={1} max={100} onChange={onChange} value={value} />
      <div style={{ width: `${value}%` }}>
        <Header
          title="工具栏"
          size={'small'}
          extra={
            <>
              <Tooltip title="新增">
                <Button icon="plus" type="primary" />
              </Tooltip>
              <Tooltip title="编辑">
                <Button icon="edit" />
              </Tooltip>
              <Tooltip title="保存">
                <Button icon="save">保存</Button>
              </Tooltip>
              <Tooltip title="复制">
                <Button icon="copy">复制</Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button icon="delete" type="danger" />
              </Tooltip>
            </>
          }
        />
        <Header
          title="小工具栏"
          extra={
            <>
              <Tooltip title="复制">
                <Button icon="copy" size="small">
                  复制
                </Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button icon="delete" size="small" type="danger" />
              </Tooltip>
            </>
          }
        />
      </div>
    </>
  );
}
/*! Split !*/
function ColorUse() {
  return (
    <>
      <Header type="line" title="标题(短线)" color="#1890ff" />
      <Header type="icon" icon="file-text" title="标题(图标)" color="#1890ff" />
      <Header type="num" title="标题(数字)" color="#1890ff" />
      <Header
        title="标题(回退)"
        beforeExtra={
          <Icon
            type="left"
            style={{ marginRight: 10, color: '#1EA7FD' }}
            onClick={() => {
              message.info('goback success');
            }}
          />
        }
        color="#1890ff"
      />
    </>
  );
}
/*! Split !*/
function BottomLineUse() {
  return (
    <>
      <Header title="显示分割线" bottomLine={true} />
    </>
  );
}
/*! Split !*/
function SizeUse() {
  const [size, setSize] = useState('default');
  const onRadioChange = e => {
    const value = e.target.value;
    setSize(value);
  };
  return (
    <>
      <Radio.Group value={size} buttonStyle="solid" onChange={onRadioChange} size={size}>
        <Radio.Button value="small">small</Radio.Button>
        <Radio.Button value="default">default</Radio.Button>
        <Radio.Button value="large">large</Radio.Button>
      </Radio.Group>
      <Header type="line" title="标题(短线)" size={size} />
      <Header type="icon" icon="file-text" title="标题(图标)" size={size} />
      <Header type="num" title="标题(数字)" size={size} />
      <Header
        title="标题(回退)"
        beforeExtra={
          <Icon
            type="left"
            style={{ marginRight: 10 }}
            onClick={() => {
              message.info('goback success');
            }}
          />
        }
        size={size}
      />
    </>
  );
}
/*! End !*/
const config = {
  codes: code,
  inline: true,
  useage: `
    <b>🕯 常用类型</b></br>
    标题可以用三种类型的修饰</br>
    <b>🤸‍♂️ 工具栏溢出显示</b></br>
    当工具栏放置了很多按钮时，我们的容器不足以展示，但还是可以显示完整的按钮</br>
    `,
  children: [
    {
      title: '基本用法',
      describe: '可以配置短线型、图标型、数字型',
      cmp: BasicUse,
    },
    {
      title: '溢出式工具栏',
      describe: '超出的工具会被收进下拉按钮组里',
      cmp: ExtraUse,
    },
    {
      title: '自定义颜色',
      describe: '通过color属性进行颜色自定义,theme关键字可使用主题色',
      cmp: ColorUse,
    },
    {
      title: '显示分割线',
      describe: '显示分割线',
      cmp: BottomLineUse,
    },
    {
      title: '大小',
      describe: 'size大小',
      cmp: SizeUse,
    },
  ],
};
export default () => <CodeDecorator config={config} />;
