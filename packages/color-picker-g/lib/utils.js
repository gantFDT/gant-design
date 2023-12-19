"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validColorText = exports.fillText = exports.PrimaryColors = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _colors = require("@ant-design/colors");

var PrimaryColors = Object.entries(_colors.presetPalettes).map(function (_ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  var primary = value.primary;
  delete value.primary;
  return {
    id: key,
    primary: primary,
    children: value
  };
});
exports.PrimaryColors = PrimaryColors;

var validColorText = function validColorText(_) {
  var reg = /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
  return reg.test(_);
};

exports.validColorText = validColorText;

var fillText = function fillText(_) {
  _.includes('#') && (_ = _.slice(1));
  _ = _.toUpperCase();

  if (validColorText(_)) {
    if (_.length === 3) {
      return _.replace(/^([0-9a-fA-f])([0-9a-fA-f])([0-9a-fA-f]$)/, '$1$1$2$2$3$3');
    }

    return "".concat(_);
  }

  return _.replace('#', '');
};

exports.fillText = fillText;