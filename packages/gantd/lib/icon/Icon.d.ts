import React from 'react';
import { CustomIconOptions } from 'antd/lib/icon/IconFont';
import { IconProps, IconComponent } from 'antd/lib/icon/index.d';
export interface GantIconProps extends IconProps {
    perfix?: string;
}
declare const GantIcon: {
    (props: GantIconProps): React.JSX.Element;
    updateFromIconfontCN(config: CustomIconOptions): void;
    Ant: IconComponent<IconProps>;
    getOutLine(): string[];
    getFill(): string[];
    getTwoTone(): string[];
};
export default GantIcon;
export { IconProps, IconComponent };
