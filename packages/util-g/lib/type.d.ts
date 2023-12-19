export declare type ProtoExtends<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
};
export declare type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>;
