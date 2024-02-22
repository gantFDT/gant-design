"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBasic = void 0;
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _recompose = require("recompose");
var _inputwrapper = _interopRequireDefault(require("./inputwrapper"));
var _editStatus = _interopRequireDefault(require("../edit-status"));
var _computed = _interopRequireDefault(require("./computed"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var defaultComProps = {
  allowEdit: true,
  edit: _editStatus.default.CANCEL,
  confirmable: true,
  onChange: function onChange() {},
  onCancel: function onCancel() {},
  onSave: function onSave() {},
  onEnter: function onEnter() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  disabledBlur: false
};
var proptypes = {
  allowEdit: _propTypes.default.bool,
  confirmable: _propTypes.default.bool,
  edit: _propTypes.default.oneOf([_editStatus.default.EDIT, _editStatus.default.CANCEL, _editStatus.default.SAVE]),
  onChange: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onSave: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  disabledBlur: _propTypes.default.bool
};
var computedEditStatus = function computedEditStatus(edit, selfEdit) {
  return edit === _editStatus.default.EDIT || selfEdit === _editStatus.default.EDIT;
};
var withBasic = exports.withBasic = function withBasic(popupClassName) {
  return (0, _recompose.compose)((0, _recompose.defaultProps)(defaultComProps), (0, _inputwrapper.default)(popupClassName), (0, _recompose.setStatic)('propsTypes', proptypes), (0, _recompose.withState)('selfEdit', 'setEdit', _editStatus.default.CANCEL), (0, _recompose.withState)('cacheValue', 'setCacheValue', null), (0, _recompose.withHandlers)({
    onConfirm: function onConfirm(_ref) {
      var value = _ref.value,
        onSave = _ref.onSave,
        id = _ref.id,
        selfEdit = _ref.selfEdit,
        setEdit = _ref.setEdit,
        confirmable = _ref.confirmable;
      return function () {
        if (selfEdit && confirmable) {
          // 提交数据
          onSave(id, value, function () {
            return setEdit(_editStatus.default.SAVE);
          });
        }
      };
    },
    onCancelCache: function onCancelCache(_ref2) {
      var onChange = _ref2.onChange,
        value = _ref2.value,
        cacheValue = _ref2.cacheValue,
        setCacheValue = _ref2.setCacheValue,
        onCancel = _ref2.onCancel;
      return function () {
        if (value !== cacheValue) {
          // 避免全局进入编辑，点取消
          onChange && onChange(cacheValue);
          onCancel(cacheValue);
        }
        setCacheValue(null);
      };
    }
  }), (0, _recompose.withHandlers)({
    onEnter: function onEnter(_ref3) {
      var onConfirm = _ref3.onConfirm,
        _onEnter = _ref3.onEnter;
      return function (e) {
        if (e.key === "Enter" && e.keyCode === 13) {
          onConfirm();
          _onEnter(e);
        }
      };
    }
  }), _computed.default, (0, _recompose.withPropsOnChange)(function (prevProps, _ref4) {
    var edit = _ref4.edit,
      selfEdit = _ref4.selfEdit,
      setEdit = _ref4.setEdit;
    var prevComputedEdit = computedEditStatus(prevProps.edit, prevProps.selfEdit);
    var computedEdit = computedEditStatus(edit, selfEdit);
    var shouldUpdate = prevComputedEdit !== computedEdit;
    return shouldUpdate;
  }, function (_ref5) {
    var edit = _ref5.edit,
      selfEdit = _ref5.selfEdit,
      setCacheValue = _ref5.setCacheValue,
      value = _ref5.value;
    if (computedEditStatus(edit, selfEdit)) setCacheValue(value);
    return {
      computedEdit: computedEditStatus(edit, selfEdit)
    };
  }), (0, _recompose.withProps)(function (_ref6) {
    var onConfirm = _ref6.onConfirm,
      setEdit = _ref6.setEdit,
      selfEdit = _ref6.selfEdit,
      onCancelCache = _ref6.onCancelCache;
    var addonAfter = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_tooltip.default, {
      title: "\u786E\u8BA4"
    }, _react.default.createElement(_icon.default, {
      type: "check",
      onClick: onConfirm,
      className: 'gant-compose-success'
    })), _react.default.createElement(_tooltip.default, {
      title: "\u53D6\u6D88"
    }, _react.default.createElement(_icon.default, {
      type: "close",
      onClick: function onClick() {
        setEdit(_editStatus.default.CANCEL);
        onCancelCache();
      },
      className: 'gant-compose-error',
      style: {
        marginLeft: 8
      }
    })));
    return {
      editAfter: selfEdit === _editStatus.default.EDIT ? addonAfter : null
    };
  }), (0, _recompose.mapProps)(function (_a) {
    var edit = _a.edit,
      selfEdit = _a.selfEdit,
      cacheValue = _a.cacheValue,
      setCacheValue = _a.setCacheValue,
      onConfirm = _a.onConfirm,
      onCancel = _a.onCancel,
      onSave = _a.onSave,
      confirmable = _a.confirmable,
      disabledBlur = _a.disabledBlur,
      onCancelCache = _a.onCancelCache,
      popupClassName = _a.popupClassName,
      props = __rest(_a, ["edit", "selfEdit", "cacheValue", "setCacheValue", "onConfirm", "onCancel", "onSave", "confirmable", "disabledBlur", "onCancelCache", "popupClassName"]);
    return props;
  }));
};