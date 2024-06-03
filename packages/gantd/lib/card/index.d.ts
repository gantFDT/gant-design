import { CardProps } from 'antd/lib/card';
import React from 'react';
export interface GantCardProps extends CardProps {
    showBoxShadow?: boolean;
}
declare const Card: (cardProps: GantCardProps) => React.JSX.Element;
export default Card;
export { setGlobalConfig } from './utils';
