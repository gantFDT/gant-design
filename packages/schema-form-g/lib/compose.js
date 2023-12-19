"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refHoc = exports.findDependencies = exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _utils = require("./utils");

var _recompose = require("recompose");

var _interface = require("./interface");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var objectToPath = function objectToPath(obj, schema) {
  var paths = [];

  var inner = function inner(schema) {
    var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    Object.keys(schema.propertyType).forEach(function (k) {
      var combineKey = parentKey ? parentKey + '.' + k : k;
      if (!(0, _lodash.hasIn)(obj, combineKey)) return;
      var value = (0, _lodash.get)(obj, combineKey);

      if (value && (0, _lodash.isPlainObject)(value) && (0, _lodash.get)(schema, "propertyType.".concat(k, ".type")) === 'object') {
        inner((0, _lodash.get)(schema, "propertyType.".concat(k)), combineKey);
      } else {
        paths.push(combineKey);
      }
    });
  };

  inner(schema);
  return paths;
};
/**
 * 查找依赖项
 */


var findDependencies = function findDependencies(changedValueObject, _a, mapSubSchema, form) {
  var schema = __rest(_a, []); // 改变的key
  // object.product


  var changeKeys = objectToPath(changedValueObject, schema);
  if (!changeKeys.length) return;
  var dependenciesChangeValue = {};

  function setFieldsValue(data) {
    var _iterator = _createForOfIteratorHelper(Reflect.ownKeys(data)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        Reflect.set(dependenciesChangeValue, key, data[key]);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  /**进入schema子树去寻找依赖项 */


  function inner(schemaKey, subSchema) {
    /**将所有变更推送到同一次更新流程、而不再时单独去在整个树上更新、防止出现一次更新流程中，修改了多个子树，导致前后更新不一致的问题 */
    var changedSchema = [];

    var _subSchema$dependenci = subSchema.dependencies,
        dependencies = _subSchema$dependenci === void 0 ? [] : _subSchema$dependenci,
        onDependenciesChange = subSchema.onDependenciesChange,
        type = subSchema.type,
        restSchema = __rest(subSchema, ["dependencies", "onDependenciesChange", "type"]);

    if (type !== _interface.Types.object) {
      if ((0, _lodash.get)(dependencies, 'length') && (0, _lodash.get)((0, _lodash.intersection)(dependencies, changeKeys), 'length') && onDependenciesChange) {
        var dependenciesValues = dependencies.map(function (deKey) {
          if (changeKeys.includes(deKey)) return (0, _lodash.get)(changedValueObject, deKey);
          return form.getFieldValue(deKey);
        });
        var mergeSchema = onDependenciesChange(dependenciesValues, (0, _lodash.cloneDeep)(Object.assign(Object.assign({}, restSchema), {
          dependencies: dependencies
        })), Object.assign(Object.assign({}, form), {
          setFieldsValue: setFieldsValue
        }));
        changedSchema.push(Promise.resolve(mergeSchema).then(function (newSubSchema) {
          return {
            key: schemaKey,
            schema: Object.assign(Object.assign({}, subSchema), newSubSchema)
          };
        }));
      }
    } else if (subSchema.propertyType) {
      subSchema.propertyType = Object.assign({}, subSchema.propertyType);
      var entries = Object.entries(subSchema.propertyType);

      for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
        var _entries$_i = (0, _slicedToArray2.default)(_entries[_i], 2),
            subSchemaKey = _entries$_i[0],
            schemaValue = _entries$_i[1];

        var _schemaValue$dependen = schemaValue.dependencies,
            _dependencies = _schemaValue$dependen === void 0 ? [] : _schemaValue$dependen,
            _onDependenciesChange = schemaValue.onDependenciesChange,
            _type = schemaValue.type;

        if ( // 找到了依赖项或者是object，进入递归
        (0, _lodash.get)(_dependencies, 'length') && (0, _lodash.get)((0, _lodash.intersection)(_dependencies, changeKeys), 'length') && _onDependenciesChange || _type === _interface.Types.object) {
          var subChangedSchema = inner([].concat((0, _toConsumableArray2.default)(schemaKey), [subSchemaKey]), schemaValue);
          changedSchema.push.apply(changedSchema, (0, _toConsumableArray2.default)(subChangedSchema));
        }
      }
    }

    return changedSchema;
  }

  var allChange = inner([], schema);
  Promise.all(allChange).then(function (changes) {
    mapSubSchema(schema, changes, function () {
      if (!(0, _lodash.isEmpty)(dependenciesChangeValue)) {
        form.setFieldsValue(dependenciesChangeValue);
      }
    });
  });
}; // 将subSchema更新到主schema，并返回


exports.findDependencies = findDependencies;

var deepMergeSchema = function deepMergeSchema(schemaState, changes) {
  var schemaTree = (0, _lodash.cloneDeep)(schemaState);
  changes.reduce(function (schema, change) {
    var key = change.key,
        subSchema = change.schema; // 依赖项带"."问题

    var target = schema.propertyType;

    var _iterator2 = _createForOfIteratorHelper(key),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var keyPath = _step2.value;

        if ((0, _lodash.last)(key) === keyPath) {
          Reflect.set(target, keyPath, subSchema);
        } else {
          target = (0, _lodash.get)(target, "".concat(keyPath, ".propertyType"));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return schema;
  }, schemaTree);
  return schemaTree;
}; // 处理ref
// onRef代理wrappedComponentRef


var refHoc = (0, _recompose.compose)(_react.default.forwardRef, function (BC) {
  return function (_a, ref) {
    var wrappedComponentRef = _a.wrappedComponentRef,
        props = __rest(_a, ["wrappedComponentRef"]);

    var factory = /*#__PURE__*/_react.default.createFactory(BC);

    return factory(Object.assign(Object.assign({}, props), {
      onRef: ref || wrappedComponentRef
    }));
  };
});
exports.refHoc = refHoc;

var _default = (0, _recompose.compose)((0, _recompose.withStateHandlers)(function (_ref) {
  var schema = _ref.schema;
  return {
    schemaState: schema,
    nextTask: null
  };
}, {
  mapSubSchema: function mapSubSchema(_ref2, _ref3) {
    var schemaState = _ref2.schemaState;
    var onSchemaChange = _ref3.onSchemaChange;
    return function (schema, changes, nextTask) {
      /**schema发生变化，将阻断此次依赖更新schema的操作 */
      if (!(0, _lodash.isEqual)(schemaState, schema)) return {
        schemaState: schemaState,
        nextTask: null
      };

      if (changes.length) {
        var newSchema = deepMergeSchema(schema, changes);

        if (!(0, _lodash.isEqual)(schemaState, newSchema)) {
          if (onSchemaChange) {
            onSchemaChange(newSchema);
          }

          return {
            schemaState: newSchema,
            nextTask: nextTask
          };
        }
      }

      return {
        schemaState: schemaState,
        nextTask: nextTask
      };
    };
  },
  setSchema: function setSchema() {
    return function (schema, fn) {
      fn();
      return {
        schemaState: schema
      };
    };
  },
  resetNextTask: function resetNextTask() {
    return function () {
      return {
        nextTask: null
      };
    };
  }
}), (0, _recompose.withPropsOnChange)(['nextTask'], function (_ref4) {
  var resetNextTask = _ref4.resetNextTask,
      nextTask = _ref4.nextTask;

  if (nextTask) {
    // 降低nextTask执行的优先级，使Form先更新，得到新的schema
    setTimeout(function () {
      nextTask();
      resetNextTask();
    });
  }
}), (0, _recompose.withState)('bakData', 'setBakData', function (_ref5) {
  var data = _ref5.data;
  return data;
}), (0, _recompose.withPropsOnChange)(function (props, nextProps) {
  var isDataChange = !(0, _lodash.isEqual)(props.data, nextProps.data);
  var isSchemaChange = !(0, _lodash.isEqual)(props.schema, nextProps.schema);

  if (isSchemaChange) {
    nextProps.setSchema(nextProps.schema, function () {
      if (isDataChange) nextProps.setBakData(nextProps.data);
    });
  } else if (isDataChange) {
    // 再schema没有变化
    nextProps.setBakData(nextProps.data);
  }

  return isSchemaChange;
}, function (props) {
  return {
    key: (0, _utils.getKey)()
  };
}), (0, _recompose.renameProp)('schemaState', 'schema'), (0, _recompose.renameProp)('bakData', 'data'));

exports.default = _default;