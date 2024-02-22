"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalState = exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _interface = require("./interface");
var getModalState = exports.getModalState = function getModalState(state, id) {
  return state.modals[id] || state.initialModalState;
};
var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};
var getAxis = function getAxis(windowMeter, targetMeter, num) {
  if (typeof num == 'number') return num;
  return (windowMeter - targetMeter) / 2;
};
var convertPercentage = function convertPercentage(target, windowSize, inital) {
  if (typeof target == 'number') return target;
  var reg = new RegExp(/^\d+%$/);
  if (reg.test(target)) return Math.floor(windowSize * (Number(target.replace("%", "")) / 100));
  return inital;
};
var mapObject = function mapObject(obj, fn) {
  return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2.default)(Object.keys(obj).map(function (key) {
    return (0, _defineProperty2.default)({}, key, fn(obj[key]));
  }))));
};
var getNextZIndex = function getNextZIndex(state, id) {
  var modals = state.modals,
    maxZIndex = state.maxZIndex;
  if (Object.keys(modals).length === 1) return maxZIndex;
  var modalState = getModalState(state, id);
  return modalState.zIndex === maxZIndex ? maxZIndex : maxZIndex + 1;
};
var clampDrag = function clampDrag(windowWidth, windowHeight, x, y, width, height) {
  var maxX = windowWidth - width;
  var maxY = windowHeight - height;
  var clampedX = clamp(0, maxX, x);
  var clampedY = clamp(0, maxY, y);
  return {
    x: clampedX,
    y: clampedY
  };
};
var clampResize = function clampResize(minWidth, minHeight, windowWidth, windowHeight, x, y, width, height) {
  var maxWidth = windowWidth - x;
  var maxHeight = windowHeight - y;
  var clampedWidth = clamp(minWidth, maxWidth, width);
  var clampedHeight = clamp(minHeight, maxHeight, height);
  return {
    width: clampedWidth,
    height: clampedHeight
  };
};
/**
 * 获取当前页面以展示的所有modal的最大zIndex
 * @param originMaxZindex 原有的maxZIndex
 * @returns
 */
