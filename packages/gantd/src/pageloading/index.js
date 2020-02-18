import React,{Component} from 'react';
import classnames from 'classnames'
import './index.less';
import { ConfigConsumer } from '../config-provider'

//页面加载loading
import pageLoadings from './loadings'

export default class PageLoading extends Component {
  // static propTypes = {
  //   className: propTypes.string,
  //   size: propTypes.string,
  //   bordered: propTypes.bool,
  //   bodyStyle: propTypes.object,
  //   defaultMinHei: propTypes.bool,
  //   showBoxShadow: propTypes.bool
  // }

  // static defaultProps = {
  //   className: '',
  //   defaultMinHei: false,
  //   showBoxShadow: false,
  //   bordered: true,
  //   bodyStyle: {},
  // }

  renderWithConfigConsumer = ({ getPrefixCls }) => {
    const prefixCls = getPrefixCls('pageloading');
    const { index = 0, height = 200, className, ...rest } = this.props;
    const clsString = classnames(prefixCls, 'aligncenter', className);
    return (
      <div style={{height:height   }} className={clsString}>
        {pageLoadings[index]}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
    )
  }
}



// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
//选择loading预览 请访问  https://codepen.io/favori/pen/QRQKpV