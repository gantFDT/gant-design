import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react'
import { isNumber } from 'lodash'
import { toggleFixedTable, setStyle, setMainTableBorder } from './_utils'
import { TableContext } from './context'



const TableComponent = (props) => {

    const [table, settable] = useState(null)
    const { light, spacing, dataSource, emitReCompute, headerFixed, tableColumns, virtualScroll, mainHeight } = useContext(TableContext)
    useEffect(() => {
        if (table && table.parentElement) {
            // 主table
            const parent = virtualScroll ? table.parentElement.parentElement : table.parentElement
            if (parent.classList.contains('ant-table-body')) {
                setTimeout(() => {
                    // 内容区域不够的时候 , 要隐藏掉固定列的默认滚动条
                    // 纵向滚动
                    const scrollY = parent.offsetWidth > parent.clientWidth
                    // 横向滚动
                    const scrollX = parent.offsetHeight > parent.clientHeight
                    // fix bug:处理不同数据数量下的固定列滚动条的显示与否
                    toggleFixedTable(table, scrollY, scrollX)

                    // 根据是否出现纵向滚动条来设置header的overflow-y
                    // 通过parent的宽度比较
                    const header = parent.parentElement.querySelector('.ant-table-header')
                    if (header) {
                        // fix bug:当数据多导致出现滚动条的时候，要让header也出现滚动条
                        setStyle(header, `overflow-y: ${scrollY ? 'scroll' : 'hidden'}`)
                        // fix bug:同时设置负margin，让head和body贴合
                        if (scrollY) {
                            const headerHeight = header.offsetHeight
                            const tableHeight = header.querySelector('table').offsetHeight
                            setStyle(header, `margin-bottom: -${headerHeight - tableHeight}px`)
                        }
                    }

                    // 明亮模式下，不添加底部边框
                    if (!light) {
                        setMainTableBorder(table, headerFixed, dataSource.length)
                    } else {
                        setStyle(table, `border-spacing: 0 ${isNumber(spacing) ? `${spacing}px` : spacing};`)
                    }
                })
            }
        }
        /**
         * emitReCompute用于控制当展开表格的时候高度被撑开，动态去控制header右边的滚动条站位
         */
    }, [table, dataSource.length, tableColumns, emitReCompute, virtualScroll])
    const tableRef = useCallback(
        (dom) => {
            if (dom && !table) {
                settable(dom)
            }
        },
        []
    )
    if (virtualScroll) {
        return (
            <div style={{ minHeight: mainHeight }}>
                <table ref={tableRef} {...props} />
            </div>
        )
    }
    return <table ref={tableRef} {...props} />
}

export default TableComponent
