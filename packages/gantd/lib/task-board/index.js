"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TaskBoardContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactBeautifulDnd = require("react-beautiful-dnd");
var _configProvider = require("../config-provider");
var _Column = _interopRequireDefault(require("./Column"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var TaskBoardContext = exports.TaskBoardContext = _react.default.createContext({});
var ColumnsList = _react.default.memo(function (props) {
  return _react.default.createElement(_Column.default, Object.assign({}, props));
});
var TaskBoard = function TaskBoard(props) {
  var customizePrefixCls = props.prefixCls,
    dataSource = props.dataSource,
    className = props.className,
    idKey = props.idKey,
    titleKey = props.titleKey,
    childrenKey = props.childrenKey,
    taskNameKey = props.taskNameKey,
    hightLightWords = props.hightLightWords,
    isColumnDropDisabled = props.isColumnDropDisabled,
    renderHeader = props.renderHeader,
    renderExtra = props.renderExtra,
    renderItem = props.renderItem,
    highlightTasksBy = props.highlightTasksBy,
    handleAddBtn = props.handleAddBtn,
    onBeforeDragStart = props.onBeforeDragStart,
    onDragStart = props.onDragStart,
    onDragUpdate = props.onDragUpdate,
    onDragEnd = props.onDragEnd,
    style = props.style,
    nextProps = __rest(props, ["prefixCls", "dataSource", "className", "idKey", "titleKey", "childrenKey", "taskNameKey", "hightLightWords", "isColumnDropDisabled", "renderHeader", "renderExtra", "renderItem", "highlightTasksBy", "handleAddBtn", "onBeforeDragStart", "onDragStart", "onDragUpdate", "onDragEnd", "style"]);
  var ContextValue = {
    renderHeader: renderHeader,
    renderExtra: renderExtra,
    renderItem: renderItem,
    highlightTasksBy: highlightTasksBy,
    handleAddBtn: handleAddBtn,
    idKey: idKey,
    titleKey: titleKey,
    childrenKey: childrenKey,
    taskNameKey: taskNameKey,
    hightLightWords: hightLightWords
  };
  return _react.default.createElement(_configProvider.ConfigContext.Consumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var prefixCls = getPrefixCls('taskboard', customizePrefixCls);
    return _react.default.createElement(TaskBoardContext.Provider, {
      value: Object.assign(Object.assign({}, ContextValue), {
        prefixCls: prefixCls
      })
    }, _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
      onBeforeDragStart: onBeforeDragStart,
      onDragStart: onDragStart,
      onDragUpdate: onDragUpdate,
      onDragEnd: onDragEnd
    }, _react.default.createElement(_reactBeautifulDnd.Droppable, {
      droppableId: "all-columns",
      direction: "horizontal",
      type: "column",
      isDropDisabled: isColumnDropDisabled
    }, function (provided) {
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(prefixCls, className),
        style: style
      }, _react.default.createElement("div", Object.assign({
        className: prefixCls + '-drag-drop-content',
        ref: provided.innerRef
      }, provided.droppableProps), dataSource.map(function (item, key) {
        return _react.default.createElement(ColumnsList, Object.assign({
          key: key,
          index: key,
          column: item,
          tasks: item[childrenKey]
        }, nextProps));
      }), provided.placeholder));
    })));
  });
};
TaskBoard.defaultProps = {
  dataSource: [],
  className: '',
  hightLightWords: '',
  idKey: 'id',
  titleKey: 'title',
  childrenKey: 'children',
  taskNameKey: 'name',
  hideQuickAdd: false,
  isColumnDragDisabled: false,
  isColumnDropDisabled: false,
  isTaskDragDisabled: false,
  isTaskDropDisabled: false,
  onBeforeDragStart: function onBeforeDragStart(_) {
    return _;
  },
  onDragStart: function onDragStart(_) {
    return _;
  },
  onDragUpdate: function onDragUpdate(_) {
    return _;
  },
  onDragEnd: function onDragEnd(_) {
    return _;
  }
};
var _default = exports.default = TaskBoard;