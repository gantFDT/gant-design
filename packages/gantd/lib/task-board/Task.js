"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactBeautifulDnd = require("react-beautiful-dnd");
var _index = require("./index");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  return _react.default.createElement(_reactBeautifulDnd.Draggable, {
    draggableId: task[idKey],
    index: index,
    isDragDisabled: isTaskDragDisabled
  }, function (provided, snapshot) {
    return _react.default.createElement("div", Object.assign({
      className: prefixCls + '-task-container-wrapper',
      ref: provided.innerRef
    }, provided.draggableProps, provided.dragHandleProps), _react.default.createElement("div", {
      className: prefixCls + '-task-container',
      style: {
        boxShadow: "".concat(snapshot.isDragging ? boxShadowColor : ''),
        opacity: hightLightWords && fn(hightLightWords, task) ? 0.4 : 1
      }
    }, renderItem ? renderItem(task, column) : _react.default.createElement("div", {
      style: {
        padding: 8
      }
    }, task[taskNameKey])));
  });
};
var _default = exports.default = Task;