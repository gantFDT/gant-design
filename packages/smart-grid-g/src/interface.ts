import React from 'react';
import { GridPropsPartial, Columns } from '@grid';

export enum Fields {
  Input = 'Input',
  InputNumber = 'InputNumber',
  InputUrl = 'InputUrl',
  InputTelePhone = 'InputTelePhone',
  InputCellPhone = 'InputCellPhone',
  InputEmail = 'InputEmail',
  InputLanguage = 'InputLanguage',
  InputMoney = 'InputMoney',
  TextArea = 'TextArea',
  DatePicker = 'DatePicker',
  Selector = 'Selector',
  LocationSelector = 'LocationSelector',
}

export interface CustomColumnProps<R> extends Columns<R> {
  componentType?: Fields | React.ReactElement;
}

export interface ColumnConfig {
  fieldName: string;
  // checked?: boolean;
  fixed?: 'left' | 'right';
  sort?: string;
  width?: number | string;
  hidden?: boolean;
}

export interface PanelConfig {
  // clickable?: boolean;
  // footerDirection?: 'row' | 'row-reverse';
  // pageSize?: number;
  columnFields: ColumnConfig[];
}
export interface ViewConfig {
  viewId: string;
  name: string;
  version: string;
  panelConfig: PanelConfig;
}

export interface SchemaProp<R> {
  supportColumnFields: CustomColumnProps<R>[];
  systemViews: ViewConfig[];
}

export interface ViewListProps {
  systemViews: ViewConfig[];
  customViews: ViewConfig[];
}

export type GantGridProps<T> = Omit<Partial<GridPropsPartial<T>>, 'columns'>;

export interface SmartGridProps<T> extends GantGridProps<T> {
  schema: SchemaProp<T> | CustomColumnProps<T>[];
  title?: string | React.ReactElement;
  headerRight?: React.ReactElement;
  headerProps?: object;
  viewSchema?: ViewConfig;
  initView?: ViewConfig;
  onViewChange?: (viewSchema: any) => void;
  emptyDescription?: string;
  prefixCls?: string;

  customViews?: ViewConfig[];
  companyViews?: ViewConfig[];
  lastViewKey?: string;
  onCustomViewsChange?: (views: ViewConfig[]) => void;
  onCompanyViewsChange?: (views: ViewConfig[]) => void;
  userId?: string;
  companyViewAuth?: boolean;

  getCustomViews?: (gridKey: string) => Promise<ViewConfig[]>;
  getCompanyViews?: (gridKey: string) => Promise<ViewConfig[]>;
  setCustomViews?: (gridKey: string, views: ViewConfig[]) => void;
  setCompanyViews?: (gridKey: string, views: ViewConfig[]) => void;

  bindKeys?: any;
  onReload?: () => void;

  withoutAnimation?: boolean;
  showDisplayConfig?: boolean;
  hideHeader?: boolean;
  height?: number | string;
  style?: object;
}

/** 兼容旧写法 */
export type SmartTableProps<T> = SmartGridProps<T>;

export interface SmartGridType {
  <T>(props: SmartGridProps<T>): React.ReactElement;
  setFields?: (field: Object) => void;
  setProps?: (props: Object) => void;
}

export enum langEnum {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
}

export interface LocalWrapperProps<T> extends SmartGridProps<T> {
  locale?: any;
  i18n?: langEnum;
}
