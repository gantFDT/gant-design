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
//其他
//容器
export { default as Anchor } from '@anchor';
export { default as AutoReload } from '@auto-reload';
// 数据单元
export {
  ColorPicker, DatePicker, EditStatus, Icon, Input,
  InputCellPhone, InputEmail,
  InputLanguage,
  InputMoney,
  InputNumber, InputTelePhone,
  InputUrl, LocationSelector, Selector, SwitchStatus, withEdit
} from '@data-cell';


//grid
export { default as Grid } from '@grid';
export { default as Header } from '@header';
export { default as withKeyevent } from '@keyevent';
export { default as Modal } from '@modal';
//表单
export { default as SchemaForm } from '@schema-form';
export { default as SmartGrid } from '@smart-grid';
export { default as SmartTable } from '@smart-table';
export { default as Submenu } from '@submenu';
//列表
export { default as Table } from '@table';
//内部使用
export { default as Card } from './card';
export { default as Exception } from './exception';
export { default as Intro } from './intro';
export { default as Loading } from './loading';
export { default as ProfileCard } from './profile-card';
export { default as TaskBoard } from './task-board';
export { default as Toolbar } from './toolbar';
//废弃
export { default as VisibleMenu } from './visible-menu';







