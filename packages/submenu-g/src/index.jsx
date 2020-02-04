import 'antd/lib/menu/style/index.css';
import './index.less';
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Badge } from 'antd';
import { ConfigConsumer } from '@gantd/config-provider';
import Icon from '@gantd/icon';

//收缩时菜单的宽
const collapsedWidth = 40;

export default class SubMenu extends React.Component {

  static propTypes = {
    collapsed: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    mode: PropTypes.string,
    selectedKey: PropTypes.string,
    subMinHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    menuData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    })).isRequired,
    style: PropTypes.object
  }

  static defaultProps = {
    collapsed: false,
    mode: 'inline',
    width: 200,
    subMinHeight: 112,
    style: {}
  }

  static setIconfont = (data) => {
    Icon.createFromIconfontCN(data)
  }

  constructor(props) {
    super(props)
    const { collapsed, mode } = props
    this.state = {
      collapsed,
      mode,
    }
  }
  //点击切换mode
  onSwitchClick = (e) => {
    const { mode } = this.state;
    const { onSwitchChange } = this.props;
    let nowMode = mode == 'inline' ? 'horizontal' : 'inline';
    this.setState({ mode: nowMode })
    onSwitchChange && onSwitchChange(nowMode);
  }
  //点击收缩
  toggleCollapsed = () => {
    const { onCollapseChange } = this.props;
    this.setState(state => ({
      collapsed: !state.collapsed
    }), () => {
      onCollapseChange && onCollapseChange(this.state.collapsed);
      window.dispatchEvent(new Event('resize'));
    });
  }
  //点击菜单item
  onClick = (e) => {
    const { onSelectedChange } = this.props;
    const { props: { path, eventKey } } = e.item;
    onSelectedChange && onSelectedChange(path, eventKey, e);
  }
  //渲染menu主体
  renderSubMenu(prefixCls) {
    const { collapsed, mode } = this.state;
    const { menuData = [], selectedKey } = this.props;
    let selectedKeys = selectedKey ? [selectedKey] : menuData.length && [menuData[0].name] || [];
    let inlineCollapsed = mode == 'inline' && collapsed;
    let inlineProperty = mode == 'inline' ? { inlineCollapsed: this.state.collapsed } : {};
    return <Menu
      theme="light"
      className={prefixCls}
      selectedKeys={selectedKeys}
      mode={this.state.mode}
      onClick={this.onClick}
      {...inlineProperty}
    >
      {menuData.map(item =>
        <Menu.Item className={inlineCollapsed && `${prefixCls}-collapsed`} key={item.name} path={item.path}>
          {typeof item.icon == 'string' ? item.icon.indexOf("iconfont") == 0 ? <Icon type={item.icon.substring(9)} /> : <Icon type={item.icon} /> : item.icon}
          <span>{item.name}</span>
          {item.count && <span className={`${prefixCls}-item-count`}><Badge count={item.count} /></span>}
        </Menu.Item>
      )}
    </Menu>
  }
  // 渲染垂直菜单
  renderInlineMenu(prefixCls) {
    const { collapsed } = this.state;
    const { extra = '', width, setMenuBoxRef, style } = this.props;
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
          <Icon.Ant
            type="switcher"
            onClick={this.onSwitchClick}
          />
        </div>
        {!collapsed && extra}
        {this.renderSubMenu(prefixCls)}
      </div>
    </div>
  }
  // 渲染水平菜单
  renderHorMenu(prefixCls) {
    const { style } = this.props
    return <div
      ref={this.props.setMenuBoxRef}
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
  //渲染包含前缀名的consumer
  renderWithConfigConsumer = ({ getPrefixCls }) => {
    const { prefixCls: customizePrefixCls, children, subMinHeight } = this.props;
    const prefixCls = getPrefixCls('submenu', customizePrefixCls);
    const isInline = this.state.mode == 'inline';
    let wrapStyle = { minHeight: subMinHeight };
    isInline && (wrapStyle.display = 'flex');
    return (
      <div className={`${prefixCls}-pagewrap`} style={wrapStyle}>
        {isInline ? this.renderInlineMenu(prefixCls) : this.renderHorMenu(prefixCls)}
        <div className={`${prefixCls}-pagecard`}>{children}</div>
      </div>
    )
  }
  render() {
    return <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
  }
}