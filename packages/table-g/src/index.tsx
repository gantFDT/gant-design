import React, { useEffect, useState, useMemo, useCallback, useRef, } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table, Form, Pagination, Empty } from 'antd'
import { TableProps, TableEventListeners, TableRowSelection, ColumnProps } from 'antd/lib/table'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { PaginationConfig as AntPaginationConfig } from 'antd/lib/pagination'
import { compose } from 'recompose'
import _ from 'lodash'

import warning from '@util-g/warning'
import { ProtoExtends, PartRequired } from '@util-g/type'
import VisibleMenu from "@gantd/visiblemenu"
import { getColumns, renderColumnItem, useRowSelection, getStorageWidth, switchIndex, usePagination, setMainTableBorder, diffList, setStyle, getComputedColIndex, computeIndex } from './_utils'
import { ConfigConsumer } from '@gantd/config-provider'
import BlockHeader from '@pkgs/header-g/src'
import EditStatus from '@gantd/compose/editstatus'

import TableComponent from './tableRef'
import BodyCell from './bodycell'
import BodyRow from './bodyrow'
import BodyWrapper from './bodywrapper'
import HeaderCell from './headercell'
import { DataContext, TableContext, TableBodyWrapperContext } from './context'
import { tableWrapperRef, scrollIntoViewWithRowKey } from './compose'

import "./index.less"
const defaultKey = "key"

/**
 * 无法解决首行有合并列的可缩放table进入编辑状态下的单元格错位问题
 * 废除emptyRow
 */
const emptyRow = { placeholder: true } // 主要用于bodycell中空行验证，不显示

type Direction = 'row' | 'row-reverse'

const defaultProps = {
    bordered: true,
    columns: [],
    dataSource: [],
    pagination: null,
    visibleMenuTitle: "动态列",
    hideVisibleMenu: false,
    resizable: true,
    headerMarginBottom: 10,
    rowSelection: null,
    isZebra: true, // 斑马纹
    onSorted: (cols: Array<object>) => { }, // 列排序
    visibleMenuChange: () => { },
    editable: EditStatus.CANCEL,
    wrap: false,
    footerDirection: 'row' as Direction,
    orderList: [],
    light: false,
    cellPadding: 4,
    headerProps: {},
    emptyDescription: '暂无数据',
    withIndex: -1,
    onSave: (list: Array<object>, diffData: Array<Array<object>>) => { },
    flex: false,
    threshold: 60, // 触发虚拟滚动的条数
}
export type Order = { fieldName: string, orderType: string }

export type Record = {
    children?: Record[],
    isDeleted?: boolean,
    [key: string]: any
}

export type RowKey<T> = (record: T, index?: number) => string



// 重写RowSelection类型
export type RowSelection<T> = ProtoExtends<TableRowSelection<T>, {
    selectedRowKeys: string[],
    onSelect?: (rows: Array<T>, selected: boolean) => void,
    preventDefault?: boolean,
    clickable?: boolean,
    showFooterSelection?: boolean,
}>

export type EditConfig<T> = {
    render(value: string, record: T, rowIndex: number): React.ReactElement,
    showDirt?: boolean,
    editValue?: string | ((record: T, rowIndex: number, dataIndex: string) => string)
}
// 重写column类型
export interface GColumnProps<T> extends ColumnProps<T> {
    showFilter?: boolean,
    codeData?: string,
    editConfig?: EditConfig<T>,
    showTip?: boolean,
    placement?: TooltipPlacement,
    expandColumn?: boolean, // 是否是展开列
}

// editaction
export type EditActions<T> = ([list, Fn]: [Array<T>, React.Dispatch<React.SetStateAction<Array<T>>>], keys: Array<string>) => React.ReactElement

// ondragend
export type OnDragEnd<T> = (list: Array<T>) => void

// tail
export type Tail<T> = (currentPageData: Array<T>) => React.ReactNode

//visibleMenuChange
export type VisibleMenuChange<T> = (item: GColumnProps<T>[], checked: boolean, hiddens: GColumnProps<T>[]) => void

