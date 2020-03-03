import Mock from 'mockjs'

const { Random } = Mock
export const getList = function getList(length = 5) {
    const key = `list|2`
    const data = Mock.mock({
        [key]: Array.from({ length }).map(() => (
            {
                "name|1": Random.name(),
                "age|1-100": 1,
                "address|1": Random.province()
            }
        ))
    })
    return data.list.slice(0, length)
}

export const getEditList = function getList(length = 5) {
    const key = `list|2`
    const data = Mock.mock({
        [key]: Array.from({ length }).map(() => (
            {
                "name|1": Random.name(),
                "age|1-100": 1
            }
        ))
    })
    return data.list.slice(0, length)
}