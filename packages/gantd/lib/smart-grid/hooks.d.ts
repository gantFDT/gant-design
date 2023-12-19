/// <reference types="react" />
export declare function useLocalStorage<T>(storageKey: string, initValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
interface useTableConfigProps {
    tableConfig: any;
    columns: any[];
    tableKey?: string;
}
export declare const useTableConfig: (props: useTableConfigProps) => any[][];
export {};
