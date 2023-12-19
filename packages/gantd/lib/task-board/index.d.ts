import React from 'react';
export declare const TaskBoardContext: React.Context<ContextProps>;
declare type Data = {
    [prop: string]: any;
};
export interface ContextProps {
    prefixCls?: string;
    idKey?: string;
    titleKey?: string;
    childrenKey?: string;
    taskNameKey?: string;
    hightLightWords?: string;
    renderHeader?: (column: any) => React.ReactNode;
    renderExtra?: (column: any) => React.ReactNode;
    renderItem?: (task: any, column: any) => React.ReactNode;
    highlightTasksBy?: (keywords: string, task: any) => boolean;
    handleAddBtn?: (column: any) => void;
}
export interface TaskBoardProps extends ContextProps {
    dataSource: Data[];
    className?: string;
    style: Object;
    hideQuickAdd?: boolean;
    isColumnDragDisabled?: boolean;
    isColumnDropDisabled?: boolean;
    isTaskDragDisabled?: boolean;
    isTaskDropDisabled?: boolean;
    onBeforeDragStart?: (result: any) => void;
    onDragStart?: (result: any) => void;
    onDragUpdate?: (result: any) => void;
    onDragEnd: (result: any) => void;
}
declare const TaskBoard: {
    (props: TaskBoardProps): JSX.Element;
    defaultProps: {
        dataSource: any[];
        className: string;
        hightLightWords: string;
        idKey: string;
        titleKey: string;
        childrenKey: string;
        taskNameKey: string;
        hideQuickAdd: boolean;
        isColumnDragDisabled: boolean;
        isColumnDropDisabled: boolean;
        isTaskDragDisabled: boolean;
        isTaskDropDisabled: boolean;
        onBeforeDragStart: (_: any) => any;
        onDragStart: (_: any) => any;
        onDragUpdate: (_: any) => any;
        onDragEnd: (_: any) => any;
    };
};
export default TaskBoard;
