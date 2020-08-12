import SmartTable from './SmartTable';
import { setFields } from './formatschema';
export { default as TableConfig } from './config/UIContent'
SmartTable.setFields = setFields;
export default SmartTable;