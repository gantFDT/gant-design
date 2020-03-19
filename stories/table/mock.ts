import Mock from 'mockjs'

const { Random } = Mock
export const getList = function getList(length = 5) {
    return Array.from({ length }).map(() => Mock.mock({
        "name|1": Random.cname(),
        "age|1-100": 1,
        "address|1": Random.county()
    }))
}

export const getEditList = function getList(length = 5) {
    return Array.from({ length }).map(() => Mock.mock({
        "name|1": Random.cname(),
        "age|1-100": 1
    }))
}

export const getNestList = function getNestList(length = 15) {
    return Array.from({ length }).map(() => Mock.mock({
        "name|1": Random.cname(),
        "age|1-100": 1,
        "address|1": Random.county(),
        "cName|1": Random.paragraph(2, 5),
        "createDate|1": Random.date(),
        "cAddress|1": Random.county(),
        "street|1": Random.paragraph(2, 5),
        "email|000000-999999": 1,
        "boss|1": Random.cname()
    }))
}