export type PaginationConfig = AntPaginationConfig | null | false

// 定义GantTableProps基础类型
interface Props<T extends Record> {
    cellPadding: React.ReactText,
    dataSource: T[],
    columns: GColumnProps<T>[],
    editActions: EditActions<T>,
    emptyDescription: React.ReactNode,
    fixedTop: React.ReactText,
    footerDirection: Direction,
    headerLeft: React.ReactElement,
    headerMarginBottom: number,
    headerRight: React.ReactNode,
    hideVisibleMenu: boolean,
    onDragEnd: OnDragEnd<T>,
    orderList: Array<Order>,
    pagination: PaginationConfig,
    resizable: boolean,
    rowSelection: RowSelection<T>,
    scrollKey: string,
    spacing: React.ReactText,
    tableKey: string,
    tail: Tail<T>,
    title: React.ReactNode,
    visibleMenuChange: VisibleMenuChange<T>,
    visibleMenuHiddenRows: Array<string>,
    wheel: Function,
    // deprecated
    resizeCell: boolean,
}

// 定义GantTableProps继承TableProps
type GantTableProps<T> = ProtoExtends<TableProps<T>, Props<T>>

// 定义GantTableProps默认参数
type GantTableDefaultProps<T> = Partial<typeof defaultProps>

// 包含默认值属性,对外暴露的Props类型
export type GantTableListOuterProps<T> = PartRequired<ProtoExtends<GantTableDefaultProps<T>, GantTableProps<T>>, 'columns' | 'dataSource'>

type GantTableListProps<T> = GantTableListOuterProps<T> & {
    tableWraper: HTMLDivElement
};

// 滚动元素类型
type ScrollElement = Element & {
    scrollTopBackUp: number,
    scrollloaded: boolean
}


