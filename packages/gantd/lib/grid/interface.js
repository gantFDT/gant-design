"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Filter: true,
  DataActions: true,
  Fixed: true,
  Move: true,
  GridManager: true
};
exports.Fixed = exports.Filter = exports.DataActions = void 0;
Object.defineProperty(exports, "GridManager", {
  enumerable: true,
  get: function get() {
    return _gridManager.default;
  }
});
exports.Move = void 0;
var _agGridCommunity = require("ag-grid-community");
Object.keys(_agGridCommunity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _agGridCommunity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agGridCommunity[key];
    }
  });
});
var _gridManager = _interopRequireDefault(require("./gridManager"));
// 过滤器
var Filter;
(function (Filter) {
  Filter["Number"] = "agNumberColumnFilter";
  Filter["Text"] = "agTextColumnFilter";
  Filter["Date"] = "agDateColumnFilter";
})(Filter || (exports.Filter = Filter = {}));
// 数据修改行为
var DataActions;
(function (DataActions) {
  DataActions["add"] = "add";
  DataActions["remove"] = "remove";
  DataActions["modify"] = "modify";
  DataActions["removeTag"] = "remove_tag";
})(DataActions || (exports.DataActions = DataActions = {}));
var Fixed;
(function (Fixed) {
  Fixed["left"] = "left";
  Fixed["right"] = "right";
})(Fixed || (exports.Fixed = Fixed = {}));
var Move;
(function (Move) {
  Move["up"] = "up";
  Move["down"] = "down";
})(Move || (exports.Move = Move = {}));