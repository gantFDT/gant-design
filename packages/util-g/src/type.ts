// export type ProtoExtends<T, U> = Omit<U & {
//     [K in Exclude<keyof T, keyof U>]?: T[K]
// }, ''>
export type ProtoExtends<T, U> = U &
  {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
  };

export type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>;
