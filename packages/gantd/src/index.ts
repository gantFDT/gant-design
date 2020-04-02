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
export { default as Intro } from './intro';
export { default as AutoReload } from '@auto-reload';
export { default as TaskBoard } from './task-board';
export { default as Loading } from './loading';

//数据单元
export {
  Icon,
  withEdit, EditStatus, SwitchStatus,
  Input,
  InputCellPhone,
  InputTelePhone,
  InputUrl,
  InputEmail,
  InputLanguage,
  InputMoney,
  InputNumber,
  DatePicker,
  ColorPicker,
  Selector,
  LocationSelector
} from '@data-cell';



//表单
export { default as SchemaForm } from '@schema-form';

//列表
export { default as Table } from '@table';
export { default as SmartTable } from '@smart-table';

//容器
export { default as Anchor } from '@anchor';
export { default as Header } from '@header';
export { default as Modal } from '@modal';
export { default as Submenu } from '@submenu';
export { default as Toolbar } from './toolbar'

//废弃
export { default as VisibleMenu } from './visible-menu';
export { default as ProfileCard } from './profile-card'
export { default as Exception } from './exception';
export { default as withKeyevent } from '@keyevent';

//内部使用
export { default as Card } from './card';
export { default as Gird } from '@grid';