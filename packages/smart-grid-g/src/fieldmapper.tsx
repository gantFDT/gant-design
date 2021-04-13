import {
  Input,
  InputNumber,
  DatePicker,
  Selector,
  InputUrl,
  LocationSelector,
  InputTelePhone,
  InputCellPhone,
  InputEmail,
  InputLanguage,
  InputMoney,
} from '@data-cell';
import { Fields } from './interface';

export const ComponentsMap = {
  [Fields.Input]: Input,
  [Fields.InputNumber]: InputNumber,
  [Fields.InputUrl]: InputUrl,
  [Fields.InputTelePhone]: InputTelePhone,
  [Fields.InputCellPhone]: InputCellPhone,
  [Fields.InputEmail]: InputEmail,
  [Fields.InputLanguage]: InputLanguage,
  [Fields.InputMoney]: InputMoney,
  [Fields.TextArea]: Input.TextArea,
  [Fields.DatePicker]: DatePicker,
  [Fields.Selector]: Selector,
  [Fields.LocationSelector]: LocationSelector
}

export const setFields = (cmpMap) => {
  Object.assign(ComponentsMap, cmpMap)
}