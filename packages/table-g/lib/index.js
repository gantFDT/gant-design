"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/table/style/css");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/empty/style/css");

var _empty = _interopRequireDefault(require("antd/es/empty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/es/pagination/style/css");

var _pagination = _interopRequireDefault(require("antd/es/pagination"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _lodash = _interopRequireDefault(require("lodash"));

var _warning = _interopRequireDefault(require("util-g/lib/warning"));

var _utils = require("./_utils");

var _header = _interopRequireDefault(require("header-g"));

var _dataCell = require("data-cell-g");

var _tableRef = _interopRequireDefault(require("./tableRef"));

var _bodycell = _interopRequireDefault(require("./bodycell"));

var _bodyrow = _interopRequireDefault(require("./bodyrow"));

var _bodywrapper = _interopRequireDefault(require("./bodywrapper"));

var _headercell = _interopRequireDefault(require("./headercell"));

var _headerrow = _interopRequireDefault(require("./headerrow"));

var _context = require("./context");

var _compose = require("./compose");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var defaultKey = "key";
var defaultProps = {
  bordered: true,
  columns: [],
  dataSource: [],
  pagination: null,
  resizable: true,
  headerMarginBottom: 10,
  rowSelection: null,
  isZebra: true,
  editable: _dataCell.EditStatus.CANCEL,
  wrap: false,
  footerDirection: 'row',
  orderList: [],
  light: false,
  cellPadding: 4,
  headerProps: {},
  emptyDescription: '暂无数据',
  withIndex: -1,
  onSave: function onSave(list, diffData) {}
};
var defaultVirtualScrollConfig = {
  threshold: 20,
  rowHeight: 24,
  center: true
};

var GantTableList = function GantTableList(props, ref) {
  var pagination = props.pagination,
      rowSelection = props.rowSelection,
      rowKey = props.rowKey,
      dataSource = props.dataSource,
      isZebra = props.isZebra,
      editable = props.editable,
      originOnRow = props.onRow,
      customBorderd = props.bordered,
      scroll = props.scroll,
      wrap = props.wrap,
      footerDirection = props.footerDirection,
      flex = props.flex,
      orderList = props.orderList,
      light = props.light,
      spacing = props.spacing,
      cellPadding = props.cellPadding,
      onSave = props.onSave,
      expandedRowKeys = props.expandedRowKeys,
      onExpand = props.onExpand,
      onExpandedRowsChange = props.onExpandedRowsChange,
      headerRight = props.headerRight,
      editActions = props.editActions,
      tableWraper = props.tableWraper,
      withIndex = props.withIndex,
      virtualScrollConfig = props.virtualScroll,
      resizeCell = props.resizable,
      onScroll = props.onScroll,
      defaultExpandAllRows = props.defaultExpandAllRows;
  /* =======================warning======================= */

  if (process.env.NODE_ENV !== "production") {
    (0, _warning.default)(!("flex" in props), "GantTableList `flex` is deprecated, please do not use");
    (0, _warning.default)(!("resizeCell" in props), "GantTableList `resizeCell` is deprecated, please use `resizable` instead");
  }

  var _useState = (0, _react.useState)(function () {
    if (props.tableKey) {
      return props.tableKey;
    }

    if (props.columns && props.columns.length) {
      var str = props.columns.map(function (item) {
        return item.dataIndex + item.title;
      }).join('');
      return window.escape(str).replace(/%u/g, '');
    }

    return Math.random().toString(32).slice(2);
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      tableKey = _useState2[0];

  var computedRowKey = (0, _react.useCallback)(function (record, index) {
    if (!record) return index;
    var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey || defaultKey];
    return recordKey === undefined ? index : recordKey;
  }, [rowKey]);
  var scrollY = (0, _react.useMemo)(function () {
    return _lodash.default.get(scroll, 'y');
  }, [scroll]); // 有子节点禁用排序功能
  //#region
  // 是否是树形结构

  var isTree = (0, _react.useMemo)(function () {
    return dataSource.some(function (item) {
      return _lodash.default.get(item, 'children.length');
    });
  }, [dataSource]); // 树状结构或者编辑状态下 禁止拖拽

  var sortable = (0, _react.useMemo)(function () {
    return isTree ? false : !!props.onDragEnd;
  }, [isTree, props.onDragEnd]);

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      lock = _useState4[0],
      setLock = _useState4[1]; // 控制onSave回调


  var isEdit = (0, _react.useMemo)(function () {
    return editable === _dataCell.EditStatus.EDIT;
  }, [editable]); // level-1层数据复制dataSource，防止数据污染

  var dataList = (0, _react.useMemo)(function () {
    return _lodash.default.cloneDeep(dataSource);
  }, [dataSource]); // level-1层数据，编辑时数据

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      cacheDataList = _useState6[0],
      setCacheDataList = _useState6[1];

  (0, _react.useEffect)(function () {
    // edit状态下打开锁，其他状态不变
    if (isEdit) {
      setLock(false);
    }

    setCacheDataList(function (list) {
      if (isEdit) {
        return (0, _utils.cloneDatasource)(dataList);
      }

      return [];
    });
  }, [dataList, isEdit]); //#endregion
  // 处理表格columns，可能有嵌套头部    
  //#region

  var _useState7 = (0, _react.useState)(props.columns),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      columns = _useState8[0],
      setColumns = _useState8[1];

  (0, _react.useEffect)(function () {
    setColumns(props.columns);
  }, [props.columns]); // 展开的expandedRowKeys

  var _useState9 = (0, _react.useState)([]),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      expandRowKeys = _useState10[0],
      setexpandRowKeys = _useState10[1];

  (0, _react.useEffect)(function () {
    if (Array.isArray(expandedRowKeys)) {
      setexpandRowKeys(expandedRowKeys);
    }
  }, [expandedRowKeys]); // 是否触发虚拟滚动

  var virtualScroll = (0, _react.useMemo)(function () {
    return !!(scrollY && virtualScrollConfig);
  }, [scrollY, virtualScrollConfig]);
  var virtualScrollConfigInner = (0, _react.useMemo)(function () {
    return virtualScroll ? virtualScrollConfig === true ? defaultVirtualScrollConfig : Object.assign(Object.assign({}, defaultVirtualScrollConfig), virtualScrollConfig) : {};
  }, [virtualScroll, virtualScrollConfig]); // 虚拟滚动的条数

  var thresholdInner = (0, _react.useMemo)(function () {
    return _lodash.default.get(virtualScrollConfigInner, 'threshold', defaultVirtualScrollConfig.threshold);
  }, [virtualScrollConfigInner]);
  /**
   * level-2层数据
   * 根据是否编辑获取数据列表
   * 同时添加g-index序号，获取所有可展开rowKey
   * 编辑状态下会有__origin属性
   */

  var _useMemo = (0, _react.useMemo)(function () {
    var list = isEdit ? cacheDataList : dataList;
    return (0, _utils.computeIndexAndRowKey)(list, computedRowKey);
  }, [isEdit, cacheDataList, dataList, computedRowKey]),
      _useMemo2 = (0, _slicedToArray2.default)(_useMemo, 2),
      dataListWithIndex = _useMemo2[0],
      expandableRowKeys = _useMemo2[1];

  (0, _react.useEffect)(function () {
    // 默认打开所有子菜单
    if (defaultExpandAllRows && _lodash.default.isUndefined(expandedRowKeys)) {
      setexpandRowKeys(expandableRowKeys);
    }
  }, []);
  /**
   * 虚拟滚动的相关数据
   */

  var _useState11 = (0, _react.useState)(0),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      outlineNum = _useState12[0],
      setOutLineNum = _useState12[1];
  /**
   * level-2层数据
   * 总数据、实际要渲染的rowkeys，用这个数据计算实际高度
   * 通过复制dataListWithIndex数据计算，因为在虚拟滚动下要刨除掉children，但是不能影响源数据
   */


  var _useMemo3 = (0, _react.useMemo)(function () {
    if (dataListWithIndex.length === 0) return [[], [], []];
    return (0, _utils.computeIndex)(dataListWithIndex, expandRowKeys, virtualScroll);
  }, [dataListWithIndex, expandRowKeys]),
      _useMemo4 = (0, _slicedToArray2.default)(_useMemo3, 3),
      renderListAll = _useMemo4[0],
      renderRowKeys = _useMemo4[1],
      tilingListAll = _useMemo4[2]; // 单元格padding和border高度


  var padddingBorder = (0, _react.useMemo)(function () {
    return 2 * parseInt(cellPadding) + 1;
  }, [cellPadding]); // dom高度

  var originRowHeight = (0, _react.useMemo)(function () {
    var height = parseInt(virtualScrollConfigInner.rowHeight);

    if (rowSelection) {
      height = Math.max(height, 20 + padddingBorder);
    }

    if (isTree) {
      return Math.max(height, 18 + padddingBorder);
    }

    return height || 0;
  }, [virtualScrollConfigInner, isTree, padddingBorder, rowSelection]); // 行高
  // 对单元格中的选择框和树状结构的展开按钮有影响

  var originLineHeight = (0, _react.useMemo)(function () {
    if (virtualScroll && virtualScrollConfigInner.center) {
      return originRowHeight - padddingBorder + 'px';
    }
  }, [virtualScrollConfigInner, padddingBorder, virtualScroll]); // 计算滚动比例

  var rate = 1; // const rate = useMemo(() => Math.ceil(Math.chain(renderRowKeys.length).multiply(originRowHeight).divide(3e+7).done()), [renderRowKeys, originRowHeight])
  // 逻辑上的行高，包括border

  var rowHeight = (0, _react.useMemo)(function () {
    return originRowHeight / rate + 1;
  }, [originRowHeight, rate]);
  var mainHeight = (0, _react.useMemo)(function () {
    return renderRowKeys.length * rowHeight;
  }, [renderRowKeys, rowHeight]); // 最终渲染的数据

  var renderList = (0, _react.useMemo)(function () {
    var list = renderListAll;

    if (virtualScroll) {
      list = (0, _utils.getVirtualList)(outlineNum, thresholdInner, renderRowKeys, tilingListAll);
    }

    return list;
  }, [virtualScroll, outlineNum, renderRowKeys, tilingListAll]); //#endredion

  var minHeight = (0, _react.useMemo)(function () {
    return renderList.length > 0 ? scrollY : undefined;
  }, [scrollY, renderList]);
  var storageWidth = (0, _react.useMemo)(function () {
    return (0, _utils.getStorageWidth)(tableKey)['table'] || _lodash.default.get(scroll, 'x') || '100%';
  }, [tableKey]);
  var headerFixed = (0, _react.useMemo)(function () {
    return !_lodash.default.isUndefined(scrollY);
  }, [scrollY]);
  var bordered = (0, _react.useMemo)(function () {
    return light ? false : customBorderd;
  }, [light, customBorderd]); // 当展开项发生变化的时候主动触发table的更新，去重新计算滚动条

  var _useState13 = (0, _react.useState)(0),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      emitReCompute = _useState14[0],
      setEmitReCompute = _useState14[1]; // 业务层修改editable状态的时候，计算修改前后数据的


  (0, _react.useEffect)(function () {
    if (editable === _dataCell.EditStatus.SAVE && !lock) {
      // 保存之后，锁上保证下次更新不会再次进入
      setLock(true);
      console.time('计算diff');
      var diffData = (0, _utils.diffList)(dataList, cacheDataList, isTree);
      console.timeEnd('计算diff');
      onSave(_lodash.default.cloneDeep(cacheDataList), diffData);
    }
  }, [editable, dataList, cacheDataList, isTree, lock]); //行选择
  //#region

  var _useRowSelection = (0, _utils.useRowSelection)(rowSelection, dataListWithIndex, bordered),
      _useRowSelection2 = (0, _slicedToArray2.default)(_useRowSelection, 3),
      computedRowSelection = _useRowSelection2[0],
      setselectedRowKeys = _useRowSelection2[1],
      footerselection = _useRowSelection2[2];

  var computedPagination = (0, _utils.usePagination)(pagination, computedRowSelection, dataSource.length);
  var footerCallback = (0, _react.useCallback)(function (currentPageData) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, currentPageData.length ? footerselection : null, /*#__PURE__*/_react.default.createElement("div", {
      className: 'gant-table-footer-inner',
      style: {
        flexDirection: footerDirection
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: 'gant-table-footer-tail',
      style: {
        flexDirection: footerDirection
      }
    }, typeof props.tail === 'function' && props.tail(currentPageData)), computedPagination && /*#__PURE__*/_react.default.createElement(_pagination.default, Object.assign({
      size: 'small'
    }, computedPagination))));
  }, [props.tail, computedPagination, footerselection, footerDirection]);
  var footer = (0, _react.useMemo)(function () {
    if (!(dataSource.length && footerselection) && !props.tail && !computedPagination) return null;
    return footerCallback;
  }, [props.tail, dataSource, computedPagination, footerselection]); //#endregion
  // 滚动加载
  //#region

  var onscroll = (0, _react.useCallback)(_lodash.default.debounce(function (e) {
    // 编辑状态下不触发whell事件
    if (!onScroll || isEdit) return;

    if (e.type === 'wheel') {
      // 向下滚动，视图上移
      if (e.deltaY > 0) {
        onScroll();
      } // 向上滚动，视图下移
      else {}
    } else {
      var bodyTable = e.target;

      if (bodyTable.scrollTop > bodyTable.scrollTopBackUp) {
        // 向下滚动
        var scrollAvailable = bodyTable.scrollHeight - bodyTable.clientHeight;
        var lef = scrollAvailable - bodyTable.scrollTop;

        if (lef <= bodyTable.scrollHeight * 0.01) {
          // 滚动到临界点
          if (!bodyTable.scrollloaded) {
            bodyTable.scrollloaded = true;
            onScroll();
            bodyTable.scrollloaded = false;
          }
        } else {
          // scrollloaded控制在一定距离内不会重复调用
          bodyTable.scrollloaded = false;
        }
      }

      bodyTable.scrollTopBackUp = bodyTable.scrollTop;
    }

    e.preventDefault();
  }, 50), [onScroll, isEdit]);

  var _useState15 = (0, _react.useState)(new Map()),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 1),
      tableGroup = _useState16[0];
  /**
   * 计算虚拟滚动误差
   * 平均每滚动多少条要修正误差
   */


  var scrollError = (0, _react.useMemo)(function () {
    if (scrollY) {
      // 最后一屏之前渲染的条数
      var leave = renderRowKeys.length - thresholdInner; // 最大滚动高度

      var maxScroll = mainHeight - parseInt(scrollY); // 最多滚动多少条

      var maxScrollLength = Math.floor(maxScroll / rowHeight); // 偏差条数

      var error = leave - maxScrollLength;

      if (error > 0) {
        return Math.floor(maxScrollLength / error);
      }
    }

    return 0;
  }, [mainHeight, scrollY, renderRowKeys, thresholdInner, rowHeight]);
  /**
   * 虚拟滚动
   */

  var onVScroll = (0, _react.useCallback)(function (e) {
    var scrollTop = e.currentTarget.scrollTop;
    var outTopLinevir = Math.floor(scrollTop / rowHeight); // 用于计算table的位置
    // 校正移动的条数，修正设置的值，防止在rate不为1的情况下，出现数据遗漏的问题

    var outTopLine = outTopLinevir + (scrollError > 0 ? Math.floor(outTopLinevir / scrollError) : 0); // 设置数据

    setOutLineNum(outTopLine); // 实际渲染的高度
    // td有个border-bottom，要加1

    var domHeight = thresholdInner * rowHeight * rate;
    var outTopHeight = outTopLinevir * rowHeight;
    var top = Math.max(0, Math.min(mainHeight - domHeight, outTopHeight));
    tableGroup.forEach(function (table) {
      return (0, _utils.setStyle)(table, "transform: translate(0, ".concat(top, "px)"));
    }); // const table = tableGroup.get('bodyTable')
    // setStyle(table, `transform: translate(0, ${top}px)`)
    // e.preventDefault()
  }, [thresholdInner, rowHeight, renderRowKeys, rate, mainHeight, tableGroup, scrollError]); // 绑定滚动事件

  var bindScroll = (0, _react.useCallback)(function () {
    // if (tableWraper && _.isEmpty(computedPagination)) {
    if (tableWraper) {
      var bodyTable = tableWraper.querySelector('.ant-table-body');
      bodyTable.scrollTopBackUp = bodyTable.scrollTop || 0;
      bodyTable.addEventListener('wheel', onscroll, false);
      bodyTable.addEventListener('scroll', onscroll, false);

      if (virtualScroll) {
        bodyTable.addEventListener('wheel', onVScroll, false);
        bodyTable.addEventListener('scroll', onVScroll, false);
      }
    }
  }, [tableWraper, onscroll, computedPagination, virtualScroll, onVScroll]); // 移除滚动事件

  var removeScroll = (0, _react.useCallback)(function () {
    if (tableWraper) {
      var bodyTable = tableWraper.querySelector('.ant-table-body');
      bodyTable.removeEventListener('wheel', onscroll, false);
      bodyTable.removeEventListener('scroll', onscroll, false);

      if (virtualScroll) {
        bodyTable.removeEventListener('wheel', onVScroll, false);
        bodyTable.removeEventListener('scroll', onVScroll, false);
      }
    }
  }, [tableWraper, onscroll, virtualScroll, onVScroll]);
  (0, _react.useEffect)(function () {
    bindScroll();
    return function () {
      removeScroll();
    };
  }, [tableWraper, bindScroll, removeScroll]); // table header

  var onHeaderCell = (0, _react.useCallback)(function (col, _ref) {
    var hasFixed = _ref.hasFixed,
        hasChildren = _ref.hasChildren,
        index = _ref.index,
        originOnHeaderCell = _ref.originOnHeaderCell;
    var key = col.key,
        dataIndex = col.dataIndex,
        fixed = col.fixed,
        align = col.align,
        children = col.children; // 明亮模式下或者是固定列以及有嵌套表头不允许resize

    var resizable = !(light || fixed || hasChildren);
    var headerCellProps = {
      style: {
        width: col.width,
        maxWidth: col.width
      } // 防止折行模式下，被内容撑出

    };
    var ordered = orderList.find(function (order) {
      return dataIndex === order.fieldName;
    });

    if (ordered) {
      headerCellProps.orderType = ordered.orderType;
    }

    if (resizeCell) headerCellProps = Object.assign(Object.assign({}, headerCellProps), {
      key: key,
      flex: flex,
      fixed: fixed,
      hasFixed: hasFixed,
      tableKey: tableKey,
      dataIndex: dataIndex,
      headerFixed: headerFixed,
      // 当前列是否可以被缩放，弹性缩放下，最后一列不允许缩放
      resizable: flex ? resizable && index !== length - 1 : resizable
    });
    if (typeof originOnHeaderCell === 'function') return Object.assign(Object.assign({}, headerCellProps), originOnHeaderCell(col));
    return headerCellProps;
  }, [light, cellPadding, tableKey, orderList, resizeCell, flex, headerFixed]);
  var onCell = (0, _react.useCallback)(function (col, record, rowIndex, _ref2) {
    var hasFixed = _ref2.hasFixed,
        originOnCell = _ref2.originOnCell;
    var dataIndex = col.dataIndex,
        editConfig = col.editConfig,
        fixed = col.fixed;
    var cellEditable = _lodash.default.isPlainObject(editConfig) && !_lodash.default.isEmpty(editConfig); // 修正rowIndex值

    var computedRowIndex = rowIndex + outlineNum; // 虚拟滚动或者带有固定列的表格不换行
    // 根据是否有固定列，以及是否是虚拟滚动来控制文本是否折行

    var cWrap = virtualScroll || hasFixed ? false : wrap;
    var style = {
      width: col.width
    };

    if (!cWrap) {
      // 防止折行模式下，被内容撑出
      // 如果有maxWidth，会有出现缩小单元格时内容在单元格外的异常
      style.maxWidth = col.width;
    }

    var defaultCellProps = {
      style: style,
      wrap: cWrap,
      light: light,
      record: Object.assign({}, record),
      sortable: sortable,
      rowIndex: computedRowIndex,
      dataIndex: dataIndex,
      cellPadding: cellPadding,
      editConfig: {}
    };
    if (cellEditable) defaultCellProps.editConfig = editConfig;

    if (originOnCell) {
      return Object.assign(Object.assign({}, defaultCellProps), originOnCell(record, computedRowIndex));
    }

    return defaultCellProps;
  }, [wrap, light, sortable, tableKey, cellPadding, headerFixed, virtualScroll, outlineNum]);
  /**
   * columns API
   * @param editConfig object 编辑对象
   *        showDirt boolean 是否显示脏标记
   *        render function 编辑时的渲染函数
   *        editValue string|function 编辑组件的值
   */

  var convertColumns = (0, _react.useCallback)(function (cols) {
    var nest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var hasFixed = cols.some(function (col) {
      return col.fixed;
    });
    var computedCols = cols.map(function (_a, index) {
      var width = _a.width,
          originOnHeaderCell = _a.onHeaderCell,
          originOnCell = _a.onCell,
          originRender = _a.render,
          col = __rest(_a, ["width", "onHeaderCell", "onCell", "render"]); // 添加自定义render


      col.render = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _utils.renderColumnItem.apply(void 0, [Object.assign(Object.assign({}, col), {
          render: originRender
        })].concat(args));
      };

      var hasChildren = _lodash.default.get(col, 'children.length');

      if (hasChildren) {
        // 嵌套表头不允许resize
        col.children = convertColumns(col.children, true);
      }

      col.width = (0, _utils.getStorageWidth)(tableKey)[col.dataIndex] || width;

      col.onHeaderCell = function (col) {
        return onHeaderCell(col, {
          hasFixed: hasFixed,
          hasChildren: hasChildren,
          index: index,
          originOnHeaderCell: originOnHeaderCell
        });
      };

      col.onCell = function (record, rowIndex) {
        return onCell(col, record, rowIndex + outlineNum, {
          hasFixed: hasFixed,
          originOnCell: originOnCell
        });
      };

      return col;
    });

    if (withIndex >= 0 && !nest) {
      var index = {
        dataIndex: 'g-index',
        title: '序号',
        width: 40
      };
      return [].concat((0, _toConsumableArray2.default)(computedCols.slice(0, withIndex)), [index], (0, _toConsumableArray2.default)(computedCols.slice(withIndex)));
    }

    return computedCols;
  }, [onHeaderCell, onCell, tableKey, withIndex, outlineNum]); //#endregion
  // 处理表格行删除线

  var onRow = (0, _react.useCallback)(function (record, index) {
    var pureRecord = (0, _utils.getPureRecord)(record);
    var rowIndex = index + outlineNum;
    var defaultRowProps = {
      isDeleted: record.isDeleted,
      rowIndex: rowIndex,
      sortable: sortable
    };

    if (isEdit) {
      defaultRowProps.originRecord = record[_utils.originKey];
    }

    var originListener = {};

    if (originOnRow) {
      originListener = originOnRow(pureRecord, rowIndex);
    }

    if (_lodash.default.get(rowSelection, 'clickable')) {
      var getCheckBoxProps = _lodash.default.get(rowSelection, 'getCheckboxProps');

      var checkable = true;

      if (getCheckBoxProps && typeof getCheckBoxProps === 'function') {
        var boxProps = getCheckBoxProps(pureRecord);
        checkable = !_lodash.default.get(boxProps, 'disable');
      }

      if (checkable) {
        defaultRowProps.onClick = function (e) {
          setselectedRowKeys(record);

          if (typeof originListener.onClick === 'function') {
            originListener.onClick(e);
          }
        };
      }
    }

    if (originOnRow) {
      return Object.assign(Object.assign({}, originListener), defaultRowProps);
    }

    return defaultRowProps;
  }, [sortable, setselectedRowKeys, rowSelection, outlineNum]); // 表格中所有使用的组件
  // 控制什么时候显示可编辑组件
  //#region

  var onDragEnd = (0, _react.useCallback)(function (result) {
    if (!result.destination) return; // 要减掉第一行，所以需要要减1

    var sourceIndex = result.source.index;
    var destinationIndex = result.destination.index;
    var list = (0, _utils.switchIndex)(dataSource, sourceIndex, destinationIndex);
    sortable && props.onDragEnd(list);
  }, [dataSource, sortable]);
  var components = (0, _react.useMemo)(function () {
    return {
      table: _tableRef.default,
      header: {
        // wrapper: HeaderWrapper,
        row: _headerrow.default,
        cell: _headercell.default
      },
      body: {
        wrapper: sortable ? _bodywrapper.default : 'tbody',
        row: _bodyrow.default,
        cell: _bodycell.default
      }
    };
  }, [resizeCell, _bodywrapper.default, sortable, _headercell.default]); //#endregion

  var tableColumns = (0, _react.useMemo)(function () {
    return convertColumns(columns);
  }, [columns, convertColumns, orderList]); // dataIndex的索引

  var computedColIndex = (0, _react.useMemo)(function () {
    return (0, _utils.getComputedColIndex)(tableColumns);
  }, [tableColumns]);
  var expandIconColumnIndex = (0, _react.useMemo)(function () {
    var index = 0;
    index = Math.max(tableColumns.findIndex(function (item) {
      return item.expandColumn;
    }), 0);
    return computedRowSelection ? index + 1 : index;
  }, [tableColumns, computedRowSelection]); // 缺省显示

  var emptyText = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "gant-align-center",
      style: {
        height: scrollY
      }
    }, /*#__PURE__*/_react.default.createElement(_empty.default, {
      image: _empty.default.PRESENTED_IMAGE_SIMPLE,
      description: props.emptyDescription
    }));
  }, [scrollY, props.emptyDescription]); // 展开变化,触发重新计算滚动相关数据

  var expandedRowsChange = (0, _react.useCallback)(function (expandedRowKeys) {
    setEmitReCompute(function (e) {
      return e + 1;
    });
  }, []);
  var expand = (0, _react.useCallback)(function (expanded, record) {
    var rowkey = expandRowKeys;
    var key = record["g-row-key"];

    if (expanded) {
      rowkey = [].concat((0, _toConsumableArray2.default)(expandRowKeys), [key]);
    } else {
      // row was collapse
      var expandedRowIndex = expandRowKeys.indexOf(key);
      if (expandedRowIndex !== -1) rowkey = [].concat((0, _toConsumableArray2.default)(expandRowKeys.slice(0, expandedRowIndex)), (0, _toConsumableArray2.default)(expandRowKeys.slice(expandedRowIndex + 1)));
    }

    setexpandRowKeys(rowkey);

    if (onExpandedRowsChange) {
      onExpandedRowsChange(rowkey);
    }

    if (onExpand) {
      var pureRecord = (0, _utils.getPureRecord)(record);
      onExpand(expanded, pureRecord);
    }
  }, [onExpandedRowsChange, onExpand, expandRowKeys]); // 劫持headerRight 

  var headerRightElement = (0, _react.useMemo)(function () {
    var actions = null;

    if (isEdit && typeof editActions === 'function') {
      var keys = computedRowSelection ? computedRowSelection.selectedRowKeys || [] : [];
      actions = editActions([cacheDataList, setCacheDataList], keys);
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, actions, headerRight);
  }, [isEdit, editActions, cacheDataList, headerRight, computedRowSelection]);
  var onResize = (0, _react.useCallback)(function () {
    setEmitReCompute(function (e) {
      return e + 1;
    });
  }, []);
  var dataContextValue = (0, _react.useMemo)(function () {
    return {
      isTree: isTree,
      cellPadding: cellPadding,
      dataSource: cacheDataList,
      setDataSource: setCacheDataList,
      computedRowKey: computedRowKey,
      editable: editable,
      computedColIndex: computedColIndex,
      computedRowSelection: computedRowSelection,
      originRowHeight: originRowHeight,
      originLineHeight: originLineHeight
    };
  }, [isTree, cellPadding, cacheDataList, editable, computedColIndex, computedRowSelection, originRowHeight, originLineHeight]);
  var tableContextValue = (0, _react.useMemo)(function () {
    return {
      light: light,
      spacing: spacing,
      dataSource: dataSource,
      emitReCompute: emitReCompute,
      headerFixed: headerFixed,
      tableColumns: tableColumns,
      onResize: onResize,
      virtualScroll: virtualScroll,
      mainHeight: mainHeight,
      tableGroup: tableGroup,
      outlineNum: outlineNum,
      thresholdInner: thresholdInner,
      renderRowKeys: renderRowKeys,
      storageWidth: storageWidth,
      scrollY: scrollY
    };
  }, [light, spacing, dataSource, emitReCompute, tableColumns, headerFixed, onResize, virtualScroll, mainHeight, tableGroup, outlineNum, thresholdInner, renderRowKeys, storageWidth, scrollY]);
  var bodyWrapperContext = (0, _react.useMemo)(function () {
    return {
      onDragEnd: onDragEnd
    };
  }, [onDragEnd]);
  var style = (0, _react.useMemo)(function () {
    var s = Object.assign({}, props.style || {});
    s['--padding'] = (0, _utils.getStyleText)(cellPadding);
    s['--lineHeight'] = (0, _utils.getStyleText)(originLineHeight);
    return s;
  }, [props.style, cellPadding, originLineHeight]);

  var getPrefixCls = function getPrefixCls(cls) {
    return 'gant-' + cls;
  };

  var renderTable = function renderTable() {
    var _classnames;

    var pagination = props.pagination,
        _props$title = props.title,
        title = _props$title === void 0 ? '' : _props$title,
        className = props.className,
        headerLeft = props.headerLeft,
        headerMarginBottom = props.headerMarginBottom,
        bodyStyle = props.bodyStyle,
        _props$scroll = props.scroll,
        scroll = _props$scroll === void 0 ? {} : _props$scroll,
        headerProps = props.headerProps,
        _props$locale = props.locale,
        locale = _props$locale === void 0 ? {} : _props$locale,
        tableProps = __rest(props, ["pagination", "title", "className", "headerLeft", "headerMarginBottom", "bodyStyle", "scroll", "headerProps", "locale"]);

    var tablePrefixCls = getPrefixCls('table');
    var reizetablePrefixCls = getPrefixCls('table-resizable');
    var sortablePrefixCls = getPrefixCls('table-sortable');
    var zebraPrefixCls = getPrefixCls('table-zebra');
    var lightPrefixCls = getPrefixCls('table-light');
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (title || headerRightElement || headerLeft) && /*#__PURE__*/_react.default.createElement(_header.default, Object.assign({
      title: title
    }, headerProps, {
      beforeExtra: headerLeft,
      extra: headerRightElement
    })), /*#__PURE__*/_react.default.createElement(_context.DataContext.Provider, {
      value: dataContextValue
    }, /*#__PURE__*/_react.default.createElement(_context.TableContext.Provider, {
      value: tableContextValue
    }, /*#__PURE__*/_react.default.createElement(_context.TableBodyWrapperContext.Provider, {
      value: bodyWrapperContext
    }, /*#__PURE__*/_react.default.createElement(_table.default, Object.assign({
      size: 'small',
      scroll: Object.assign(Object.assign({}, scroll), {
        x: storageWidth
      }),
      locale: Object.assign({
        emptyText: emptyText
      }, locale)
    }, tableProps, {
      expandedRowKeys: expandRowKeys,
      onExpandedRowsChange: expandedRowsChange,
      onExpand: expand,
      bordered: bordered,
      dataSource: renderList,
      onRow: onRow,
      // rowKey={computedRowKey}
      rowKey: 'g-row-key',
      components: Object.assign(Object.assign({}, components), tableProps.components),
      pagination: false,
      footer: footer,
      bodyStyle: Object.assign({
        minHeight: minHeight
      }, bodyStyle),
      className: (0, _classnames2.default)(className, tablePrefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, reizetablePrefixCls, resizeCell), (0, _defineProperty2.default)(_classnames, zebraPrefixCls, !light && isZebra), (0, _defineProperty2.default)(_classnames, sortablePrefixCls, sortable), (0, _defineProperty2.default)(_classnames, lightPrefixCls, light), _classnames)),
      columns: tableColumns,
      rowSelection: computedRowSelection,
      expandIconColumnIndex: expandIconColumnIndex,
      style: style
    }))))));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  }, renderTable());
};

