import React from 'react';
import { GantTableListOuterProps } from '@table'

export interface CustomColumnProps<R> {
  fieldName: string,
  title: string,
  props?: any,
  type?: string,
  fixed?: 'left' | 'right',
  width?: number | string,
  align?: 'left' | 'center' | 'right',
  componentType?: string,
  render?: (text: any, record: R, index: number) => React.ReactNode;
  children?: CustomColumnProps<R>[]
}

export interface ColumnConfig {
  fieldName: string,
  checked?: boolean,
  lock?: boolean,
  fixed?: 'left' | 'right',
  width?: number | string,
  align?: 'left' | 'center' | 'right',
  hidden?: boolean
}

export interface PanelConfig {
  wrap?: boolean,
  isZebra?: boolean,
  bordered?: boolean,
  clickable?: boolean,
  footerDirection?: 'row' | 'row-reverse',
  heightMode?: 'full' | 'auto',
  pageSize?: number,
  columnFields: ColumnConfig[],
}
export interface ViewConfig {
  viewId: string,
  name: string,
  version: string,
  panelConfig: PanelConfig
}

export interface SchemaProp<R> {
  supportColumnFields: CustomColumnProps<R>[],
  systemViews: ViewConfig[]
}

export interface ViewListProps {
  systemViews: ViewConfig[],
  customViews: ViewConfig[],
}

export type GantTableProps<T> = Omit<Partial<GantTableListOuterProps<T>>, 'columns'>

export interface SmartTableProps<T> extends GantTableProps<T> {
  searchTableCellResizable?: boolean,
  schema: SchemaProp<T> | CustomColumnProps<T>[],
  viewSchema?: any,
  onViewChange?: (viewSchema: any) => void,
  locale?: any,

  bindKeys?: any,
  onReload?: () => void,
  bodyMinHeight?: number | string,
  bodyHeight?: number | string,
  bodyWidth?: number | string,

  pageIndex?: number,
  pageSize?: number,
  pageSizeOptions?: string[],
  isGantPageMode?: boolean,
  onPageChange?: (pageIndex: number, pageSize?: number) => void,
  totalCount?: number,
  hasExport?: boolean,
}