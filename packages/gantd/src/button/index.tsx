/**
 * 为了暴露antd button的全局配置而包装的button
 *
 */
import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd/lib/button';
import React from 'react';
import {getGlobalConfig} from './utils'

export interface GantButtonProps extends ButtonProps {}

const Button = (buttonProps: GantButtonProps) => {
  const globalConfig = getGlobalConfig();
  const props = { ...globalConfig, ...buttonProps };
  return <AntButton {...props}></AntButton>;
};

export {setGlobalConfig} from './utils'
export default Button;