var GTable = (0, _recompose.compose)(_compose.tableWrapperRef, _compose.scrollIntoViewWithRowKey, _form.default.create(), _react.default.forwardRef)(GantTableList);
GTable.propTypes = {
  columns: _propTypes.default.array.isRequired,
  resizable: _propTypes.default.bool,
  headerLeft: _propTypes.default.element,
  headerRight: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  headerMarginBottom: _propTypes.default.number,
  isZebra: _propTypes.default.bool,
  tableKey: _propTypes.default.string,
  editable: _propTypes.default.oneOf([_dataCell.EditStatus.EDIT, _dataCell.EditStatus.CANCEL, _dataCell.EditStatus.SAVE]),
  editActions: _propTypes.default.func,
  // 行拖拽
  onDragEnd: _propTypes.default.func,
  // 编辑表格保存
  onSave: _propTypes.default.func,
  wrap: _propTypes.default.bool,
  tail: _propTypes.default.func,
  // 无限滚动`
  onScroll: _propTypes.default.func,
  light: _propTypes.default.bool,
  spacing: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  headerProps: _propTypes.default.object,
  withIndex: _propTypes.default.number
};
GTable.defaultProps = defaultProps;

var GantTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(GantTable, _React$Component);

  var _super = _createSuper(GantTable);

  function GantTable() {
    (0, _classCallCheck2.default)(this, GantTable);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(GantTable, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(GTable, Object.assign({}, this.props));
    }
  }]);
  return GantTable;
}(_react.default.Component);

exports.default = GantTable;