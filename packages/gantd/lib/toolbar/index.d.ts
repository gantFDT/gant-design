import React from 'react';
export interface ToolBarPropsIF {
    extraLeft?: React.ReactNode;
    extraRight?: React.ReactNode;
    style?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    fixed?: boolean;
}
declare const Toolbar: (props: ToolBarPropsIF) => React.JSX.Element;
export default Toolbar;
