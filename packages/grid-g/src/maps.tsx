import GantGridFormToolPanelRenderer from './GantGridFormToolPanelRenderer';
import GantGroupCellRenderer from './GantGroupCellRenderer';
import GantPinnedRowRenderer from './GantPinnedRowRenderer';
import GantTooltip from './GantTooltip';
import RenderCol from './GirdRenderColumn';
import { merge } from 'lodash';
let componentsMaps = {};
let frameworkComponentsMaps = {
  gantGroupCellRenderer: GantGroupCellRenderer,
  gantRenderCol: RenderCol,
  gantTooltip: GantTooltip,
  gantPinnedRowRenderer: GantPinnedRowRenderer,
  gantGridFormToolPanelRenderer: GantGridFormToolPanelRenderer,
};

export function setComponentsMaps(components) {
  componentsMaps = {
    ...componentsMaps,
    ...components,
  };
  return componentsMaps;
}
export function setFrameworkComponentsMaps(components) {
  frameworkComponentsMaps = {
    ...frameworkComponentsMaps,
    ...components,
  };
  return frameworkComponentsMaps;
}
export function getAllComponentsMaps() {
  return { componentsMaps, frameworkComponentsMaps };
}
let globalGridConfig = {};
export function setGridConfig(config: any) {
  merge(globalGridConfig, config);
}

export function getGridConfig() {
  return globalGridConfig;
}
