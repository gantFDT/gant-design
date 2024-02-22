import type { ButtonProps } from 'antd/lib/button';
import React from 'react';
export interface GantButtonProps extends ButtonProps {
}
declare const Button: {
    (buttonProps: GantButtonProps): React.JSX.Element;
    Group: React.SFC<import("antd/lib/button").ButtonGroupProps>;
};
export { setGlobalConfig } from './utils';
export default Button;
