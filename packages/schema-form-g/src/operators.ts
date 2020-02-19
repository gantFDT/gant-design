export interface Operator {
    key: string // 操作符标识
    name: string // 操作符中文名称
    symbol?: string // 操作符符号
}

export interface OperatorObj {
    [key: string]: Operator
}

const tr = (v) => v

const allOperators: OperatorObj = {
    EQ: {
        key: 'EQ',
        symbol: '=',
        name: tr('等于'),
    },
    NOT_EQ: {
        key: 'NOT_EQ',
        symbol: '!=',
        name: tr('不等于'),
    },
    LIKE: {
        key: 'LIKE',
        name: tr('包含'),
    },
    NOT_LIKE: {
        key: 'NOT_LIKE',
        name: tr('不包含'),
    },
    START_WITH: {
        key: 'START_WITH',
        name: tr('以..开头'),
    },
    END_WITH: {
        key: 'END_WITH',
        name: tr('以..结尾'),
    },
    IN: {
        key: 'IN',
        name: tr('属于'),
    },
    NOT_IN: {
        key: 'NOT_IN',
        name: tr('不属于'),
    },
    IS_NULL: {
        key: 'IS_NULL',
        name: tr('为空'),
    },
    IS_NOT_NULL: {
        key: 'IS_NOT_NULL',
        name: tr('不为空'),
    },
    LT: {
        key: 'LT',
        name: tr('小于'),
        symbol: '<'
    },
    LT_EQ: {
        key: 'LT_EQ',
        name: tr('小于等于'),
        symbol: '<='
    },
    GT: {
        key: 'GT',
        name: tr('大于'),
        symbol: '>'
    },
    GT_EQ: {
        key: 'GT_EQ',
        name: tr('大于等于'),
        symbol: '>='
    },
    EMPTY: {
        key: 'EMPTY',
        name: tr('无')
    }
}

export default allOperators