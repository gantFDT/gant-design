import React from 'react';
interface RecordProps {
    dataIndex: string;
    title: string;
    checked: boolean;
    lock?: boolean;
    clickable?: boolean;
    fixed?: 'left' | 'right';
    align?: 'left' | 'right' | 'center';
}
interface SortableProps {
    dataSource: RecordProps[];
    onChange: (records: RecordProps[]) => void;
}
declare function Sortable(props: SortableProps): React.JSX.Element;
export default Sortable;
