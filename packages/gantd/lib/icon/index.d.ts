import React from 'react';
import { CustomIconOptions } from 'antd/lib/icon/IconFont';
import { IconComponent, IconProps } from './Icon';
import { WithEditInProps } from '../with-edit';
declare const defaultprops: {
    perfix: string;
    value: string;
};
declare type PropExtend<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: T[K];
};
declare type BasicProps = PropExtend<IconProps, PropExtend<typeof defaultprops, {
    onBlur?: Function;
    [key: string]: any;
}>>;
declare type IconSelectorProps<T> = PropExtend<WithEditInProps<T>, BasicProps>;
interface IconSelectorCmp {
    (props: IconSelectorProps<string>): React.ReactElement;
    updateFromIconfontCN: (config: CustomIconOptions) => void;
    Ant: IconComponent<IconProps>;
}
declare const IconSelector: IconSelectorCmp;
export default IconSelector;
export { IconSelector };
