import React from 'react';
interface UIContentProps {
    viewConfig: any;
    schema?: any;
    uiFields?: string[];
    onChange(viewConfig: any): void;
}
declare function UIContent(props: UIContentProps): React.JSX.Element;
export default UIContent;