const GantTableList = function GantTableList<T extends Record>(props: GantTableListProps<T>, ref: React.Ref<HTMLDivElement>) {

    const {
        pagination,
        rowSelection,
        rowKey,
        dataSource,
        isZebra,
        editable,
        onRow: originOnRow,
        bordered: customBorderd,
        scroll,
        wrap,
        footerDirection,
        flex,
        fixedTop,
        orderList,
        light,
        spacing,
        cellPadding,
        onSave,
        expandedRowKeys,
        onExpandedRowsChange,
        headerRight,
        editActions,
        tableWraper,
        withIndex,
        threshold,
    } = props
    /* =======================warning======================= */
    if (process.env.NODE_ENV !== "production") {
        warning(
            !("flex" in props),
            `GantTableList \`flex\` is deprecated, please do not use`
        )
        warning(
            !("resizeCell" in props),
            `GantTableList \`resizeCell\` is deprecated, please use \`resizable\` instead`
        )
    }

    const [tableKey] = useState(() => { // 用于缓存列宽度
        if (props.tableKey) {
            return props.tableKey
        }
        if (props.columns && props.columns.length) {
            const str = props.columns.map(item => item.dataIndex + item.title).join('')
            return window.escape(str).replace(/%u/g, '')
        }
        return Math.random().toString(32).slice(2)
    })



    // resizeCell修改为resizable,仍然支持resizeCell
    const resizeCell = useMemo(() => props.resizeCell || props.resizable, [props.resizeCell, props.resizable])
    // 有子节点禁用排序功能
    //#region
    // 是否是树形结构
    const isTree: boolean = useMemo(() => dataSource.some(item => _.get(item, 'children.length')), [dataSource])
    // 树状结构或者编辑状态下 禁止拖拽
    const sortable = useMemo(() => isTree ? false : !!props.onDragEnd, [isTree, props.onDragEnd])
    const [lock, setLock] = useState(true) // 控制onSave回调

    // 编辑时数据
    const [cacheDataList, setCacheDataList] = useState(dataSource)
    useEffect(() => {
        if (editable === EditStatus.EDIT) {
            setLock(l => !l)
            setCacheDataList(_.cloneDeep(dataSource))
        }
    }, [dataSource, editable])

    //#endregion
    // 处理表格columns，可能有嵌套头部    
    //#region
    const [columns, setColumns] = useState(props.columns);
    useEffect(() => {
        setColumns(props.columns)
    }, [props.columns])
    // dataIndex的索引
    const computedColIndex = useMemo(() => getComputedColIndex(columns), [columns])
    const useGIndex = useMemo(() => computedColIndex.find(item => item === 'g-index'), [computedColIndex])
    // 虚拟滚动的相关数据
    const [outlineNum, setOutLineNum] = useState(0)
    const lineHeight = useMemo(() => {
        // 21 line-height
        // 1 border-bottom
        const padding: number = typeof cellPadding === 'string' ? parseInt(cellPadding) : cellPadding;
        return 21 + padding * 2 + 1
    }, [cellPadding])
    // 最少100条
    const thresholdInner = useMemo(() => Math.max(threshold, defaultProps.threshold), [threshold])
    const renderListAll = useMemo(() => {
        const list = editable === EditStatus.EDIT ? cacheDataList : dataSource
        if (useGIndex) {
            return computeIndex<T>(list)
        }
        return list
    }, [cacheDataList, dataSource, editable, useGIndex])
    // 是否触发虚拟滚动
    const virtualScroll = useMemo(() => {
        const y = _.get(scroll, 'y')
        if (y && renderListAll.length > thresholdInner) {
            // 保证了不会出现，数据内容部分底部不会出现留白
            return thresholdInner * lineHeight > parseInt(y)
        }
        return false
    }, [renderListAll, thresholdInner, scroll, lineHeight])
    const mainHeight = useMemo(() => renderListAll.length * lineHeight, [renderListAll, lineHeight])
    // 最终渲染的数据
    const renderList = useMemo(() => {
        let list = renderListAll
        if (virtualScroll) {
            list = renderListAll.slice(outlineNum, outlineNum + thresholdInner)
        }
        // return computeIndex<T>(list, outlineNum)
        return list
    }, [renderListAll, thresholdInner, virtualScroll, outlineNum])

    //#endredion
    const minHeight = useMemo(() => renderList.length > 0 ? _.get(scroll, 'y') : undefined, [scroll, renderList])

    const storageWidth = useMemo(() => getStorageWidth(tableKey)['table'] || _.get(scroll, 'x') || '100%', [tableKey])
    const headerFixed = useMemo(() => !_.isUndefined(_.get(scroll, 'y')), [scroll])
    const bordered = useMemo(() => light ? false : customBorderd, [light, customBorderd])
    // 当展开项发生变化的时候主动触发table的更新，去重新计算滚动条
    const [emitReCompute, setEmitReCompute] = useState(0)


    const computedRowKey: RowKey<T> = useCallback(
        (record, index) => {
            if (!record) return undefined
            if (record === (emptyRow as Record)) return 'defaultrow'
            const recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey || defaultKey];
            return recordKey === undefined ? index : recordKey
        }, []
    )

    // 业务层修改editable状态的时候，计算修改前后数据的
    useEffect(() => {
        if (editable === EditStatus.SAVE && !lock) {
            setLock(l => !l)
            console.time('计算diff')
            const diffData = diffList(dataSource, cacheDataList, computedRowKey, isTree)
            console.timeEnd('计算diff')
            onSave(cacheDataList, diffData)
        }
    }, [editable, dataSource, isTree, lock])
    //行选择
    //#region
    const [computedRowSelection, setselectedRowKeys, footerselection] = useRowSelection(rowSelection, renderList, computedRowKey, bordered)
    const computedPagination = usePagination(pagination, computedRowSelection, dataSource.length)
    const footerCallback = useCallback((currentPageData) => {
        return (
            <>
                {currentPageData.length ? footerselection : null}
                <div className='gant-table-footer-inner' style={{ flexDirection: footerDirection }}>
                    <div className='gant-table-footer-tail' style={{ flexDirection: footerDirection }}>
                        {typeof props.tail === 'function' && props.tail(currentPageData)}
                    </div>
                    {computedPagination && <Pagination size='small'  {...computedPagination} />}
                </div>

            </>
        )
    }, [props.tail, computedPagination, footerselection, footerDirection])
    const footer = useMemo(() => {
        if (!(dataSource.length && footerselection) && !props.tail && !computedPagination) return null
        return footerCallback
    }, [props.tail, dataSource, computedPagination, footerselection])
    //#endregion
    // 滚动加载
    //#region
    const onscroll = useCallback(_.debounce((e) => {
        // 编辑状态下不触发whell事件
        if (!props.wheel || editable === EditStatus.EDIT) return
        if (e.type === 'wheel') {
            // 向下滚动，视图上移
            if (e.deltaY > 0) {
                props.wheel()
            }
            // 向上滚动，视图下移
            else { }
        } else {
            const bodyTable: ScrollElement = e.target
            if (bodyTable.scrollTop > bodyTable.scrollTopBackUp) { // 向下滚动
                const scrollAvailable = bodyTable.scrollHeight - bodyTable.clientHeight
                const lef = scrollAvailable - bodyTable.scrollTop
                if (lef <= bodyTable.scrollHeight * 0.01) { // 滚动到临界点
                    if (!bodyTable.scrollloaded) {
                        bodyTable.scrollloaded = true
                        props.wheel()
                        bodyTable.scrollloaded = false
                    }
                } else {
                    // scrollloaded控制在一定距离内不会重复调用
                    bodyTable.scrollloaded = false
                }
            }
            bodyTable.scrollTopBackUp = bodyTable.scrollTop
        }
        e.preventDefault()
    }, 50), [props.wheel, editable])

    /**
     * 虚拟滚动
     */
    const onVScroll = useCallback((e) => {
        const bodyTable = e.currentTarget.querySelector('table')
        const { scrollTop } = e.currentTarget
        const outTopLine = Math.floor(scrollTop / lineHeight);
        // 设置数据
        setOutLineNum(outTopLine)
        const outTopHeight = outTopLine * lineHeight
        setStyle(bodyTable, `transform: translate(0, ${outTopHeight}px)`)
        // e.preventDefault()
    }, [thresholdInner, lineHeight])

    // 绑定滚动事件
    const bindScroll = useCallback(
        () => {
            if (tableWraper && _.isEmpty(computedPagination)) {
                const bodyTable: ScrollElement = tableWraper.querySelector('.ant-table-body');
                bodyTable.scrollTopBackUp = bodyTable.scrollTop || 0
                bodyTable.addEventListener('wheel', onscroll, false)
                bodyTable.addEventListener('scroll', onscroll, false)
                if (virtualScroll) {
                    bodyTable.addEventListener('wheel', onVScroll, false)
                    bodyTable.addEventListener('scroll', onVScroll, false)
                }
            }
        },
        [tableWraper, onscroll, computedPagination, virtualScroll, onVScroll],
    )
    // 移除滚动事件
    const removeScroll = useCallback(
        () => {
            if (tableWraper) {
                const bodyTable = tableWraper.querySelector('.ant-table-body');
                bodyTable.removeEventListener('wheel', onscroll, false)
                bodyTable.removeEventListener('scroll', onscroll, false)
                if (virtualScroll) {
                    bodyTable.removeEventListener('wheel', onVScroll, false)
                    bodyTable.removeEventListener('scroll', onVScroll, false)
                }
            }
        },
        [tableWraper, onscroll, virtualScroll, onVScroll],
    )

    useEffect(() => {
        bindScroll()
        return () => {
            removeScroll()
        }
    }, [tableWraper, bindScroll, removeScroll])

    // 粘性头部
    const [io, setio] = useState(null) // 监听器
    useEffect(() => {
        if (tableWraper) {
            const theads = tableWraper.querySelectorAll('.ant-table-thead')
            const cloneWrapper = tableWraper.querySelector('.cloneHead')
            if (!_.isUndefined(fixedTop) && !io) {
                // 开启粘性头部
                const io = new IntersectionObserver(
                    entries => {
                        theads.forEach(thead => {
                            const { width, top } = thead.getBoundingClientRect()
                            let cloneThead = null
                            if (top < fixedTop) {
                                const html = thead.outerHTML
                                const parser = new DOMParser()
                                const doc = parser.parseFromString(`<table>${html}</table>`, 'text/html')
                                cloneThead = doc.body.children[0];
                                const { cssText } = cloneThead.style
                                cloneThead.style.cssText = `${cssText};position:fixed;top:${fixedTop}px;table-layout: fixed;width: ${width}px;z-index: 10000;`
                                const ths = cloneThead.querySelectorAll('th')
                                if (bordered) {
                                    [...ths].forEach(th => th.style.border = `1px solid rgba(126,126,126,0.3)`)
                                }
                            }
                            cloneWrapper.innerHTML = ''
                            if (cloneThead) {
                                cloneWrapper.appendChild(cloneThead)
                            }

                        })
                    },
                    {
                        // root: document.body,
                        threshold: [1],
                        rootMargin: `-${fixedTop}px 0px 0px 0px`
                    }
                )
                io.observe(tableWraper)
                setio(io)
            }
        }
    }, [tableWraper, computedPagination, io])


    // table header
    const onHeaderCell = useCallback(
        (col, { hasFixed, hasChildren, index, originOnHeaderCell }) => {
            const { key, dataIndex, fixed, align, children, } = col
            // 明亮模式下或者是固定列以及有嵌套表头不允许resize
            const resizable = !(light || fixed || hasChildren)

            type resizeCellProps = Partial<{
                orderType: string,
                key: string,
                flex: boolean,
                fixed: boolean,
                hasFixed: boolean,
                tableKey: string,
                dataIndex: string,
                headerFixed: boolean,
                resizable: boolean,
            }>
            interface cellProps extends resizeCellProps {
                cellPadding: number | string,
                style: React.CSSProperties
            }
            let headerCellProps: cellProps = {
                cellPadding,
                style: { width: col.width, maxWidth: col.width } // 防止折行模式下，被内容撑出
            }
            const ordered = orderList.find(order => dataIndex === order.fieldName)
            if (ordered) {
                headerCellProps.orderType = ordered.orderType
            }
            if (resizeCell) headerCellProps = ({
                ...headerCellProps,
                key,
                flex,
                fixed,
                hasFixed,       // 有固定的列
                tableKey,
                dataIndex,
                headerFixed, // 表格头固定
                // 当前列是否可以被缩放，弹性缩放下，最后一列不允许缩放
                resizable: flex ? resizable && index !== length - 1 : resizable,
            })
            if (typeof originOnHeaderCell === 'function') return { ...headerCellProps, ...originOnHeaderCell(col) }
            return headerCellProps
        },
        [light, cellPadding, tableKey, orderList, resizeCell, flex, headerFixed],
    )

    const onCell = useCallback(
        (col, record, rowIndex, { hasFixed, originOnCell }) => {
            const { dataIndex, editConfig, fixed } = col
            const cellEditable = _.isPlainObject(editConfig) && !_.isEmpty(editConfig)
            let defaultCellProps = {
                style: { width: col.width, maxWidth: col.width }, // 防止折行模式下，被内容撑出
                // 根据是否有固定列，以及是否是虚拟滚动来控制文本是否折行
                wrap: hasFixed || virtualScroll ? false : wrap,
                light,
                record: { ...record },
                sortable,
                rowIndex,
                dataIndex,
                cellPadding,
                editConfig: {},
            }
            if (cellEditable) defaultCellProps.editConfig = editConfig
            if (originOnCell) {
                return { ...defaultCellProps, ...originOnCell(record, rowIndex) }
            }
            return defaultCellProps
        },
        [wrap, light, sortable, tableKey, cellPadding, headerFixed, virtualScroll],
    )

    const expandIconColumnIndex = useMemo(() => {
        let index = 0
        index = Math.max(columns.findIndex(item => item.expandColumn), 0)

        return computedRowSelection ? index + 1 : index
    }, [columns, computedRowSelection])
    /**
     * columns API
     * @param editConfig object 编辑对象
     *        showDirt boolean 是否显示脏标记
     *        render function 编辑时的渲染函数
     *        editValue string|function 编辑组件的值
     */
    const convertColumns = useCallback(
        (cols, nest = false): GColumnProps<T>[] => {
            const hasFixed = cols.some(col => col.fixed)
            const computedCols = cols.map(({ width, onHeaderCell: originOnHeaderCell, onCell: originOnCell, render: originRender, ...col }, index) => {
                // 添加自定义render
                col.render = (...args) => renderColumnItem({ ...col, render: originRender }, ...args as [string, object, number])
                const hasChildren = _.get(col, 'children.length')
                if (hasChildren) {
                    // 嵌套表头不允许resize
                    col.children = convertColumns(col.children, true)
                }
                col.width = getStorageWidth(tableKey)[col.dataIndex] || width
                col.onHeaderCell = col => onHeaderCell(col, { hasFixed, hasChildren, index, originOnHeaderCell })
                col.onCell = (record, rowIndex) => onCell(col, record, rowIndex, { hasFixed, originOnCell })
                return col
            })
            if (withIndex >= 0 && !nest) {
                const index = {
                    dataIndex: 'g-index',
                    title: '序号',
                    width: 40,
                }
                return [...computedCols.slice(0, withIndex), index, ...computedCols.slice(withIndex)]
            }
            return computedCols
        },
        [onHeaderCell, onCell, tableKey, withIndex]
    )
    //#endregion

    // 处理表格行删除线
    const onRow = useCallback(
        (record, index) => {
            type OptialProps = Partial<{
                onClick: (e: React.MouseEvent) => void
            }>

            interface onRowProps extends OptialProps {
                isDeleted: boolean,
                rowIndex: number,
                sortable: boolean,
            }

            const defaultRowProps: onRowProps = {
                isDeleted: record.isDeleted,
                rowIndex: index,
                sortable
            }
            let originListener: TableEventListeners = {}
            if (originOnRow) {
                originListener = originOnRow(record, index)
            }
            if (_.get(rowSelection, 'clickable')) {
                const getCheckBoxProps = _.get(rowSelection, 'getCheckboxProps')
                let checkable = true
                if (getCheckBoxProps && typeof getCheckBoxProps === 'function') {
                    const boxProps = getCheckBoxProps(record)
                    checkable = _.get(boxProps, 'disable')
                }
                if (checkable) {
                    defaultRowProps.onClick = e => {
                        setselectedRowKeys(record)
                        if (typeof originListener.onClick === 'function') {
                            originListener.onClick(e)
                        }
                    }
                }
            }
            if (originOnRow) {
                return {
                    ...originListener,
                    ...defaultRowProps
                }
            }
            return defaultRowProps
        },
        [sortable, setselectedRowKeys, rowSelection]
    )

    // 表格中所有使用的组件
    // 控制什么时候显示可编辑组件
    //#region
    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) return
            // 要减掉第一行，所以需要要减1
            let sourceIndex = result.source.index;
            let destinationIndex = result.destination.index;
            const list = switchIndex(dataSource, sourceIndex, destinationIndex)
            sortable && props.onDragEnd(list)
        },
        [dataSource, sortable]
    )

    const components = useMemo(
        () => (
            {
                table: TableComponent,
                header: {
                    // wrapper: HeaderWrapper,
                    cell: HeaderCell,
                },
                body: {
                    wrapper: (sortable ? BodyWrapper : 'tbody') as React.ReactType,
                    row: BodyRow, // 添加删除线支持
                    cell: BodyCell,
                },
            }
        ),
        [resizeCell, BodyWrapper, sortable, HeaderCell]
    );
    //#endregion

    // 动态列
    //#region
    const [visibleMenuHiddenRows, setvisibleMenuHiddenRows] = useState(props.visibleMenuHiddenRows || []);
    const visibleMenuChange = useCallback(
        (item, checked, hiddens) => {
            console.log(item)
            props.visibleMenuChange(item, checked, hiddens)
            if (props.visibleMenuHiddenRows) return;
            setvisibleMenuHiddenRows(hiddens)
        }, []
    )
    useEffect(() => {
        if (props.visibleMenuHiddenRows) setvisibleMenuHiddenRows(props.visibleMenuHiddenRows)
    }, [props.visibleMenuHiddenRows])
    //#endregion    

    const tableColumns = useMemo(() => convertColumns(getColumns(columns, visibleMenuHiddenRows)), [columns, visibleMenuHiddenRows, convertColumns, orderList])

    const colSortable = useCallback((from, to) => {
        const cols = [...columns];
        cols.splice(to < 0 ? cols.length + to : to, 0, cols.splice(from, 1)[0])
        props.onSorted(cols)
    }, [columns])


    // 缺省显示
    const emptyText = useMemo(() => {
        return (
            <div className="gant-align-center" style={{ height: _.get(scroll, 'y') }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={props.emptyDescription} />
            </div>
        )
    }, [scroll, props.emptyDescription])

    // 展开变化
    const expandedRowsChange = useCallback(
        (expandedRowKeys: string[] | number[]) => {
            if (onExpandedRowsChange) {
                onExpandedRowsChange(expandedRowKeys)
            }
            setEmitReCompute(e => e + 1)
        },
        [onExpandedRowsChange],
    )

    // 劫持headerRight 
    let headerRightElement = useMemo(() => {
        const element = []
        if (editable === EditStatus.EDIT && typeof editActions === 'function') {
            const keys = computedRowSelection ? (computedRowSelection.selectedRowKeys || []) : []
            element.push(editActions([cacheDataList, setCacheDataList], keys))
        }
        if (headerRight) {
            element.push(headerRight)
        }
        return element.filter(Boolean).map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>)
    }, [editable, editActions, cacheDataList, headerRight, computedRowSelection])
    const onResize = useCallback(
        () => {
            setEmitReCompute(e => e + 1)
        },
        [],
    )

    const dataContextValue = useMemo(() => ({
        isTree,
        cellPadding,
        dataSource: cacheDataList,
        setDataSource: setCacheDataList,
        computedRowKey,
        editable, // 用于控制脏标记的显示，如果是save就会清除掉脏标记
        computedColIndex,
        computedRowSelection
    }), [isTree, cellPadding, cacheDataList, editable, computedColIndex, computedRowSelection])

    const tableContextValue = useMemo(() => ({
        light,
        spacing,
        dataSource,     // 滚动加载的时候触发更新header的overflow
        emitReCompute, // 展开的时候触发更新header的overflow
        headerFixed,
        tableColumns,
        onResize,
        virtualScroll,
        mainHeight
    }), [light, spacing, dataSource, emitReCompute, tableColumns, headerFixed, onResize, virtualScroll, renderListAll, cellPadding])


    const bodyWrapperContext = useMemo(() => ({ onDragEnd }), [onDragEnd])
    const renderTable = ({ getPrefixCls, primaryColor }) => {
        const {
            visibleMenuTitle,
            pagination,
            title = '',
            className,
            hideVisibleMenu,
            headerLeft,
            headerMarginBottom,
            onSorted,
            bodyStyle,
            scroll = {},
            headerProps,
            locale = {},
            ...tableProps
        } = props;

        const tablePrefixCls = getPrefixCls('table');
        const reizetablePrefixCls = getPrefixCls('table-resizable');
        const sortablePrefixCls = getPrefixCls('table-sortable');
        const zebraPrefixCls = getPrefixCls('table-zebra');
        const lightPrefixCls = getPrefixCls('table-light');
        const tableMenuPrefixCls = getPrefixCls('table-menu');
        const tableHeaderPrefixCls = getPrefixCls('table-header');
        return (
            <>
                {(title || headerRightElement.length || headerLeft) && (
                    <BlockHeader
                        title={title}
                        {...headerProps}
                        beforeExtra={headerLeft}
                        extra={
                            <>
                                {headerRightElement}
                                {
                                    !hideVisibleMenu && (
                                        <div className={tableMenuPrefixCls} style={{ display: 'inline-block' }} >
                                            <VisibleMenu
                                                data={columns}
                                                hiddenRows={visibleMenuHiddenRows}
                                                keyName="dataIndex"
                                                labelName='title'
                                                title={visibleMenuTitle}
                                                handleCheckbox={visibleMenuChange}
                                                onSorted={props.onSorted && colSortable}
                                            />
                                        </div>
                                    )
                                }
                            </>
                        }
                    />
                )}
                <DataContext.Provider value={dataContextValue}>
                    <TableContext.Provider value={tableContextValue}>
                        <TableBodyWrapperContext.Provider value={bodyWrapperContext}>
                            <Table
                                size='small'
                                scroll={{ ...scroll, x: storageWidth }}
                                locale={{ emptyText, ...locale }}
                                {...tableProps}
                                onExpandedRowsChange={expandedRowsChange}
                                bordered={bordered}
                                dataSource={renderList}
                                onRow={onRow}
                                rowKey={computedRowKey}
                                components={{ ...components, ...tableProps.components }}
                                pagination={false}
                                footer={footer}
                                bodyStyle={{ minHeight, ...bodyStyle, }}
                                className={
                                    classnames(
                                        className,
                                        tablePrefixCls,
                                        {
                                            [reizetablePrefixCls]: resizeCell,
                                            // 明亮模式禁用斑马线
                                            [zebraPrefixCls]: !light && isZebra,
                                            [sortablePrefixCls]: sortable,
                                            [lightPrefixCls]: light,
                                        }
                                    )
                                }
                                columns={tableColumns}
                                rowSelection={computedRowSelection as TableRowSelection<T>}
                                expandIconColumnIndex={expandIconColumnIndex}
                            />
                        </TableBodyWrapperContext.Provider>
                    </TableContext.Provider>
                </DataContext.Provider>
            </>
        )
    }
    return (
        <div ref={ref}>
            <ConfigConsumer>
                {renderTable}
            </ConfigConsumer>
            <div className="cloneHead"></div>
        </div >
    )
}

