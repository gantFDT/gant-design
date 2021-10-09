import { setFields } from './formatschema';
import SmartTable from './SmartTable';

export { default as TableConfig } from './config/UIContent';

SmartTable.setFields = setFields;
export default SmartTable;