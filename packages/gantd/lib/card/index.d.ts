/// <reference types="react" />
import { CardProps } from 'antd/lib/card';
export interface GantCardProps extends CardProps {
    showBoxShadow?: boolean;
}
declare const Card: (cardProps: GantCardProps) => JSX.Element;
export default Card;
export { setGlobalConfig } from './utils';
