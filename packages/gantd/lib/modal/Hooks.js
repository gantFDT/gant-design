"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrag = useDrag;
exports.usePrev = usePrev;
exports.useResize = useResize;

var _react = require("react");

function useDrag(x, y, onDrag) {
  var isDragging = (0, _react.useRef)(false);
  var initialDragState = (0, _react.useRef)({
    initX: 0,
    initY: 0,
    mouseDownX: 0,
    mouseDownY: 0
  });
  var onMouseDown = (0, _react.useCallback)(function (e) {
    e.stopPropagation();
    setTextSelectable(false);
    initialDragState.current = {
      initX: x,
      initY: y,
      mouseDownX: e.clientX,
      mouseDownY: e.clientY
    };
    isDragging.current = true;
  }, [x, y]);
  var onMouseMove = (0, _react.useCallback)(function (e) {
    if (isDragging.current) {
      var _initialDragState$cur = initialDragState.current,
          initX = _initialDragState$cur.initX,
          mouseDownX = _initialDragState$cur.mouseDownX,
          initY = _initialDragState$cur.initY,
          mouseDownY = _initialDragState$cur.mouseDownY;
      var dx = e.clientX - mouseDownX;
      var dy = e.clientY - mouseDownY;

      var _x = initX + dx;

      var _y = initY + dy;

      onDrag({
        x: _x,
        y: _y
      });
    }
  }, [onDrag]);
  (0, _react.useEffect)(function () {
    window.addEventListener('mousemove', onMouseMove, {
      passive: true
    });
    return function () {
      return window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var onMouseUp = function onMouseUp() {
      isDragging.current = false;
      setTextSelectable(true);
    };

    window.addEventListener('mouseup', onMouseUp);
    return function () {
      return window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return onMouseDown;
}

function useResize(x, y, width, height, minWidth, minHeight, windowSize, onResize) {
  var isDragging = (0, _react.useRef)(false);
  var initialDragState = (0, _react.useRef)({
    initX: 0,
    initY: 0,
    initWidth: 0,
    initHeight: 0,
    mouseDownX: 0,
    mouseDownY: 0,
    minWidth: minWidth,
    minHeight: minHeight,
    windowSize: windowSize,
    resizeDirection: undefined
  });
  var onMouseDown = (0, _react.useCallback)(function (resizeDirection, e) {
    e.stopPropagation();
    setTextSelectable(false);
    initialDragState.current = {
      initX: x,
      initY: y,
      initWidth: width,
      initHeight: height,
      mouseDownX: e.clientX,
      mouseDownY: e.clientY,
      minWidth: minWidth,
      minHeight: minHeight,
      windowSize: windowSize,
      resizeDirection: resizeDirection
    };
    isDragging.current = true;
  }, [width, height, x, y, minWidth, minHeight, windowSize]);
  var onMouseMove = (0, _react.useCallback)(function (e) {
    if (isDragging.current) {
      var _initialDragState$cur2 = initialDragState.current,
          initX = _initialDragState$cur2.initX,
          initY = _initialDragState$cur2.initY,
          initWidth = _initialDragState$cur2.initWidth,
          mouseDownX = _initialDragState$cur2.mouseDownX,
          initHeight = _initialDragState$cur2.initHeight,
          mouseDownY = _initialDragState$cur2.mouseDownY,
          _minWidth = _initialDragState$cur2.minWidth,
          _minHeight = _initialDragState$cur2.minHeight,
          _windowSize = _initialDragState$cur2.windowSize,
          resizeDirection = _initialDragState$cur2.resizeDirection;
      var dx = e.clientX - mouseDownX;
      var dy = e.clientY - mouseDownY;
      var _x2 = initX;
      var _y2 = initY;
      var _width = initWidth;
      var _height = initHeight;
      var isToTop = dy < 0;
      var isToleft = dx < 0;
      var absDy = Math.abs(dy);
      var absDx = Math.abs(dx); // 纵轴初始位置与高度

      if (['top', 'rightTop', 'leftTop'].includes(resizeDirection)) {
        _y2 = isToTop ? _y2 - absDy : _y2 + absDy;
        _height = isToTop ? _height + absDy : _height - absDy;
      } // 横轴初始位置与宽度


      if (['leftBottom', 'left', 'leftTop'].includes(resizeDirection)) {
        _x2 = isToleft ? _x2 - absDx : _x2 + absDx;
        _width = isToleft ? _width + absDx : _width - absDx;
      } // 普通场景宽度


      if (['rightTop', 'right', 'rightBottom'].includes(resizeDirection)) {
        _width += dx;
      } // 普通场景高度


      if (['rightBottom', 'bottom', 'leftBottom'].includes(resizeDirection)) {
        _height += dy;
      } // 处理边界
      // 上边


      if (_y2 < 0) {
        _height = _height - Math.abs(_y2);
        _y2 = 0;
      } // 下边


      var maxHeight = _windowSize.height - _y2;

      if (_height > maxHeight) {
        _height = maxHeight;
      } // 左边


      if (_x2 < 0) {
        _width = _width - Math.abs(_x2);
        _x2 = 0;
      }

      var maxWidth = _windowSize.width - _x2; // 右边

      if (_width > maxWidth) {
        _width = maxWidth;
      } // 最小宽度


      if (_width < _minWidth) {
        _width = _minWidth;

        if (!isToleft) {
          _x2 = initX + initWidth - _minHeight;
        }
      } // 最小高度


      if (_height < _minHeight) {
        _height = _minHeight;

        if (!isToTop) {
          _y2 = initY + initHeight - _minHeight;
        }
      }

      return onResize({
        x: _x2,
        y: _y2,
        width: _width,
        height: _height
      });
    }
  }, [initialDragState, onResize]);
  (0, _react.useEffect)(function () {
    window.addEventListener('mousemove', onMouseMove, {
      passive: true
    });
    return function () {
      return window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var onMouseUp = function onMouseUp() {
      isDragging.current = false;
      setTextSelectable(true);
    };

    window.addEventListener('mouseup', onMouseUp);
    return function () {
      return window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return onMouseDown;
}

function usePrev(value) {
  var ref = (0, _react.useRef)(value);
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}

function setTextSelectable(selectable) {
  document.onselectstart = function () {
    return selectable;
  };
}