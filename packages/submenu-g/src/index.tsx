import './index.less';
import React from 'react';
import { isEqual } from 'lodash';
import classnames from 'classnames';
import { Menu, Badge } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import FlipOverFooter from './FlipOverFooter';
import { Icon } from '@data-cell';

type menuItem = {
  title: string,
  key: string,
  icon: [React.ReactNode, string],
  count: number,
  disabled?: boolean,
  [key: string]: any
}

type MenuMode = 'horizontal' | 'inline';

export interface CardIF {
  collapsed: boolean,
  mode: MenuMode,
  selectedKey?: string,
  width: number | string,
  fixedTopHeight?: number,
  subMinHeight: number | string,
  collapsedWidth: number | string,
  extra?: React.ReactNode,
  menuData: menuItem[],
  style?: React.CSSProperties,
  classname?: string,
  showMenuMagnet: boolean,
  showFlipOverFooter: boolean,
  onSwitchChange: (nowMode: MenuMode) => void,
  onCollapseChange: (collapsed: boolean) => void,
  onSelectedChange: (key: string, record: menuItem, e?: Event) => void
}

export default class SubMenu extends React.Component<any, Partial<CardIF>> {

  static defaultProps = {
    collapsed: false,
    mode: 'inline',
    width: 200,
    fixedTopHeight: 0,
    collapsedWidth: 40,
    subMinHeight: 112,
    selectedKey: '',
    menuData: [],
    showMenuMagnet: false,
    showFlipOverFooter: false,
    style: {}
  }

  warpRef: null | HTMLDivElement
  prefixCls: null | string

  constructor(props) {
    super(props)
    const { collapsed, mode } = props
    this.state = { collapsed, mode }
  }

  componentDidMount() {
    this.props.showMenuMagnet && window.addEventListener('scroll', this.handleScroll) //监听滚动
  }

