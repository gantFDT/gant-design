import * as React from 'react';
import * as PropTypes from 'prop-types';
import defaultLocaleData from './default';

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: object | Function;
  children: (locale: object, localeCode?: string, fullLocale?: object) => React.ReactNode;
}

interface LocaleInterface {
  [key: string]: any;
}

export interface LocaleReceiverContext {
  gantLocale?: LocaleInterface;
}

export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
  static defaultProps = {
    componentName: 'global',
  };

  static contextTypes = {
    gantLocale: PropTypes.object,
  };

  context: LocaleReceiverContext;

  getLocale() {
    const { componentName, defaultLocale } = this.props;
    const locale: object | Function =
      defaultLocale || (defaultLocaleData as LocaleInterface)[componentName || 'global'];
    const { gantLocale } = this.context;
    const localeFromContext = componentName && gantLocale ? gantLocale[componentName] : {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }

  getLocaleCode() {
    const { gantLocale } = this.context;
    const localeCode = gantLocale && gantLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (gantLocale && gantLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }

  render() {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.gantLocale);
  }
}
