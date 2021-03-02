import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Drawer, Radio, Empty } from 'antd';
import { CustomIconOptions } from 'antd/lib/icon/IconFont';
import classnames from 'classnames';
import _ from 'lodash';
import { compose, defaultProps, toClass, withProps } from 'recompose';

import Icon, { IconComponent, IconProps } from './Icon';
import { withEdit } from '../compose';
import Input from '../input';
import EditStatus from '../edit-status';
import { WithEditInProps } from '../with-edit';

const tr = a => a;

const { getOutLine, updateFromIconfontCN, Ant } = Icon;
const outline = getOutLine();

const bodyStyle = {
  height: 'calc(100vh - 41px)',
  padding: 10,
  overflow: 'hidden',
};

enum IconTypes {
  IconFont = 'IconFont',
  AntIcon = 'AntIcon',
}

const defaultprops = {
  perfix: 'icon-',
  // onChange(icon: string) { },
  value: '',
};

type PropExtend<T, U> = U &
  {
    [K in Exclude<keyof T, keyof U>]?: T[K];
  };

type BasicProps = PropExtend<
  IconProps,
  PropExtend<
    typeof defaultprops,
    {
      onBlur?: Function;
      [key: string]: any;
    }
  >
>;

type IconHouseProps<T> = any;

type IconSelectorProps<T> = PropExtend<WithEditInProps<T>, BasicProps>;
const drawerClassname = 'gant-icon-selector-drawer-wrapper';
const IconHouse: React.FC<IconHouseProps<string>> = ({
  onChange,
  value,
  onBlur = undefined,
  addonAfter,
  allowEdit,
  onEnter,
  perfix,
  size = 'normal',
  controlMode,
  ...props
}) => {
  const prefixCls = 'gant-icon-selector';

  // 图标抽屉
  const [visible, setvisible] = useState(false);
  // 图标id
  const [IDs, setIDs] = useState([] as string[]);
  // 搜索框
  const [text, settext] = useState('');
  // 当前icon
  const [currentId, setCurrentId] = useState(value);
  // 当前显示的图标类型

  const iconTypes = useMemo(() => {
    let iconTypeArr = [IconTypes.AntIcon];
    if (!_.isEmpty(IDs)) {
      iconTypeArr.push(IconTypes.IconFont);
    }
    return iconTypeArr;
  }, [IDs]);

  const [iconType, seticonType] = useState(iconTypes[0]);

  const icons = useMemo(
    () => ({
      IconFont: IDs,
      AntIcon: outline,
    }),
    [IDs],
  );

  useEffect(() => {
    setCurrentId(value);
  }, [value]);
  const toggleVisible = useCallback(() => {
    if (!visible) {
      // 打开
      settext('');
    }
    setvisible(!visible);
  }, [visible]);

  const onSelectIcon = useCallback((id: string) => {
    setCurrentId(id);
    if (onChange) onChange(id);
    toggleVisible();
  }, []);

  // 获取图标id
  useState(() => {
    // const tag = queryIconHouse(iconWareHouse)
    const tag = document.querySelector('svg');
    if (!tag) return;
    const iconIds = [].slice
      .call(tag.querySelectorAll('symbol'))
      .map((symbol: Element) => symbol.id);
    setIDs(iconIds);
  });

  // 切换图标
  const handleTypeChange = useCallback(e => {
    seticonType(e.target.value);
  }, []);

  const iconsWithFilter = useMemo(
    () =>
      icons[iconType].filter(id => {
        return id.includes(text);
      }),
    [icons, iconType, text],
  );

  return (
    <>
      <div className={classnames('gant-icon-select', size)} onClick={toggleVisible}>
        {currentId ? (
          <Icon type={currentId} title={tr('点击切换')} perfix={perfix} {...props} />
        ) : (
          <span className={prefixCls + '-btn'}>{tr('点击选择')}</span>
        )}
      </div>
      <Drawer
        width={visible ? 500 : 0}
        title={tr('请选择图标')}
        destroyOnClose
        placement="right"
        onClose={toggleVisible}
        visible={visible}
        bodyStyle={bodyStyle}
        className={drawerClassname}
      >
        <div className={classnames(prefixCls + '-search')}>
          <Radio.Group value={iconType} onChange={handleTypeChange}>
            {iconTypes.map(type => (
              <Radio.Button key={type} value={type}>
                {type}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div style={{ flex: 1, marginLeft: 10 }}>
            <Input
              edit={EditStatus.EDIT}
              value={text}
              onChange={settext}
              placeholder={tr('搜索')}
              allowClear
            />
          </div>
        </div>
        <div className={classnames(prefixCls + '-scroll')}>
          {iconsWithFilter.length ? null : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={tr('没有匹配图标')}
              style={{ margin: '30px auto 0' }}
            />
          )}
          <div className={classnames(prefixCls + '-content')}>
            {iconsWithFilter.map(id => (
              <div
                className={prefixCls + '-content-item'}
                title={id}
                key={id}
                onClick={() => onSelectIcon(id)}
              >
                <Icon perfix={perfix} type={id} className={prefixCls + '-content-item-iconitem'} />
                <div style={{ width: '100%' }}>{id}</div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

interface IconSelectorCmp {
  (props: IconSelectorProps<string>): React.ReactElement;
  updateFromIconfontCN: (config: CustomIconOptions) => void;
  Ant: IconComponent<IconProps>;
}

const IconSelector = compose(
  toClass,
  defaultProps(defaultprops),
  withProps(({ allowEdit, edit, wrapperStyle = {}, type, value, onChange }) => {
    const cStyle: React.CSSProperties = { ...wrapperStyle };
    // 根据是否有value和onChange来确定是否受控
    const controlMode = !(_.isUndefined(value) || _.isUndefined(onChange));
    if (!controlMode) {
      cStyle.display = 'inline-block';
      cStyle.width = 'auto';
    }
    return {
      wrapperStyle: cStyle,
      value: value || type,
      allowEdit: controlMode ? allowEdit : false,
      edit: controlMode ? edit : EditStatus.CANCEL,
      controlMode,
    };
  }),
  withEdit(
    ({
      value,
      style,
      theme,
      spin,
      rotate,
      component,
      twoToneColor,
      controlMode,
      perfix,
      className,
      onClick,
    }) => {
      const element = (
        <Icon
          type={value}
          perfix={perfix}
          style={style}
          theme={theme}
          spin={spin}
          rotate={rotate}
          component={component}
          twoToneColor={twoToneColor}
          className={className}
          onClick={onClick}
        />
      );
      if (!controlMode) {
        return element;
      }
      return value ? element : undefined;
    },
    drawerClassname,
  ),
)(IconHouse) as IconSelectorCmp;

IconSelector.updateFromIconfontCN = updateFromIconfontCN;
IconSelector.Ant = Ant;

export default IconSelector;

export { IconSelector };
