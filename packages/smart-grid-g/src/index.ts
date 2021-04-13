import SmartGrid from './SmartGrid';
import { setFields } from './fieldmapper';
export { default as TableConfig } from './config/UIContent';

SmartGrid.setFields = setFields;
export default SmartGrid;