function getPageMaxZIndex(originMaxZindex) {
  var allModals = document.querySelectorAll('.ant-modal-wrap');
  var maxZindex = originMaxZindex;
  allModals.forEach(function (modal) {
    var _a, _b;
    var zIndex = Number(((_a = modal === null || modal === void 0 ? void 0 : modal.style) === null || _a === void 0 ? void 0 : _a.zIndex) || 0);
    var display = (_b = modal === null || modal === void 0 ? void 0 : modal.style) === null || _b === void 0 ? void 0 : _b.display;
    if (display != 'none' && zIndex && zIndex > maxZindex) {
      maxZindex = zIndex;
    }
  });
  return maxZindex + 1;
}
var resizableReducer = function resizableReducer(state, action) {
  var minWidth = state.minWidth,
    minHeight = state.minHeight,
    initialModalState = state.initialModalState,
    windowSize = state.windowSize;
  var needIncrease = Object.keys(state.modals).length != 1;
  switch (action.type) {
    case _interface.ActionTypes.mount:
      var combineState = Object.assign(Object.assign({}, initialModalState), action.itemState);
      var inital = {
        width: combineState.width,
        height: combineState.height,
        x: combineState.x,
        y: combineState.y
      };
      combineState.width = convertPercentage(combineState.width, windowSize.width, initialModalState.width);
      combineState.height = convertPercentage(combineState.height, windowSize.height, initialModalState.height);
      var x = getAxis(windowSize.width, combineState.width, combineState.x);
      var y = getAxis(windowSize.height, combineState.height, combineState.y);
      return Object.assign(Object.assign({}, state), {
        maxZIndex: state.maxZIndex + 1,
        modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign({
          inital: inital
        }, combineState), {
          x: x,
          y: y,
          zIndex: state.maxZIndex + 1
        })))
      });
    case _interface.ActionTypes.unmount:
      var modalsClone = Object.assign({}, state.modals);
      delete modalsClone[action.id];
      return Object.assign(Object.assign({}, state), {
        modals: modalsClone
      });
    case _interface.ActionTypes.focus:
      var modalState = state.modals[action.id];
      var maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex;
      return Object.assign(Object.assign({}, state), {
        maxZIndex: maxZIndex,
        modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign({}, modalState), {
          zIndex: maxZIndex
        })))
      });
    case _interface.ActionTypes.show:
      {
        var _modalState = Object.assign({}, state.modals[action.id]);
        var needKeep = _modalState.keepStateOnClose;
        var _inital = _modalState.inital,
          maximize = _modalState.maximize;
        var target = needKeep ? _modalState : _inital;
        if (!needKeep) {
          typeof _inital.width == 'string' && (_modalState.width = convertPercentage(_inital.width, windowSize.width, initialModalState.width));
          typeof _inital.height == 'string' && (_modalState.height = convertPercentage(_inital.height, windowSize.height, initialModalState.height));
        }
        var _maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex;
        var centerX = getAxis(windowSize.width, _modalState.width, target.x);
        var centerY = getAxis(windowSize.height, _modalState.height, target.y);
        var isMaximized = _modalState.isMaximized;
        var position = clampDrag(windowSize.width, windowSize.height, centerX, centerY, _modalState.width, _modalState.height);
        var size = clampResize(minWidth, minHeight, windowSize.width, windowSize.height, position.x, position.y, _modalState.width, _modalState.height);
        if (!needKeep && maximize) {
          position = {
            x: 0,
            y: 0
          };
          size = {
            width: windowSize.width,
            height: windowSize.height
          };
          isMaximized = maximize;
        }
        return Object.assign(Object.assign({}, state), {
          maxZIndex: _maxZIndex,
          modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign(Object.assign(Object.assign({}, _modalState), position), size), {
            isMaximized: isMaximized,
            zIndex: _maxZIndex,
            visible: true
          })))
        });
      }
    case _interface.ActionTypes.hide:
      {
        var _modalState2 = state.modals[action.id];
        var resetState = Object.assign(Object.assign({}, _modalState2), {
          width: convertPercentage(_modalState2.inital.width, windowSize.width, initialModalState.width),
          height: convertPercentage(_modalState2.inital.height, windowSize.height, initialModalState.height),
          isMaximized: false,
          visible: false
        });
        var newState = _modalState2.keepStateOnClose ? _modalState2 : resetState;
        return Object.assign(Object.assign({}, state), {
          modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, newState))
        });
      }
    case _interface.ActionTypes.max:
      {
        var _modalState3 = state.modals[action.id];
        var history = {
          x: _modalState3.x,
          y: _modalState3.y,
          width: _modalState3.width,
          height: _modalState3.height
        };
        return Object.assign(Object.assign({}, state), {
          modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign({}, _modalState3), {
            x: 0,
            y: 0,
            height: window.innerHeight,
            width: window.innerWidth,
            history: history,
            isMaximized: true
          })))
        });
      }
    case _interface.ActionTypes.reset:
      {
        var _modalState4 = state.modals[action.id];
        var _inital2 = _modalState4.inital,
          _history = _modalState4.history;
        var _target = _history || _inital2;
        _target.width = convertPercentage(_target.width, windowSize.width, initialModalState.width);
        _target.height = convertPercentage(_target.height, windowSize.height, initialModalState.height);
        var _x = _target.x != undefined ? _target.x : getAxis(windowSize.width, _target.width);
        var _y = _target.y != undefined ? _target.y : getAxis(windowSize.height, _target.height);
        var _position = clampDrag(windowSize.width, windowSize.height, _x, _y, _target.width, _target.height);
        var _size = clampResize(minWidth, minHeight, windowSize.width, windowSize.height, _position.x, _position.y, _target.width, _target.height);
        return Object.assign(Object.assign({}, state), {
          modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign(Object.assign(Object.assign({}, _modalState4), _position), _size), {
            history: null,
            isMaximized: false
          })))
        });
      }
    case _interface.ActionTypes.resize:
      return Object.assign(Object.assign({}, state), {
        maxZIndex: getNextZIndex(state, action.id),
        modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign({}, state.modals[action.id]), {
          height: action.height,
          width: action.width,
          x: action.x,
          y: action.y,
          zIndex: getNextZIndex(state, action.id)
        })))
      });
    case _interface.ActionTypes.drag:
      return Object.assign(Object.assign({}, state), {
        maxZIndex: getNextZIndex(state, action.id),
        modals: Object.assign(Object.assign({}, state.modals), (0, _defineProperty2.default)({}, action.id, Object.assign(Object.assign(Object.assign({}, state.modals[action.id]), clampDrag(windowSize.width, windowSize.height, action.x, action.y, state.modals[action.id].width, state.modals[action.id].height)), {
          zIndex: getNextZIndex(state, action.id)
        })))
      });
    case _interface.ActionTypes.windowResize:
      return Object.assign(Object.assign({}, state), {
        windowSize: action.size,
        modals: mapObject(state.modals, function (modalState) {
          if (!modalState.visible) {
            return modalState;
          }
          var position = modalState.isMaximized ? {
            x: 0,
            y: 0
          } : clampDrag(action.size.width, action.size.height, modalState.x, modalState.y, modalState.width, modalState.height);
          var size = modalState.isMaximized ? {
            width: action.size.width,
            height: action.size.height
          } : clampResize(minWidth, minHeight, action.size.width, action.size.height, position.x, position.y, modalState.width, modalState.height);
          return Object.assign(Object.assign(Object.assign({}, modalState), position), size);
        })
      });
    default:
      throw new Error();
  }
};
var _default = exports.default = resizableReducer;