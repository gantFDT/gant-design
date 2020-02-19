import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface Locale {
  locale: string;
  AutoReload: any;
  Modal: any;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
  };

  constructor(props: LocaleProviderProps) {
    super(props);
  }

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  componentDidUpdate(prevProps: LocaleProviderProps) {
    const { locale } = this.props;
    if (prevProps.locale !== locale) {

    }
  }

  componentWillUnmount() {

  }

  render() {
    return this.props.children;
  }
}
