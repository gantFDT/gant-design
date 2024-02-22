"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
var _react = _interopRequireDefault(require("react"));
function CustomExpandIcon(props, isTree) {
  if (!isTree) {
    return null;
  }
  var type;
  var prefix;
  if (!props.expandable) {
    type = 'file';
    prefix = null;
  } else if (props.expanded) {
    type = 'folder-open';
    prefix = 'expanded';
  } else {
    type = 'folder';
    prefix = 'collapsed';
  }
  return _react.default.createElement("span", {
    onClick: function onClick(e) {
      return props.onExpand(props.record, e);
    },
    style: {
      paddingLeft: prefix ? 0 : 17
    }
  }, prefix && _react.default.createElement("span", {
    className: "ant-table-row-expand-icon ant-table-row-" + prefix
  }), _react.default.createElement(_icon.default, {
    className: "",
    type: type,
    theme: "filled"
  }));
}
var _default = exports.default = CustomExpandIcon;