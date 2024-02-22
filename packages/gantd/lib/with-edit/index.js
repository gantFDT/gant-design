"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _recompose = require("recompose");
var _renderText = _interopRequireDefault(require("../compose/renderText"));
var _editwrapper = _interopRequireDefault(require("../compose/editwrapper"));
var _withbasic = require("../compose/withbasic");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var _default = exports.default = function _default(getText, popupClassName) {
  return (0, _recompose.compose)(_recompose.toClass, (0, _withbasic.withBasic)(popupClassName), (0, _recompose.branch)(function (props) {
    return !props.computedEdit;
  },
  // 读模式
  function () {
    return (0, _renderText.default)(getText);
  }), _editwrapper.default, (0, _recompose.mapProps)(function (_a) {
    var allowEdit = _a.allowEdit,
      setEdit = _a.setEdit,
      computedEdit = _a.computedEdit,
      setPopupClassName = _a.setPopupClassName,
      setDisabledBlur = _a.setDisabledBlur,
      emptyText = _a.emptyText,
      props = __rest(_a, ["allowEdit", "setEdit", "computedEdit", "setPopupClassName", "setDisabledBlur", "emptyText"]);
    return Object.assign({}, props);
  }));
};