  componentDidUpdate(prevProps, prevState) {
    const prev = { mode: prevState.mode, collapsed: prevState.collapsed };
    const next = { mode: this.state.mode, collapsed: this.state.collapsed };
    if (!isEqual(prev, next)) {
      this.setMenuWidthByStatusChange()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  setMenuWidthByStatusChange = () => {
    const { mode } = this.state;
    const { showMenuMagnet } = this.props;
    if (!this.warpRef || !showMenuMagnet) return;
    const fixedEle: any = this.warpRef.querySelector(`.${this.prefixCls}-wrap`); //定位元素
    const fixedEleParent: any = this.warpRef.querySelector(`.${this.prefixCls}-menubox`);
    if (fixedEleParent) { //上下文菜单切换方向时menu宽度
      fixedEle.style.width = `${fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
    }
  }

  handleScroll = () => {
    const { fixedTopHeight, showFixedBoxShadow } = this.props;
    const { mode } = this.state;
    if (!this.warpRef) return;
    const fixedEle: any = this.warpRef.querySelector(`.${this.prefixCls}-wrap`); //定位元素
    const fixedEleParent: any = this.warpRef.querySelector(`.${this.prefixCls}-menubox`);
    const parentClientTop = fixedEleParent ? fixedEleParent.getBoundingClientRect().top : 0; //定位元素父级距离浏览器的高度
    const horEle = this.warpRef.querySelector(`.${this.prefixCls}-menuboxhor`);

    if (parentClientTop <= fixedTopHeight) {
      fixedEle.classList.add(`${this.prefixCls}-fixed`)
      fixedEle.style.top = `${fixedTopHeight}px`;
      fixedEle.style.width = `${fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
      if (showFixedBoxShadow && horEle) {
        fixedEle.classList.add(`${this.prefixCls}-boxShow`)
      }
    } else {
      fixedEle.classList.remove(`${this.prefixCls}-fixed`)
      fixedEle.classList.remove(`${this.prefixCls}-boxShow`)
    }
  }

  //点击切换mode
  onSwitchClick = () => {
    const { onSwitchChange } = this.props;
    let nowMode: MenuMode = this.state.mode == 'inline' ? 'horizontal' : 'inline';
    this.setState({ mode: nowMode });
    onSwitchChange && onSwitchChange(nowMode);
  }
  //点击收缩
  toggleCollapsed = () => {
    const { onCollapseChange } = this.props;
    this.setState(state => ({ collapsed: !state.collapsed }), () => {
      onCollapseChange && onCollapseChange(this.state.collapsed);
      window.dispatchEvent(new Event('resize'));
    });
  }
  //点击菜单item
  onClick = ({ key, item }: ClickParam) => {
    const { onSelectedChange, menuData } = this.props;
    let record: menuItem = menuData.find((i) => i.key == key);
    onSelectedChange && onSelectedChange(key, record, item);
  }
  //点击翻页页脚
  onFooterSelectedChange = (nowKey, record) => {
    const { onSelectedChange } = this.props;
    onSelectedChange && onSelectedChange(nowKey, record);
  }

  //渲染menu主体
  renderSubMenu(prefixCls) {
    const { collapsed, mode } = this.state;
    const { selectedKey, menuData } = this.props;
    let selectedKeys = selectedKey ? [selectedKey] : menuData.length && [menuData[0].key] || [];
    let inlineCollapsed = mode == 'inline' && collapsed;
    let inlineProperty = mode == 'inline' ? { inlineCollapsed: collapsed } : {};
    return <Menu
      className={prefixCls}
      selectedKeys={selectedKeys}
      mode={mode}
      onClick={this.onClick}
      {...inlineProperty}
    >
      {menuData.map((item: menuItem) =>
        <Menu.Item
          className={inlineCollapsed && `${prefixCls}-collapsed`}
          disabled={item.disabled}
          key={item.key}
        >
          {typeof item.icon == 'string' ? <Icon type={item.icon} /> : item.icon}
          <span>{item.title}</span>
          {item.count && <span className={`${prefixCls}-item-count`}><Badge count={<>{item.count}</>} /></span>}
        </Menu.Item>
      )}
    </Menu>
  }
  // 渲染垂直菜单
  renderInlineMenu(prefixCls) {
    const { collapsed } = this.state;
    const { extra, width, collapsedWidth, setMenuBoxRef, style } = this.props;
    return <div
      ref={setMenuBoxRef}
      className={`${prefixCls}-menubox ${prefixCls}-menuboxinline`}
      style={{ width: collapsed ? collapsedWidth + 1 : width, ...style }}
    >
      <div className={`${prefixCls}-wrap`} style={{ width: 'calc(100% - 1px)' }}>
        <div className={`${prefixCls}-collapsebtn`} style={{ width: collapsed ? collapsedWidth : '100%' }}>
          <Icon.Ant
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleCollapsed}
          />
          <Icon.Ant type="switcher" onClick={this.onSwitchClick} />
        </div>
        {!collapsed && extra}
        {this.renderSubMenu(prefixCls)}
      </div>
    </div>
  }
  // 渲染水平菜单
  renderHorMenu(prefixCls) {
    const { collapsedWidth, setMenuBoxRef, style } = this.props
    return <div
      ref={setMenuBoxRef}
      className={`${prefixCls}-menubox ${prefixCls}-menuboxhor`}
      style={{ width: '100%', height: collapsedWidth, ...style }}
    >
      <div className={`${prefixCls}-wrap`} style={{ width: 'calc(100% - 1px)' }}>
        <div className={`${prefixCls}-menuinternal`}>
          <div className={`${prefixCls}-menuleft`}>
            <div className={`${prefixCls}-horMenu`}>
              {this.renderSubMenu(prefixCls)}
            </div>
          </div>
          <div className={`${prefixCls}-menuright`}>
            <Icon.Ant type="switcher" className={`${prefixCls}-horIcon`} onClick={this.onSwitchClick} />
          </div>
        </div>
      </div>
    </div>
  }
  render() {
    const getPrefixCls = (cls, customizePrefixCls = '') => customizePrefixCls || 'gant' + cls;
    const { prefixCls: customizePrefixCls, classname, children, subMinHeight, selectedKey, menuData, showFlipOverFooter } = this.props;
    this.prefixCls = getPrefixCls('submenu', customizePrefixCls);
    const isInline = this.state.mode == 'inline';
    let wrapStyle = { minHeight: subMinHeight };
    isInline && (wrapStyle['display'] = 'flex');

    return <div ref={ref => this.warpRef = ref} className={classnames(`${this.prefixCls}-pagewrap`, classname)} style={wrapStyle}>
      {isInline ? this.renderInlineMenu(this.prefixCls) : this.renderHorMenu(this.prefixCls)}
      <div className={`${this.prefixCls}-pagecard`}>
        <>{children}</>
        {showFlipOverFooter && <FlipOverFooter
          prefixCls={this.prefixCls}
          data={menuData}
          nowKey={selectedKey}
          onSelectedChange={this.onFooterSelectedChange}
        />}
      </div>
    </div>
  }
}