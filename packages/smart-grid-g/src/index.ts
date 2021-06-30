import SmartGrid, { setProps } from './SmartGrid';
import { setFields } from './formatschema';
export { default as TableConfig } from './config/UIContent';

SmartGrid.setProps = setProps;
SmartGrid.setFields = setFields;
export default SmartGrid;
