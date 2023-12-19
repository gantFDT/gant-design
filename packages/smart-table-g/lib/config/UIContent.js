"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/switch/style/css");

var _switch = _interopRequireDefault(require("antd/es/switch"));

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _header = _interopRequireDefault(require("header-g"));

var _util = require("util-g");

var _sortable = _interopRequireDefault(require("../sortable"));

var _formatschema = _interopRequireDefault(require("../formatschema"));

var _Receiver = _interopRequireDefault(require("../locale/Receiver"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function UIContent(props) {
  var _props$viewConfig = props.viewConfig,
      viewConfig = _props$viewConfig === void 0 ? {} : _props$viewConfig,
      schema = props.schema,
      _props$uiFields = props.uiFields,
      uiFields = _props$uiFields === void 0 ? ['wrap', 'isZebra', 'bordered', 'clickable', 'footerDirection', 'heightMode'] : _props$uiFields,
      onChange = props.onChange;
  (0, _react.useEffect)(function () {
    if (schema && viewConfig && !viewConfig.columnFields) {
      var _formatSchema = (0, _formatschema.default)(schema),
          _columnFields = _formatSchema.columnConfigs;

      onChange(Object.assign(Object.assign({}, viewConfig), {
        columnFields: _columnFields
      }));
    }
  }, [schema]);
  var _viewConfig$wrap = viewConfig.wrap,
      wrap = _viewConfig$wrap === void 0 ? true : _viewConfig$wrap,
      _viewConfig$isZebra = viewConfig.isZebra,
      isZebra = _viewConfig$isZebra === void 0 ? true : _viewConfig$isZebra,
      _viewConfig$bordered = viewConfig.bordered,
      bordered = _viewConfig$bordered === void 0 ? true : _viewConfig$bordered,
      _viewConfig$clickable = viewConfig.clickable,
      clickable = _viewConfig$clickable === void 0 ? true : _viewConfig$clickable,
      _viewConfig$footerDir = viewConfig.footerDirection,
      footerDirection = _viewConfig$footerDir === void 0 ? 'row' : _viewConfig$footerDir,
      _viewConfig$heightMod = viewConfig.heightMode,
      heightMode = _viewConfig$heightMod === void 0 ? 'full' : _viewConfig$heightMod,
      columnFields = viewConfig.columnFields;
  var handlerChange = (0, _react.useCallback)(function (key, value) {
    onChange(Object.assign(Object.assign({}, viewConfig), (0, _defineProperty2.default)({}, key, (0, _util.getType)(value) === 'Object' ? value.target.value : value)));
  }, [viewConfig]); // tabKey相关

  var _useState = (0, _react.useState)('field'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      tabKey = _useState2[0],
      setTabKey = _useState2[1];

  var handlerChangeTabKey = (0, _react.useCallback)(function (e) {
    setTabKey(e.target.value);
  }, []);
  var handlerChangeColumnKeys = (0, _react.useCallback)(function (records) {
    onChange(Object.assign(Object.assign({}, viewConfig), {
      columnFields: (0, _toConsumableArray2.default)(records)
    }));
  }, [viewConfig]);
  var hasFixed = (0, _react.useMemo)(function () {
    if (!viewConfig.columnFields) return false;
    return viewConfig.columnFields.some(function (V) {
      if (V.lock && viewConfig.wrap) {
        onChange(Object.assign(Object.assign({}, viewConfig), {
          wrap: false
        }));
      }

      return !!V.lock;
    });
  }, [viewConfig]);
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
      value: tabKey,
      onChange: handlerChangeTabKey,
      style: {
        marginBottom: 10,
        width: '100%',
        display: 'flex'
      },
      buttonStyle: "solid",
      size: 'small'
    }, /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
      style: {
        flex: 1,
        textAlign: 'center'
      },
      value: "field"
    }, locale.fieldConfig), /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
      style: {
        flex: 1,
        textAlign: 'center'
      },
      value: "ui"
    }, locale.displayConfig)), tabKey === 'field' ? /*#__PURE__*/_react.default.createElement(_sortable.default, {
      dataSource: columnFields,
      onChange: handlerChangeColumnKeys
    }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, uiFields.map(function (K, I) {
      switch (K) {
        case 'wrap':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.isWrap
          }), /*#__PURE__*/_react.default.createElement(_switch.default, {
            checked: wrap,
            disabled: hasFixed,
            onChange: handlerChange.bind(null, 'wrap'),
            checkedChildren: locale.wrap,
            unCheckedChildren: locale.noWrap
          }));

        case 'isZebra':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.isZebra
          }), /*#__PURE__*/_react.default.createElement(_switch.default, {
            checked: isZebra,
            onChange: handlerChange.bind(null, 'isZebra'),
            checkedChildren: locale.yes,
            unCheckedChildren: locale.no
          }));

        case 'bordered':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.bordered
          }), /*#__PURE__*/_react.default.createElement(_switch.default, {
            checked: bordered,
            onChange: handlerChange.bind(null, 'bordered'),
            checkedChildren: locale.yes,
            unCheckedChildren: locale.no
          }));

        case 'clickable':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.clickable
          }), /*#__PURE__*/_react.default.createElement(_switch.default, {
            checked: clickable,
            onChange: handlerChange.bind(null, 'clickable'),
            checkedChildren: locale.yes,
            unCheckedChildren: locale.no
          }));

        case 'footerDirection':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.footerDirection
          }), /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
            options: [{
              label: locale.leftB,
              value: 'row-reverse'
            }, {
              label: locale.rightB,
              value: 'row'
            }],
            value: footerDirection,
            onChange: handlerChange.bind(null, 'footerDirection')
          }));

        case 'heightMode':
          return /*#__PURE__*/_react.default.createElement("div", {
            key: K
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            type: 'num',
            num: I + 1,
            title: locale.eightMode
          }), /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
            options: [{
              label: locale.heightAuto,
              value: 'auto'
            }, {
              label: locale.heightFull,
              value: 'full'
            }],
            value: heightMode,
            onChange: handlerChange.bind(null, 'heightMode')
          }));
      }
    })));
  });
}

var _default = UIContent;
exports.default = _default;