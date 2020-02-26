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
//其他
export { default as Intro } from './intro';
export { default as AutoReload } from '@auto-reload';
export { default as TaskBoard } from './taskboard'
export { default as Loading } from './loading';

//数据单元
export {
  Icon,
  withEdit, EditStatus, SwitchStatus, // 读写分离
  Input, TextArea, Search, Group, Password, // Input
  Select,
  InputCellPhone,
  InputTelePhone,
  InputUrl,
  InputEmail,
  InputLanguage,
  InputMoney,
  InputNumber,
  DatePicker, RangePicker, //Picker
  ColorPicker,
  Selector, //selector
  LocationSelector,
  IconSelector
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
export { default as SubMenu } from '@submenu';
export { default as Toolbar } from './toolbar'

//废弃
export { default as VisibleMenu } from './visiblemenu';
export { default as ProfileCard } from './profilecard'
export { default as Exception } from './exception';

//内部使用
export { default as Card } from './card';