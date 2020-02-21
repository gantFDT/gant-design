/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn &&
  typeof window !== 'undefined'
) {
  console.warn(
    'You are using a whole package of gantd, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}
/* @remove-on-es-build-end */
import './style/index.less'
export { default as ConfigProvider, ConfigContext, ConfigConsumer, ConfigConsumerProps } from './config-provider';
// export {default as LocaleProvider} from './locale-provider'
//其他
export { default as Intro } from './intro';
export { default as Icon } from './icon';
export { default as AutoReload } from '@packages/auto-reload-g/src';
export { default as TaskBoard } from './taskboard'
export { default as Loading } from './loading'

//列表
export { default as Table } from '@packages/table-g/src';

//容器
export { default as Header } from '@packages/header-g/src';
export { default as SubMenu } from '@packages/submenu-g/src';
export { default as Toolbar } from './toolbar'


//废弃
export { default as VisibleMenu } from './visiblemenu';
export { default as ProfileCard } from './profilecard'
export { default as Exception } from './exception';


//内部使用
export { default as Card } from './card';