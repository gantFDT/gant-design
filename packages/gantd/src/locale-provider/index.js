import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class LocaleProvider extends React.Component {
  static propTypes = {
    locale: PropTypes.object,
  };

  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    gantLocale: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      gantLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  // componentDidUpdate(prevProps) {
  //   const { locale } = this.props;
  // }

  render() {
    return React.Children.only(this.props.children);
  }
}
