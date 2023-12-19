"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

// keyCode 常量
var splitKey = function splitKey(str) {
  var reg = /[A-Z][a-z]*/g;
  return str.match(reg);
};

var isSpecialKey = function isSpecialKey(key) {
  return ['Alt', 'Ctrl', 'Meta', 'Shift'].includes(key);
};

var _default = Object.assign(Object.assign({}, _KeyCode.default), {
  checkKeyGroup: function checkKeyGroup(e, ename) {
    // 检查是否是合法的按键
    var keys = splitKey(ename); // 分解按键

    if (!keys) return;

    for (var index = 0; index < keys.length; index++) {
      // for方便跳出循环
      var key = keys[index];

      if (isSpecialKey(key)) {
        // 快捷键字符 Alt Ctrl Meta Shift
        if (!e["".concat(key.toLowerCase(), "Key")]) return false;
      } else {
        // 普通字符 A-Z 0-9 ESC 等
        if (e.keyCode !== _KeyCode.default[key.toUpperCase()]) return false;
      }
    }

    return true;
  }
});

exports.default = _default;