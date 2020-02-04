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

export { default as BlockHeader } from './blockheader';

export { default as Intro } from './intro';

export { default as ColorPicker } from '@pkgs/color-picker-g/src';

export { default as SubMenu } from '@pkgs/submenu-g/src';