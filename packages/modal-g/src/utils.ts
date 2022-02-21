import { merge } from 'lodash';

const globalConfig = {};
export function setGlobalConfig(config: any) {
  merge(globalConfig, config);
}

export function getGlobalConfig() {
  return globalConfig;
}
