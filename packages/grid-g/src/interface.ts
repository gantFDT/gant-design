import {
  ColDef,
  ColumnApi as AgColumnApi,
  GetContextMenuItemsParams,
  GridApi as AgGridApi,
  GridReadyEvent,
  IServerSideGetRowsParams,
  ITooltipParams,
  RowNode,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import { AgGridReactProps } from '@ag-grid-community/react';
// import { AgGridReactProps } from '@ag-grid-community/react/lib/agGridReact';
import { PaginationProps } from 'antd/lib/pagination';
import { RuleItem } from 'async-validator';
import GridManager from './gridManager';
import { defaultProps } from './index';
export * from '@ag-grid-community/core';
export { default as GridManager } from './gridManager';
import { ICellRendererParams } from '@ag-grid-community/core';
// 大小
export type Size = 'small' | 'large' | 'default';

// 过滤器
export enum Filter {
  Number = 'agNumberColumnFilter',
  Text = 'agTextColumnFilter',
  Date = 'agDateColumnFilter',
}

// 数据修改行为
export enum DataActions {
  add = 'add',
  remove = 'remove',
  modify = 'modify',
  removeTag = 'remove_tag',
}

export enum Fixed {
  left = 'left',
  right = 'right',
}

export enum Move {
  up = 'up',
  down = 'down',
}

export type ProtoExtends<T, U> = U &
  {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
  };

export type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>;

/**删除数据时的回调方法，可以返回boolean、array或者是一个能够提供boolean、array类型返回值的promise */
export type RemoveCallBack = (selected: any[]) => Promise<boolean> | boolean;

export type OnReady = (api: GridReadyEvent, gridManager: GridManager) => void;

export type GridApi = AgGridApi;

export type ColumnApi = AgColumnApi;

export type RowSelection = {
  /**是否多选 */
  type?: 'single' | 'multiple';
  /**checkbox所在索引 */
  checkboxIndex?: number;
  onSelect?: (keys: string[], rows: any[]) => void;
  selectedKeys?: string[];
  selectedRows?: any[];
  showDefalutCheckbox?: boolean;
  defaultSelectionCol?: ColDef;
  rowMultiSelectWithClick?: boolean;
  rowDeselection?: boolean;
  onSelectedChanged?: (keys: string[], rows: any[]) => void;
};

type EditComponentProps = {
  // onChange: (value: any) => void
};
interface GantdRuleItem extends Omit<RuleItem, 'type'> {
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'any';
}
export type EditConfig<T> = {
  component: React.ComponentClass<EditComponentProps> | React.FunctionComponent<EditComponentProps>;
  /**是否开启编辑，当全局editable为true时生效 */
  editable?: ColumnEdiatble<T>;
  props?: ((record: T, rowIndex: number) => any) | any;
  changeFormatter?: (v: any, record: any) => any;
  onCellChange?: (value: any, record: T, records: T[]) => void;
  refName?: string;
  valuePropName?: string;
  rules?: GantdRuleItem | GantdRuleItem[] | any;
  signable?: ColumnSignable;
  initValueFormatter?: (params: any) => any;
};
export interface CreateConfig {
  id: string; // id对应字段名称
  path: string;
  toPath: (parentPath: string[], data?: any) => any;
  defaultParentPath?: string[] | number[];
}
export type ColumnEdiatble<T> = boolean | ((record: T, params: any) => boolean);
export type ColumnSignable = boolean | ((params: any) => boolean);
export type RowKey<T> = (data: T) => string;

// Column Api
export interface Columns<T extends {} = {}> extends ColDef {
  /**标题 */
  title?: React.ReactNode;
  /**索引的字段名 */
  fieldName: string;
  /**单元格渲染函数 */
  render?: (
    text: string,
    record: any,
    rowIndex: number,
    params: ICellRendererParams,
  ) => React.ReactNode;
  /**子节点 */
  children?: Columns<T>[];
  /**当前列宽度,如果没有，将以defaultColumnWidth显示 */
  /**是否显示选择器 */
  checkboxSelection?: boolean;
  /**当前列是否支持排序 */
  sortable?: boolean;
  /**当前列的过滤形式 */
  filter?: Filter | string;
  /**是否隐藏 */
  hide?: boolean;
  /**编辑时配置 */
  editConfig?: EditConfig<T>;
  /**固定列 */
  fixed?: Fixed | undefined;
  valueFormatter?: (params: ValueFormatterParams) => string;
  rowGroupIndex?: number;
  type?: string | string[];
  [props: string]: any;
  /** Group ID */
  groupId?: string;
  /** Open by Default */
  openByDefault?: boolean;
  /** If true, group cannot be broken up by column moving, child columns will always appear side by side, however you can rearrange child columns within the group */
  marryChildren?: boolean;
  /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used**/
  headerGroupComponent?: string;
  /** The custom header group component to be used for rendering the component header in the hosting framework (ie: React/Angular). If none specified the default ag-Grid is used**/
  headerGroupComponentFramework?: any;
  /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used**/
  headerGroupComponentParams?: any;
  tooltipRender?: (params: ITooltipParams) => string | React.ReactNode;
}

export type GantPaginationProps = Omit<
  ProtoExtends<
    PaginationProps,
    {
      beginIndex?: number;
      onChange?: (
        beginIndex: number,
        pageSize?: number,
        current?: number,
        countLimit?: number,
      ) => void;
      addonAfter?: string | React.ReactNode;
      addonBefore?: string | React.ReactNode;
      countLimit?: number;
      numberGoToMode?: boolean;
      onRefresh?: () => void;
      mode?: 'default' | 'limit';
      tooltipTotal?: () => number | number;
      align?: 'left' | 'right';
    }
  >,
  'onShowSizeChange'
>;
export interface DefaultJsonParams {
  title?: string;
  onlySelected?: boolean;
  coverData?: boolean;
}
// Grid Api
export interface Props<T extends any> {
  //列定义
  columns?: Columns<T>[];
  //selectedBox 显示列
  boxColumnIndex?: number | string[] | string;
  //数据
  dataSource?: T[];
  //实例化后的回调
  onReady?: OnReady;
  //行选择
  rowSelection?: RowSelection | true;
  //行唯一标识
  rowkey: RowKey<T> | string;
  //表格本地存储状态的唯一标识
  gridKey?: string;
  //是否编辑状态
  editable?: boolean;
  //宽度
  width?: string | number;
  //高度
  height?: string | number;
  //是否树形展示
  treeData?: boolean;
  //分页
  pagination?: GantPaginationProps;
  //是否加载状态
  loading?: boolean;
  //样式类
  className?: string;
  isServerSideGroup?: (data: any) => boolean;
  //树形数据子项名称，树形数据打平计算的 children 数据字段名
  treeDataChildrenName?: string;
  //国际化数据
  locale?: object;
  //导出JSON的配置
  defaultJsonParams?: DefaultJsonParams;
  serverGroupExpend?: (param: IServerSideGetRowsParams, cd: (row: any[]) => void) => void;
  //显示序号
  serialNumber?: boolean | ColDef;
  //数据是否已经组装为children嵌套模式
  isCompute?: boolean;
  //开启多行数据验证
  multiLineVerify?: boolean;
  //当单元格数据编辑改变失去焦点后
  onCellEditChange?: (record: any, fieldName: string, newValue: any, oldValue: any) => any;
  //当单元格数据编辑改变时
  onCellEditingChange?: (
    record: any,
    fieldName: string,
    newValue: any,
    oldValue: any,
    params: any,
  ) => any;
  //当单元格数据改变失去焦点后，并且数据已同步至grid后
  onCellChanged?: (record: any, fieldName: string, newValue: any, oldValue: any) => void;

  //开启编辑标识
  openEditSign?: boolean;
  //
  createConfig?: CreateConfig;
  //隐藏右键菜单里的导出按钮
  hideMenuItemExport?: boolean;
  //隐藏右键菜单的收缩展开按钮
  hideMenuItemExpand?: boolean;
  //隐藏的右键菜单名称
  hiddenMenuItemNames?: string[];
  //是否显示右键中的【清空过滤】按钮，默认为 false
  showMenuItemClearFilter?: boolean;
  //右键中【清空过滤】按钮的点击回调
  onMenuItemClearFilter?: () => void;
  //右键菜单显示剪切粘贴按钮
  showCut?: ((params: GetContextMenuItemsParams) => boolean) | boolean;
  //右键菜单显示粘贴子项按钮
  showCutChild?: boolean;
  //复制行的回调
  onRowsCut?: (rows: RowNode[]) => boolean;
  //粘贴行的回调
  onRowsPaste?: (rows: RowNode[], targetRow?: RowNode) => boolean;
  //粘贴完成时的回调
  onRowsPasteEnd?: (data: any) => void;
  //隐藏已选择盒子
  hideSelectedBox?: boolean;
  //已选择盒子的高度
  selectedBoxHeight?: number;
  //已选择盒子的宽度
  selectedBoxWidth?: number;
  //编辑改变回调
  editChangeCallback?: (isChanged: boolean) => void;
  //侧边栏模式
  drawerMode?: boolean;
  //侧边栏初始宽度
  defaultDrawerWidth?: number;
  //自定义侧边栏内容
  customDrawerContent?: (params: any) => any;
  //侧边栏显隐
  visibleDrawer?: boolean;
  //双击行展开树节点
  doubleClickedExpanded?: boolean;
  //关闭右键选中行
  suppressRightClickSelected?: boolean;
  //废弃,原用于过滤树形子集数据
  treeDataForcedFilter?: boolean;
  //主题
  themeClass?: string;
  //时间控件使用gantd的
  gantDateComponent?: boolean;
  //是否开启自动高度
  autoHeight?: boolean;
  //当自动高度开启时的最大高度
  maxAutoHeight?: number | string;
  //当自动高度开启时的最小高度
  minAutoHeight?: number | string;
  //分页控件直接跳转至某一页模式，可约束最大页码，废弃，以移动至pagation定义
  numberGoToMode?: boolean;
  //当Context改变时的回调，可指定重新渲染的列和行
  suppressGroupSelectParent?: boolean;
  //当Context改变时的回调，可指定重新渲染的列和行
  onContextChangeRender?: (
    context: any,
    diffKeys: string[],
  ) =>
    | {
        columns?: string[];
        nodeIds?: string[];
      }
    | null
    | false; // 可删除
  //大小
  size?: Size;
  //是否显示边框
  border?: boolean;
  //是否显示斑马线
  zebra?: boolean;
  //是否自动行高
  autoRowHeight?: boolean;
  //单元格自动识别换行符换行
  controlCellWordWrap?: boolean;
  //监听外部cloumns
  onColumnsChange?: (columns: ColDef[]) => void;
}

export type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>;

export type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>;

export type GridVariableRef = {
  hasSelectedRows?: boolean;
  hideSelectedBox?: boolean;
  selectedRows?: any[];
};
