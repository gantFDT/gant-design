import { setFields } from './formatschema';
import SmartGrid, { setProps } from './SmartGrid';
export { default as TableConfig } from './config/UIContent';


SmartGrid.setProps = setProps;
SmartGrid.setFields = setFields;
export default SmartGrid;
