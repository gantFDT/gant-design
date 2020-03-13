import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react'
import { toggleFixedTable, setStyle, setMainTableBorder, getStyleText } from './_utils'
import { TableContext } from './context'

const TableComponent = (props) => {

    const [table, settable] = useState(null)
    const { light, spacing, dataSource, emitReCompute, headerFixed, tableColumns, virtualScroll, mainHeight, tableGroup, storageWidth, scrollY } = useContext(TableContext)
    const width = useMemo(() => getStyleText(storageWidth), [storageWidth])
    const spac = useMemo(() => getStyleText(spacing), [spacing])
    const height = useMemo(() => getStyleText(scrollY), [scrollY])
    const hasScrollY = useMemo(() => typeof scrollY !== 'undefined', [scrollY])
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
                    toggleFixedTable(parent, scrollY, scrollX, hasScrollY)

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
                        setStyle(table, `border-spacing: 0 ${spac};`)
                    }
                })
            } else if (parent.classList.contains('ant-table-body-inner')) {
                // 设置固定列最低高度
                // fix 当数据总高度不足时，滚动条显示在inner底部
                setStyle(parent, `min-height: ${height}`)

            }
        }
        /**
         * emitReCompute用于控制当展开表格的时候高度被撑开，动态去控制header右边的滚动条站位
         */
    }, [table, dataSource.length, tableColumns, emitReCompute, virtualScroll, height, spac, hasScrollY])
    const tableRef = useCallback(
        (dom) => {
            if (dom) {
                settable(dom)
                if (virtualScroll) {
                    const scrollContainer = dom.parentElement
                    const parent = scrollContainer.parentElement
                    if (scrollContainer && parent) {
                        const isBodyTable = parent.classList.contains('ant-table-body')
                        if (isBodyTable) {
                            tableGroup.set('bodyTable', dom)
                            setStyle(scrollContainer, `width: ${width}`)
                        } else {
                            const p = parent.parentElement.parentElement
                            const isLeft = p.classList.contains('ant-table-fixed-left')
                            tableGroup.set(isLeft ? 'leftTable' : "rightTable", dom)
                        }
                    }
                }
            }
        },
        [virtualScroll, width]
    )
    if (virtualScroll) {
        return (
            <div className="scroll--container" style={{ minHeight: mainHeight, height: mainHeight, overflow: 'hidden' }}>
                <table ref={tableRef} {...props} style={{ ...props.style, border: 0 }} />
            </div>
        )
    }
    return <table ref={tableRef} {...props} />
}

export default TableComponent
