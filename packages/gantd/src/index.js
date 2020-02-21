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

//读写分离
export { default as withEdit } from './compose/withEdit'
export { default as EditStatus } from './compose/editstatus'
export { default as SwitchStatus } from './compose/switchstatus'
//数据单元
  // input
export { default as Input, TextArea, Search, Group, Password } from './input'
export { default as InputCellPhone } from './inputcellphone'
export { default as InputTelePhone } from './inputtelephone';
export { default as InputUrl } from './inputurl';
export { default as InputEmail } from './inputemail'
export { default as InputLanguage } from './inputlanguage';
export { default as InputMoney } from './inputmoney';
export { default as InputNumber } from './inputnumber'
  //picker
export { default as DatePicker, RangePicker } from './datepicker'
export { default as ColorPicker } from '@packages/color-picker-g/src';
  //selector
export { default as Selector } from './selector';
export { default as LocationSelector } from './locationselector';
export { default as IconSelector } from './iconselector';


//容器
export { default as Header } from '@packages/header-g/src';
export { default as SubMenu } from '@packages/submenu-g/src';
export { default as withAnchor } from './compose/anchor'
export { default as Toolbar } from './toolbar'


//废弃
export { default as OverflowTool } from '@packages/overflow-tool-g/src';
export { default as VisibleMenu } from './visiblemenu';
export { default as ProfileCard } from './profilecard'
export { default as Exception } from './exception';


//内部使用
export { default as Card } from './card';