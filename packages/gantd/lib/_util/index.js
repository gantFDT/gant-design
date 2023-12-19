"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hex2hsl = exports.getType = exports.getKey = void 0;

var getType = function getType(sth) {
  return Object.prototype.toString.call(sth).slice(8, -1);
};

exports.getType = getType;

var getKey = function getKey() {
  return Math.random().toString(16).slice(2);
};

exports.getKey = getKey;

var hex2hsl = function hex2hsl(hexColor) {
  var sColor = hexColor.toLowerCase(); //十六进制颜色值的正则表达式

  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 如果是16进制颜色

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";

      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }

      sColor = sColorNew;
    } //处理六位的颜色值


    var sColorChange = [];

    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }

    var r = sColorChange[0],
        g = sColorChange[1],
        b = sColorChange[2];
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }

  return sColor;
};

exports.hex2hsl = hex2hsl;