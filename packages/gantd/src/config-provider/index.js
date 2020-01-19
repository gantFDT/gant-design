import * as React from 'react';
import createReactContext,{ Context } from 'create-react-context';

// import defaultRenderEmpty, { RenderEmptyHandler } from './renderEmpty';

// export { RenderEmptyHandler };

const PrimaryColor = "#1890ff";

const ConfigContext = createReactContext({
  // We provide a default function for Context without provider
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) return customizePrefixCls;

    return `gant-${suffixCls}`;
  },

  primaryColor: PrimaryColor,

  // renderEmpty: defaultRenderEmpty,
});

export const ConfigConsumer = ConfigContext.Consumer;

class ConfigProvider extends React.Component {
  getPrefixCls(suffixCls, customizePrefixCls) {
    const { prefixCls = 'gant' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  renderProvider(context) {
    const { children, getPopupContainer, renderEmpty, csp, autoInsertSpaceInButton } = this.props;

    const config = {
      ...context,
      getPrefixCls: this.getPrefixCls,
      csp,
      autoInsertSpaceInButton,
    };

    if (getPopupContainer) {
      config.getPopupContainer = getPopupContainer;
    }
    if (renderEmpty) {
      config.renderEmpty = renderEmpty;
    }

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
  };

  render() {
    return <ConfigConsumer>{this.renderProvider}</ConfigConsumer>;
  }
}

// =========================== withConfigConsumer ===========================
// We need define many types here. So let's put in the block region

export function withConfigConsumer(config) {
  return function(Component) {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    const SFC = ((props) => (
      <ConfigConsumer>
        {(configProps) => {
          const { prefixCls: basicPrefixCls } = config;
          const { getPrefixCls } = configProps;
          const { prefixCls: customizePrefixCls } = props;
          const prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls);
          return <Component {...configProps} {...props} prefixCls={prefixCls} />;
        }}
      </ConfigConsumer>
    ));

    const cons = Component.constructor;
    const name = (cons && cons.displayName) || Component.name || 'Component';

    SFC.displayName = `withConfigConsumer(${name})`;

    return SFC;
  };
}

export default ConfigProvider;
