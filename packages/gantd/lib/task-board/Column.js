"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireWildcard(require("react"));

var _Task = _interopRequireDefault(require("./Task"));

var _lodash = require("lodash");

var _index = require("./index");

var _reactBeautifulDnd = require("react-beautiful-dnd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var areEqual = function areEqual(prevProps, nextProps) {
  return (0, _lodash.isEqual)(prevProps, nextProps);
};

var InnerTasksList = function InnerTasksList(props) {
  var tasks = props.tasks,
      nextProps = __rest(props, ["tasks"]);

  if ((0, _lodash.isEmpty)(tasks)) return null;
  return tasks.map(function (task, key) {
    return /*#__PURE__*/_react.default.createElement(_Task.default, Object.assign({
      key: key,
      task: task,
      index: key
    }, nextProps));
  });
};

var TaskList = /*#__PURE__*/(0, _react.memo)(InnerTasksList, areEqual);

var Column = function Column(props) {
  var column = props.column,
      tasks = props.tasks,
      index = props.index,
      hideQuickAdd = props.hideQuickAdd,
      isColumnDragDisabled = props.isColumnDragDisabled,
      isTaskDropDisabled = props.isTaskDropDisabled,
      nextProps = __rest(props, ["column", "tasks", "index", "hideQuickAdd", "isColumnDragDisabled", "isTaskDropDisabled"]);

  var _useContext = (0, _react.useContext)(_index.TaskBoardContext),
      prefixCls = _useContext.prefixCls,
      renderHeader = _useContext.renderHeader,
      renderExtra = _useContext.renderExtra,
      handleAddBtn = _useContext.handleAddBtn,
      idKey = _useContext.idKey,
      titleKey = _useContext.titleKey;

  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
    index: index,
    draggableId: column[idKey],
    isDragDisabled: isColumnDragDisabled
  }, function (provided, snapshot) {
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: prefixCls + '-column-wrapper',
      ref: provided.innerRef
    }, provided.draggableProps), /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls + '-column-container',
      style: {
        boxShadow: "".concat(snapshot.isDragging ? 'rgba(0, 0, 0, 0.2) 2px 2px 1px' : '')
      }
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, provided.dragHandleProps), renderHeader === null ? null : renderHeader ? renderHeader(column) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls + '-column-header-wrapper'
    }, /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: column[titleKey],
      mouseEnterDelay: 0.3,
      placement: "topLeft"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls + '-column-header-title'
    }, column[titleKey], tasks && tasks.length > 0 ? "(".concat(tasks.length, ")") : null)), /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls + '-column-header-extra'
    }, renderExtra && renderExtra(column)))), /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
      droppableId: column[idKey],
      type: 'task',
      isDropDisabled: isTaskDropDisabled
    }, function (provided, snapshot) {
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: prefixCls + '-task-drop-inner',
        ref: provided.innerRef
      }, provided.droppableProps), /*#__PURE__*/_react.default.createElement(TaskList, Object.assign({
        tasks: tasks,
        column: column
      }, nextProps)), provided.placeholder, !hideQuickAdd && /*#__PURE__*/_react.default.createElement("div", {
        className: prefixCls + '-quick-add',
        onClick: function onClick(e) {
          e.stopPropagation();
          handleAddBtn && handleAddBtn(column);
        }
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "plus"
      })));
    })));
  });
};

var _default = Column;
exports.default = _default;