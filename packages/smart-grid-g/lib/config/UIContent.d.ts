import React from 'react';
interface UIContentProps {
    viewConfig: any;
    gridKey: string;
    schema?: any;
    height?: number;
    uiFields?: string[];
    showDisplayConfig?: boolean;
    onChange(viewConfig: any): void;
}
declare function UIContent(props: UIContentProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof UIContent>;
export default _default;
