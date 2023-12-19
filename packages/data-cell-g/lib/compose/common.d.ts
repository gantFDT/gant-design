export declare type HanderMapper<T> = (param: T) => T;
export declare type HandlerType = <T>(param: T | HanderMapper<T>) => void;
export declare type HandlerWithType<T> = (param: T | HanderMapper<T>) => void;
