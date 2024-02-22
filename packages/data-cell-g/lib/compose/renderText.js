"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
var _react = _interopRequireDefault(require("react"));
var _editStatus = _interopRequireDefault(require("../edit-status"));
var _classnames = _interopRequireDefault(require("classnames"));
var undef = function (a) {
  return a;
}(); // 防止undefined被修改
var emptyTextArray = [undef, null, NaN, '']; // 出现哪些值，显示暂无。
var renderText = function renderText(getText) {
  return function (props) {
    var setEdit = props.setEdit,
      allowEdit = props.allowEdit,
      _props$emptyText = props.emptyText,
      emptyText = _props$emptyText === void 0 ? '' : _props$emptyText;
    var TextNode = _react.default.memo(function () {
      var text = getText ? getText(props) : props.value;
      if (emptyTextArray.includes(text)) {
        return _react.default.createElement("span", {
          className: 'gant-compose-noContent'
        }, emptyText);
      }
      return text;
    });
    var Pen = _react.default.memo(function () {
      var pen = null;
      if (allowEdit) {
        pen = _react.default.createElement("span", {
          className: 'gant-compose-editPen',
          onClick: function onClick() {
            return setEdit(_editStatus.default.EDIT);
          }
        }, _react.default.createElement(_icon.default, {
          type: "edit"
        }));
      }
      return pen;
    });
    var style = {
      width: '100%'
    };
    if (allowEdit) {
      style.paddingRight = 15;
    }
    return _react.default.createElement("div", {
      className: (0, _classnames.default)('gant-compose-readWrapper'),
      style: style
    }, _react.default.createElement(TextNode, null), _react.default.createElement(Pen, null));
  };
};
var _default = exports.default = renderText;