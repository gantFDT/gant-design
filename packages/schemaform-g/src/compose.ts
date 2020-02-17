import React from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { get, isEqual, isPlainObject, intersection, set, cloneDeep } from 'lodash'
import moment from 'moment'

import { compose, renameProp, withPropsOnChange, withStateHandlers } from 'recompose'
import { Props, Schema, Types } from './interface'


export type Inner = Props & {
    setSchema: (newSchema: Schema | ((s: Schema) => Schema)) => void,
    mapSubSchema: (key: string, newSchema: Schema) => void,
    schemaState: Schema
}

const objectToPath = (obj: object): Array<string> => {
    const paths: Array<string> = []
    const inner = (obj: object, parentKey = ''): void => {
        Object.keys(obj).forEach(k => {
            const combineKey = parentKey ? parentKey + '.' + k : k
            const value = obj[k]
            if (value && isPlainObject(value) && !moment.isMoment(value)) {
                inner(value, combineKey)
            } else {
                paths.push(combineKey)
            }
        })
    }
    inner(obj)
    return paths
}

/**
 * 查找依赖项
 * @param field 改变的key
 * @param value 改变的值
 * @param parentKey 父级key
 * @param schema 当前schema
 * @param form 
 */
export const findDependencies = (
    changedValueObject: object,
    schemaKey: string,
    { ...schema }: Schema,
    mapSubSchema: (key: string, newSchema: Schema) => void,
    form: WrappedFormUtils
): void => {
    // 改变的key
    // object.product
    const changeKeys = objectToPath(changedValueObject)
    const { dependencies = [], onDependenciesChange, type, ...restSchema } = schema
    if (type !== Types.object) {
        if (get(dependencies, 'length') && get(intersection(dependencies, changeKeys), 'length') && onDependenciesChange) {
            const dependenciesValues = dependencies.map(deKey => {
                if (changeKeys.includes(deKey)) return get(changedValueObject, deKey)
                return form.getFieldValue(deKey)
            })
            const mergeSchema = onDependenciesChange(dependenciesValues, cloneDeep(restSchema), form)
            if (mergeSchema) {
                // 异步走这里，需要通过mapSubSchema将subSchema更新到主schema
                if (mergeSchema.then && typeof mergeSchema.then === 'function') {
                    mergeSchema.then((mSchema: Schema) => { mapSubSchema(schemaKey, { ...schema, ...mSchema }) })
                } else {
                    // 同步走这里，直接改变schema，FormSchema更新的时候自动获取最新的schema
                    // schema.props = { ...props, ...mergeProps }
                    mapSubSchema(schemaKey, { ...schema, ...mergeSchema })
                }
            }
        }
    } else if (schema.propertyType) {
        schema.propertyType = { ...schema.propertyType }
        for (const [subSchemaKey, schemaValue] of Object.entries(schema.propertyType)) {
            const { dependencies = [], onDependenciesChange, type } = schemaValue
            if (
                // 找到了依赖项或者是object，进入递归
                (get(dependencies, 'length') && get(intersection(dependencies, changeKeys), 'length') && onDependenciesChange) ||
                type === Types.object
            ) {
                findDependencies(changedValueObject, `${schemaKey}.${subSchemaKey}`, schemaValue, mapSubSchema, form)
            }

        }
    }
}

// 将subSchema更新到主schema，并返回
const deepMergeSchema = (schemaState: Schema, keysString: string, subSchema: Schema): Schema => {
    const schema = cloneDeep(schemaState)
    const keysArray = keysString.split('.').filter(Boolean).reduce(
        (res, k: string) => {
            res.push('propertyType')
            res.push(k)
            return res
        }, [] as Array<string>
    )
    const keyPath = keysArray.join('.')
    set(schema, keyPath, subSchema)
    return schema
}

// 处理ref
// onRef代理wrappedComponentRef
export const refHoc = compose(
    React.forwardRef,
    (BC: React.SFC<Props>) => ({ wrappedComponentRef, ...props }: Props, ref: any) => {
        const factory = React.createFactory(BC)
        return factory({
            ...props,
            onRef: ref || wrappedComponentRef
        })
    },
)

export default compose(
    withStateHandlers(
        ({ schema }: Props) => ({ schemaState: schema }),
        {
            mapSubSchema: ({ schemaState }, { onSchemaChange }) => (key: string, subSchema: Schema) => {
                const newSchema = deepMergeSchema(schemaState, key, subSchema)
                if (!isEqual(schemaState, newSchema)) {
                    if (onSchemaChange) {
                        onSchemaChange(newSchema)
                    }
                    return {
                        schemaState: newSchema
                    }
                }
                return {
                    schemaState
                }
            },
            setSchema: () => schema => ({ schemaState: schema })
        }
    ),
    withPropsOnChange(['schema'], ({ schema, setSchema }: Inner) => {
        setSchema(schema)
    }),
    renameProp('schemaState', 'schema'),
)