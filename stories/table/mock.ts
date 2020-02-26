import Mock from 'mockjs'

const { Random } = Mock
export const getList = function getList(length = 5) {
    const key = `list|${length}`
    const data = Mock.mock({
        [key]: [{
            "name|1": Random.name(),
            "age|1-100": 1,
            "address|1": Random.province()
        }]
    })
    return data.list
}