import React from 'react';
interface RecordProps {
    fieldName: string;
    title: string;
    dynamic?: boolean;
    hide?: boolean;
    display?: string;
    fixed?: 'left' | 'right';
    sort?: 'asc' | 'desc' | 'none';
    sortIndex?: number;
}
interface SortableProps {
    dataSource: RecordProps[];
    onChange: (records: RecordProps[]) => void;
    height?: number;
}
declare function Sortable(props: SortableProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Sortable>;
export default _default;
