/// <reference types="react" />
import GantGridFormToolPanelRenderer from './GantGridFormToolPanelRenderer';
export declare function setComponentsMaps(components: any): {};
export declare function setFrameworkComponentsMaps(components: any): {
    gantGroupCellRenderer: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Pick<import("./GantGroupCellRenderer").GantGroupCellRendererProps, string | number> & import("react").RefAttributes<unknown>>>;
    gantRenderCol: import("react").NamedExoticComponent<any>;
    gantTooltip: import("react").ForwardRefExoticComponent<Pick<any, string | number | symbol> & import("react").RefAttributes<unknown>>;
    gantPinnedRowRenderer: import("react").NamedExoticComponent<any>;
    gantGridFormToolPanelRenderer: typeof GantGridFormToolPanelRenderer;
};
export declare function getAllComponentsMaps(): {
    componentsMaps: {};
    frameworkComponentsMaps: {
        gantGroupCellRenderer: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Pick<import("./GantGroupCellRenderer").GantGroupCellRendererProps, string | number> & import("react").RefAttributes<unknown>>>;
        gantRenderCol: import("react").NamedExoticComponent<any>;
        gantTooltip: import("react").ForwardRefExoticComponent<Pick<any, string | number | symbol> & import("react").RefAttributes<unknown>>;
        gantPinnedRowRenderer: import("react").NamedExoticComponent<any>;
        gantGridFormToolPanelRenderer: typeof GantGridFormToolPanelRenderer;
    };
};
export declare function setGridConfig(config: any): void;
export declare function getGridConfig(): {};