const GTable = compose(
    tableWrapperRef,
    scrollIntoViewWithRowKey,
    Form.create(),
    React.forwardRef,
)(GantTableList)

GTable.propTypes = {
    columns: PropTypes.array.isRequired,
    visibleMenuHiddenRows: PropTypes.array,
    visibleMenuChange: PropTypes.func,
    resizable: PropTypes.bool,
    hideVisibleMenu: PropTypes.bool,
    headerLeft: PropTypes.element,
    headerRight: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    headerMarginBottom: PropTypes.number,
    isZebra: PropTypes.bool,
    // 列排序
    onSorted: PropTypes.func,
    tableKey: PropTypes.string,
    editable: PropTypes.oneOf([EditStatus.EDIT, EditStatus.CANCEL, EditStatus.SAVE]),
    editActions: PropTypes.func,
    // 行拖拽
    onDragEnd: PropTypes.func,
    // 编辑表格保存
    onSave: PropTypes.func,

    wrap: PropTypes.bool,
    tail: PropTypes.func,
    // 无限滚动`
    wheel: PropTypes.func,
    fixedTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    light: PropTypes.bool, // 明亮模式开关
    spacing: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    headerProps: PropTypes.object,
    withIndex: PropTypes.number
}
GTable.defaultProps = defaultProps


export default class GantTable<T> extends React.Component<GantTableListOuterProps<T>>{
    render() {
        return (<GTable {...this.props} />)
    }
}