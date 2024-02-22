"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableWrapperRef = exports.scrollIntoViewWithRowKey = void 0;
var _recompose = require("recompose");
var tableWrapperRef = exports.tableWrapperRef = (0, _recompose.compose)((0, _recompose.withState)('tableWraper', 'settableWraper', null), (0, _recompose.withProps)(function (_ref) {
  var tableWraper = _ref.tableWraper,
    settableWraper = _ref.settableWraper;
  return {
    wrappedComponentRef: function wrappedComponentRef(ref) {
      if (!tableWraper && ref) settableWraper(ref);
    }
  };
}));
var scrollIntoViewWithRowKey = exports.scrollIntoViewWithRowKey = (0, _recompose.compose)((0, _recompose.withPropsOnChange)(['scrollKey'], function (_ref2) {
  var tableWraper = _ref2.tableWraper,
    scrollKey = _ref2.scrollKey;
  if (tableWraper && scrollKey) {
    var tr = tableWraper.querySelector("tr[data-row-key='".concat(scrollKey, "']"));
    if (tr) {
      tr.scrollIntoView();
    }
  }
}));