import RenderCol from './GirdRenderColumn';
import GantGroupCellRenderer, { GantGroupCellRendererProps } from './GantGroupCellRenderer';
import GantValidateTooltip from './GantValidateTooltip';

let componentsMaps = {};
let frameworkComponentsMaps = {
  gantGroupCellRenderer: GantGroupCellRenderer,
  gantRenderCol: RenderCol,
  gantValidateTooltip: GantValidateTooltip,
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
