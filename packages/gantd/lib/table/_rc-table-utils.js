"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var scrollbarVerticalSize;
var scrollbarHorizontalSize; // Measure scrollbar width for padding body during modal show/hide

var scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px'
}; // This const is used for colgroup.col internal props. And should not provides to user.

var measureScrollbar = function measureScrollbar(_ref) {
  var _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'vertical' : _ref$direction,
      prefixCls = _ref.prefixCls;

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }

  var isVertical = direction === 'vertical';

  if (isVertical && scrollbarVerticalSize) {
    return scrollbarVerticalSize;
  }

  if (!isVertical && scrollbarHorizontalSize) {
    return scrollbarHorizontalSize;
  }

  var scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach(function (scrollProp) {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  }); // apply hide scrollbar className ahead

  scrollDiv.className = "".concat(prefixCls, "-hide-scrollbar scroll-div-append-to-body"); // Append related overflow style

  if (isVertical) {
    scrollDiv.style.overflowY = 'scroll';
  } else {
    scrollDiv.style.overflowX = 'scroll';
  }

  document.body.appendChild(scrollDiv);
  var size = 0;

  if (isVertical) {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollbarVerticalSize = size;
  } else {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    scrollbarHorizontalSize = size;
  }

  document.body.removeChild(scrollDiv);
  return size;
};

var _default = measureScrollbar;
exports.default = _default;