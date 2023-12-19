"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hisDecorator = hisDecorator;
exports.modifyDecorator = modifyDecorator;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function hisDecorator() {
  return function (target, name, desc) {
    return Object.assign(Object.assign({}, desc), {
      value: function value() {
        for (var _len = arguments.length, ags = new Array(_len), _key = 0; _key < _len; _key++) {
          ags[_key] = arguments[_key];
        }

        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return desc.value.apply(this, ags);

                case 2:
                  this.watchHistory();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
      }
    });
  };
}

function modifyDecorator() {
  return function (target, name, desc) {
    return Object.assign(Object.assign({}, desc), {
      value: function value() {
        for (var _len2 = arguments.length, ags = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          ags[_key2] = arguments[_key2];
        }

        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee2() {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.loading = true;
                  _context2.next = 3;
                  return desc.value.apply(this, ags);

                case 3:
                  this.loading = false;

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
      }
    });
  };
}