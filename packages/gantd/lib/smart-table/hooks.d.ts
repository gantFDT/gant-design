import { PaginationConfig } from '../table';
export declare function useLocalStorage<T>(storageKey: string, initValue: T): [T, (params: T) => void];
interface usePaginationProps {
    pagination?: PaginationConfig;
    pageIndex?: number;
    pageSize?: number;
    isGantPageMode?: boolean;
    onPageChange?: (pageIndex: number, pageSize?: number) => void;
    totalCount?: number;
    pageSizeOptions?: string[];
}
export declare const usePagination: (props: usePaginationProps) => PaginationConfig | undefined | boolean;
interface useTableConfigProps extends usePaginationProps {
    tableConfig: any;
    rowSelection: any;
    columns: any[];
    tableKey?: string;
}
export declare const useTableConfig: (props: useTableConfigProps) => any[];
export {};
