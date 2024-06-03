"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(function GantTreeData() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-filter"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-filter-wrapper ag-focus-managed"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-filter-body-wrapper ag-set-filter-body-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-set-filter"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: "eFilterLoading",
    className: "ag-filter-loading ag-hidden"
  }, "\u52A0\u8F7D\u4E2D..."), /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-mini-filter ag-labeled ag-label-align-left ag-text-field ag-input-field"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-input-field-label ag-label ag-hidden ag-text-field-label"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-wrapper ag-input-wrapper ag-text-field-input-wrapper",
    role: "presentation"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "ag-input-field-input ag-text-field-input",
    type: "text",
    "aria-label": "Search filter values",
    placeholder: "\u67E5\u8BE2"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    ref: "eFilterNoMatches",
    className: "ag-filter-no-matches ag-hidden"
  }, "No matches."), /*#__PURE__*/_react.default.createElement("div", {
    ref: "eSetFilterList",
    className: "ag-set-filter-list",
    role: "presentation"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-virtual-list-viewport ag-filter-virtual-list-viewport ag-focus-managed",
    role: "listbox"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-tab-guard ag-tab-guard-top",
    role: "presentation"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-virtual-list-container ag-filter-virtual-list-container",
    ref: "eContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-virtual-list-item ag-filter-virtual-list-item",
    "aria-selected": "true",
    "aria-checked": "true"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-set-filter-item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    role: "presentation",
    ref: "eCheckbox",
    className: "ag-set-filter-item-checkbox ag-labeled ag-label-align-right ag-checkbox ag-input-field"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: "eLabel",
    className: "ag-input-field-label ag-label ag-checkbox-label",
    id: "ag-296-label"
  }, "\u5168\u9009"), /*#__PURE__*/_react.default.createElement("div", {
    ref: "eWrapper",
    className: "ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked",
    role: "presentation"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: "eInput",
    className: "ag-input-field-input ag-checkbox-input",
    type: "checkbox",
    id: "ag-296-input",
    "aria-labelledby": "ag-296-label"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-virtual-list-item ag-filter-virtual-list-item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-set-filter-item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-set-filter-item-checkbox ag-labeled ag-label-align-right ag-checkbox ag-input-field"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: "eLabel",
    className: "ag-input-field-label ag-label ag-checkbox-label"
  }, "9999999999999"), /*#__PURE__*/_react.default.createElement("div", {
    ref: "eWrapper",
    className: "ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-checked",
    role: "presentation"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "ag-input-field-input ag-checkbox-input",
    type: "checkbox"
  })))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-tab-guard ag-tab-guard-bottom"
  })))))));
});