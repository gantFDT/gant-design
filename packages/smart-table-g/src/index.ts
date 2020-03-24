import SmartTable from './SmartTable';
import { setField } from './formatschema';

export { default as TableConfig } from './config/UIContent'

SmartTable.setField = setField;
export default SmartTable;