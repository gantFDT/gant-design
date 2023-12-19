"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveDefaultView = getActiveDefaultView;

/**
 * 获取当前显示的默认视图
 * @param props
 */
function getActiveDefaultView(props) {
  var _props$systemViews = props.systemViews,
      systemViews = _props$systemViews === void 0 ? [] : _props$systemViews,
      _props$companyViews = props.companyViews,
      companyViews = _props$companyViews === void 0 ? [] : _props$companyViews,
      _props$customViews = props.customViews,
      customViews = _props$customViews === void 0 ? [] : _props$customViews,
      defaultView = props.defaultView;
  var activeDefaultView = undefined;

  if (defaultView) {
    switch (defaultView.type) {
      case 'company':
        activeDefaultView = companyViews.filter(function (item) {
          return item.viewId === defaultView.viewId;
        })[0];
        activeDefaultView && (activeDefaultView.isSystem = true);
        break;

      case 'system':
        activeDefaultView = systemViews.filter(function (item) {
          return item.viewId === defaultView.viewId;
        })[0];
        activeDefaultView && (activeDefaultView.isSystem = true);
        break;

      case 'custom':
        activeDefaultView = customViews.filter(function (item) {
          return item.viewId === defaultView.viewId;
        })[0];
        activeDefaultView && (activeDefaultView.isSystem = false);
        break;
    }
  }

  if (!activeDefaultView) {
    activeDefaultView = Object.assign({}, systemViews[0]);
    activeDefaultView.isSystem = true;
  }

  return activeDefaultView;
}