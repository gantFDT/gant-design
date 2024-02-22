import React from 'react';
import { SearchProps } from 'antd/lib/input/Search';
import { WithBasicProps } from '../compose/withbasic';
export interface GantSearchProps extends SearchProps, WithBasicProps {
    onChange?: (val: any) => void;
}
declare class Search extends React.Component<GantSearchProps> {
    static defaultProps: {
        style: {};
    };
    render(): React.JSX.Element;
}
export default Search;
