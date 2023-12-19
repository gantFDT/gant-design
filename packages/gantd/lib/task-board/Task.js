"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _index = require("./index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var boxShadowColor = 'rgba(0, 0, 0, 0.2) 2px 2px 1px';

var Task = function Task(props) {
  var task = props.task,
      column = props.column,
      index = props.index,
      isTaskDragDisabled = props.isTaskDragDisabled;

  var _useContext = (0, _react.useContext)(_index.TaskBoardContext),
      prefixCls = _useContext.prefixCls,
      idKey = _useContext.idKey,
      taskNameKey = _useContext.taskNameKey,
      hightLightWords = _useContext.hightLightWords,
      renderItem = _useContext.renderItem,
      highlightTasksBy = _useContext.highlightTasksBy;

  var _highlightTasksBy = (0, _react.useCallback)(function (keywords, task) {
    return task[taskNameKey].indexOf(keywords) < 0;
  }, []);

  var fn = highlightTasksBy || _highlightTasksBy;
  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
    draggableId: task[idKey],
    index: index,
    isDragDisabled: isTaskDragDisabled
  }, function (provided, snapshot) {
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: prefixCls + '-task-container-wrapper',
      ref: provided.innerRef
    }, provided.draggableProps, provided.dragHandleProps), /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls + '-task-container',
      style: {
        boxShadow: "".concat(snapshot.isDragging ? boxShadowColor : ''),
        opacity: hightLightWords && fn(hightLightWords, task) ? 0.4 : 1
      }
    }, renderItem ? renderItem(task, column) : /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: 8
      }
    }, task[taskNameKey])));
  });
};

var _default = Task;
exports.default = _default;