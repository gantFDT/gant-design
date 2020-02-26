import { create } from '@storybook/theming';
import gantDLogo from '../assests/images/logo.png'
export const light =  create({
  base: 'light',

  colorPrimary: '#24247A',
  colorSecondary: '#18184E',

  // // UI
  appBg: '#fff',//整体背景
  appContentBg: '#fafafa',//组件容器背景
  // appBorderColor: 'grey',//整体边框
  appBorderRadius: 0,//整体圆角

  // // Typography
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // // Text colors
  // textColor: 'white',//字体颜色
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // // Toolbar default and active colors
  // barTextColor: '#ffffff',//顶部字体颜色
  // barSelectedColor: '#696969',//顶部字体选中颜色
  // barBg: '#202020',//顶部背景颜色

  // // Form colors
  // inputBg: '#202020',//表单背景
  // inputBorder: 'rgba(0,0,0,0.2)',//表单边框
  // inputTextColor: '#ffffff',//表单字体颜色
  // inputBorderRadius: 4,//表单边框

  brandTitle: '甘棠软件',
  brandUrl: 'http://favori.gitee.io/gantd-landing/',
  brandImage: gantDLogo,
});

export const dark =  create({
  base: 'dark',

  // colorPrimary: '#457D37',
  // colorSecondary: '#457D37',

  // // UI
  // appBg: '#333',//整体背景
  // appContentBg: '#999',//组件容器背景
  // appBorderColor: 'grey',//整体边框
  appBorderRadius: 5,//整体圆角

  // // Typography
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // // Text colors
  // textColor: 'white',//字体颜色
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // // Toolbar default and active colors
  // barTextColor: '#ffffff',//顶部字体颜色
  // barSelectedColor: '#696969',//顶部字体选中颜色
  // barBg: '#202020',//顶部背景颜色

  // // Form colors
  // inputBg: '#202020',//表单背景
  // inputBorder: 'rgba(0,0,0,0.2)',//表单边框
  // inputTextColor: '#ffffff',//表单字体颜色
  // inputBorderRadius: 4,//表单边框

  brandTitle: '甘棠软件',
  brandUrl: 'http://favori.gitee.io/gantd-landing/',
  brandImage: gantDLogo,
});