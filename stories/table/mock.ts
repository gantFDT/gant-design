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

export const getNestList = function getNestList(length = 15) {
    const key = `list|2`
    const data = Mock.mock({
        [key]: Array.from({ length }).map(() => (
            {
                "name|1": Random.name(),
                "age|1-100": 1,
                "address|1": Random.province(),
                "cName|1": Random.paragraph(2, 5),
                "createDate|1": Random.date(),
                "cAddress|1": Random.province(),
                "street|1": Random.paragraph(2, 5),
                "email|000000-999999": 1,
                "boss|1": Random.name()
            }
        ))
    })
    return data.list.slice(0, length)
}