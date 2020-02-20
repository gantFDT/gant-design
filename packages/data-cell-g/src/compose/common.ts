
export type HanderMapper<T> = (param: T) => T

export type HandlerType = <T>(param: T | HanderMapper<T>) => void

export type HandlerWithType<T> = (param: T | HanderMapper<T>) => void