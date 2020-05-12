import React from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { get, isEqual, isPlainObject, intersection, set, cloneDeep } from 'lodash'
import moment from 'moment'
import { getKey } from './utils'
import { compose, renameProp, withPropsOnChange, withStateHandlers, withState, withProps } from 'recompose'
import { Props, Schema, Types } from './interface'


export type Inner = Props & {
    setSchema: (newSchema: Schema | ((s: Schema) => Schema), fn: any) => void,
    mapSubSchema: (schema: Schema, key: string, newSchema: Schema) => void,
    schemaState: Schema,
    bakData: any,
    setBakData: any,
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
    mapSubSchema: (schema: Schema, key: string, newSchema: Schema) => void,
    form: WrappedFormUtils
): void => {
    function inner(schemaKey, subSchema) {
        // 改变的key
        // object.product
        const changeKeys = objectToPath(changedValueObject)
        const { dependencies = [], onDependenciesChange, type, ...restSchema } = subSchema
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
                        mergeSchema.then((mSchema: Schema) => { mapSubSchema(schema, schemaKey, { ...subSchema, ...mSchema }) })
                    } else {
                        // 同步走这里，直接改变schema，FormSchema更新的时候自动获取最新的schema
                        // schema.props = { ...props, ...mergeProps }
                        mapSubSchema(schema, schemaKey, { ...subSchema, ...mergeSchema })
                    }
                }
            }
        } else if (subSchema.propertyType) {
            subSchema.propertyType = { ...subSchema.propertyType }
            for (const [subSchemaKey, schemaValue] of Object.entries(subSchema.propertyType)) {
                const { dependencies = [], onDependenciesChange, type } = schemaValue as any
                if (
                    // 找到了依赖项或者是object，进入递归
                    (get(dependencies, 'length') && get(intersection(dependencies, changeKeys), 'length') && onDependenciesChange) ||
                    type === Types.object
                ) {
                    inner(`${schemaKey}.${subSchemaKey}`, schemaValue)
                }

            }
        }
    }

    inner(schemaKey, schema)
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
            mapSubSchema: ({ schemaState }, { onSchemaChange }) => (schema: Schema, key: string, subSchema: Schema) => {
                if (!isEqual(schemaState, schema)) return /**说明此时schemaState已经更新，将阻断此次依赖更新schema的操作 */
                const newSchema = deepMergeSchema(schema, key, subSchema)
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
            setSchema: () => (schema, fn) => {
                fn()
                return ({ schemaState: schema })
            }
        }
    ),
    withState("bakData", "setBakData", ({ data }: Inner) => data),
    withPropsOnChange((props: Inner, nextProps: Inner) => {
        const isDataChange = !isEqual(props.data, nextProps.data)
        const isSchemaChange = !isEqual(props.schema, nextProps.schema)
        if (isSchemaChange) {
            nextProps.setSchema(nextProps.schema, () => {
                if (isDataChange) nextProps.setBakData(nextProps.data)
            })
        }
        else if (isDataChange) {
            // 再schema没有变化
            nextProps.setBakData(nextProps.data)
        }
        return isSchemaChange
    }, (props: Inner) => ({ key: getKey() })),
    // withProps((props: Inner) => {
    //     const isDataChange = !isEqual(props.data, props.bakData)
    //     const schemaUpdated = isEqual(props.schemaState, props.schema)
    //     if (isDataChange && schemaUpdated) {
    //         // schema更新完毕、更新data
    //         props.setBakData(props.data)
    //     }
    // }),

    renameProp('schemaState', 'schema'),
    renameProp('bakData', 'data'),
)