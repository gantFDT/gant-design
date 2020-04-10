import React, { useEffect, useState, useMemo, useCallback, useRef, } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table, Form, Pagination, Empty } from 'antd'
import { TableProps, TableEventListeners, TableRowSelection, ColumnProps } from 'antd/lib/table'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { PaginationConfig as AntPaginationConfig } from 'antd/lib/pagination'
import { compose } from 'recompose'
import _ from 'lodash'
import * as math from 'mathjs'

import warning from '@util/warning'
import {
    renderColumnItem,
    useRowSelection,
    getStorageWidth,
    switchIndex,
    usePagination,
    setMainTableBorder,
    diffList,
    setStyle,

    computeIndexAndRowKey,
    getComputedColIndex,
    computeIndex,
    getVirtualList,
    getPureRecord,
    cloneDatasource,
    getStyleText,
    originKey
} from './_utils'
import Header from '@header'
import { EditStatus } from '@data-cell'

import TableComponent from './tableRef'
import BodyCell from './bodycell'
import BodyRow from './bodyrow'
import BodyWrapper from './bodywrapper'
import HeaderCell from './headercell'
import HeaderRow from './headerrow'
import { DataContext, TableContext, TableBodyWrapperContext } from './context'
import { tableWrapperRef, scrollIntoViewWithRowKey } from './compose'

const defaultKey = "key"

type Direction = 'row' | 'row-reverse'

const defaultProps = {
    bordered: true,
    columns: [],
    dataSource: [],
    pagination: null,
    resizable: true,
    headerMarginBottom: 10,
    rowSelection: null,
    isZebra: true, // 斑马纹
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
}
export type Order = { fieldName: string, orderType: string }

export type Record = {
    children?: Record[],
    isDeleted?: boolean,
    [key: string]: any
}

export type RowKey<T> = (record: T, index?: number) => string

export type ProtoExtends<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>
}

export type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>

// 重写RowSelection类型
export type RowSelection<T> = ProtoExtends<TableRowSelection<T>, {
    selectedRowKeys: string[],
    onSelect?: (rows: Array<T>, selected: boolean) => void,
    preventDefault?: boolean,
    clickable?: boolean,
    showFooterSelection?: boolean,
}>

export type EditRender<T = any> = (value: string, record: T, rowIndex: number) => React.ReactElement

export type EditConfig<T> = {
    render: EditRender<T>,
    showDirt?: boolean,
    editValue?: string | ((record: T, rowIndex: number, dataIndex: string) => string),
    clickable?: boolean | ((record: T, rowIndex: number, dataIndex: string) => boolean)
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

export type PaginationConfig = AntPaginationConfig | null | false


export interface RowHeight<T> {
    (index: number, Record: T): number | string,
}
export interface VirtualScroll<T> {
    threshold?: number, // 单页显示的行数
    rowHeight?: number | string, //| RowHeight<T>,
    center?: boolean
}

const defaultVirtualScrollConfig: VirtualScroll<any> = {
    threshold: 20,
    rowHeight: 24,
    center: true,
}

// 定义GantTableProps基础类型
interface Props<T extends Record> {
    cellPadding: React.ReactText,
    dataSource: T[],
    columns: GColumnProps<T>[],
    editActions: EditActions<T>,
    emptyDescription: React.ReactNode,
    flex?: boolean,
    footerDirection: Direction,
    headerLeft: React.ReactElement,
    headerMarginBottom: number,
    headerRight: React.ReactNode,
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
    onScroll: Function,
    // deprecated
    // resizeCell: boolean,
    virtualScroll: VirtualScroll<T> | true,
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
export type ScrollElement = HTMLElement & {
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
        orderList,
        light,
        spacing,
        cellPadding,
        onSave,
        expandedRowKeys,
        onExpand,
        onExpandedRowsChange,
        headerRight,
        editActions,
        tableWraper,
        withIndex,
        virtualScroll: virtualScrollConfig,
        resizable: resizeCell,
        onScroll,
        defaultExpandAllRows
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
    const computedRowKey: RowKey<T> = useCallback(
        (record, index) => {
            if (!record) return index
            const recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey || defaultKey];
            return recordKey === undefined ? index : recordKey
        }, [rowKey]
    )

    const scrollY = useMemo<string | number>(() => _.get(scroll, 'y') as string | number, [scroll])
    // 有子节点禁用排序功能
    //#region
    // 是否是树形结构
    const isTree: boolean = useMemo(() => dataSource.some(item => _.get(item, 'children.length')), [dataSource])
    // 树状结构或者编辑状态下 禁止拖拽
    const sortable = useMemo(() => isTree ? false : !!props.onDragEnd, [isTree, props.onDragEnd])
    const [lock, setLock] = useState(true) // 控制onSave回调

    const isEdit = useMemo(() => editable === EditStatus.EDIT, [editable])
    // level-1层数据复制dataSource，防止数据污染
    const dataList = useMemo(() => _.cloneDeep(dataSource), [dataSource])
    // level-1层数据，编辑时数据
    const [cacheDataList, setCacheDataList] = useState([])
    useEffect(() => {
        // edit状态下打开锁，其他状态不变
        if (isEdit) {
            setLock(false)
        }
        setCacheDataList(list => {
            if (isEdit) {
                return cloneDatasource(dataList)
            }
            return []
        })
    }, [dataList, isEdit])

    //#endregion
    // 处理表格columns，可能有嵌套头部    
    //#region
    const [columns, setColumns] = useState(props.columns);
    useEffect(() => {
        setColumns(props.columns)
    }, [props.columns])

    // 展开的expandedRowKeys
    const [expandRowKeys, setexpandRowKeys] = useState([])
    useEffect(() => {
        if (Array.isArray(expandedRowKeys)) {
            setexpandRowKeys(expandedRowKeys)
        }
    }, [expandedRowKeys])

    // 是否触发虚拟滚动
    const virtualScroll = useMemo(() => !!(scrollY && virtualScrollConfig), [scrollY, virtualScrollConfig])
    const virtualScrollConfigInner = useMemo<VirtualScroll<T>>(() => (virtualScroll ? virtualScrollConfig === true ? defaultVirtualScrollConfig : { ...defaultVirtualScrollConfig, ...virtualScrollConfig } : {} as VirtualScroll<T>), [virtualScroll, virtualScrollConfig])
    // 虚拟滚动的条数
    const thresholdInner = useMemo(() => _.get(virtualScrollConfigInner, 'threshold', defaultVirtualScrollConfig.threshold), [virtualScrollConfigInner])

    /**
     * level-2层数据
     * 根据是否编辑获取数据列表
     * 同时添加g-index序号，获取所有可展开rowKey
     * 编辑状态下会有__origin属性
     */
    const [dataListWithIndex, expandableRowKeys] = useMemo(() => {
        const list = isEdit ? cacheDataList : dataList;
        return computeIndexAndRowKey<T>(list, computedRowKey)
    }, [isEdit, cacheDataList, dataList, computedRowKey])

    useEffect(() => {
        // 默认打开所有子菜单
        if (defaultExpandAllRows && _.isUndefined(expandedRowKeys)) {
            setexpandRowKeys(expandableRowKeys)
        }
    }, [])
    /**
     * 虚拟滚动的相关数据
     */
    const [outlineNum, setOutLineNum] = useState(0)
    /**
     * level-2层数据
     * 总数据、实际要渲染的rowkeys，用这个数据计算实际高度
     * 通过复制dataListWithIndex数据计算，因为在虚拟滚动下要刨除掉children，但是不能影响源数据
     */
    const [renderListAll, renderRowKeys, tilingListAll] = useMemo(() => {
        if (dataListWithIndex.length === 0) return [[], [], []]
        return computeIndex<T>(dataListWithIndex, expandRowKeys, virtualScroll)
    }, [dataListWithIndex, expandRowKeys])
    // 单元格padding和border高度
    const padddingBorder = useMemo(() => 2 * parseInt(cellPadding as string) + 1, [cellPadding])

    // dom高度
    const originRowHeight = useMemo(() => {
        let height = parseInt(virtualScrollConfigInner.rowHeight as string)
        if (rowSelection) {
            height = Math.max(height, 20 + padddingBorder)
        }
        if (isTree) {
            return Math.max(height, 18 + padddingBorder)
        }
        return height || 0
    }, [virtualScrollConfigInner, isTree, padddingBorder, rowSelection])
    // 行高
    // 对单元格中的选择框和树状结构的展开按钮有影响
    const originLineHeight = useMemo(() => {
        if (virtualScroll && virtualScrollConfigInner.center) {
            return (originRowHeight - padddingBorder) + 'px'
        }
    }, [virtualScrollConfigInner, padddingBorder, virtualScroll])
    // 计算滚动比例
    const rate = useMemo(() => math.ceil(math.chain(renderRowKeys.length).multiply(originRowHeight).divide(3e+7).done()), [renderRowKeys, originRowHeight])
    // 逻辑上的行高，包括border
    const rowHeight = useMemo(() => originRowHeight / rate + 1, [originRowHeight, rate])
    const mainHeight = useMemo(() => renderRowKeys.length * rowHeight, [renderRowKeys, rowHeight])
    // 最终渲染的数据
    const renderList = useMemo(() => {
        let list = renderListAll
        if (virtualScroll) {
            list = getVirtualList(outlineNum, thresholdInner, renderRowKeys, tilingListAll)
        }
        return list
    }, [virtualScroll, outlineNum, renderRowKeys, tilingListAll])
    //#endredion
    const minHeight = useMemo(() => renderList.length > 0 ? scrollY : undefined, [scrollY, renderList])
    const storageWidth = useMemo(() => getStorageWidth(tableKey)['table'] || _.get(scroll, 'x') || '100%', [tableKey])
    const headerFixed = useMemo(() => !_.isUndefined(scrollY), [scrollY])
    const bordered = useMemo(() => light ? false : customBorderd, [light, customBorderd])
    // 当展开项发生变化的时候主动触发table的更新，去重新计算滚动条
    const [emitReCompute, setEmitReCompute] = useState(0)


    // 业务层修改editable状态的时候，计算修改前后数据的
    useEffect(() => {
        if (editable === EditStatus.SAVE && !lock) {
            // 保存之后，锁上保证下次更新不会再次进入
            setLock(true)
            console.time('计算diff')
            const diffData = diffList(dataList, cacheDataList, isTree)
            console.timeEnd('计算diff')
            onSave(_.cloneDeep(cacheDataList), diffData)
        }
    }, [editable, dataList, cacheDataList, isTree, lock])
    //行选择
    //#region
    const [computedRowSelection, setselectedRowKeys, footerselection] = useRowSelection(rowSelection, dataListWithIndex, bordered)
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
    const onscroll = useCallback(_.debounce<any>((e) => {
        // 编辑状态下不触发whell事件
        if (!onScroll || isEdit) return
        if (e.type === 'wheel') {
            // 向下滚动，视图上移
            if (e.deltaY > 0) {
                onScroll()
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
                        onScroll()
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
    }, 50), [onScroll, isEdit])

    const [tableGroup] = useState(new Map<string, HTMLTableElement>())
    /**
     * 计算虚拟滚动误差
     * 平均每滚动多少条要修正误差
     */
    const scrollError = useMemo(() => {
        if (scrollY) {
            // 最后一屏之前渲染的条数
            const leave = renderRowKeys.length - thresholdInner
            // 最大滚动高度
            const maxScroll = mainHeight - parseInt(scrollY as string)
            // 最多滚动多少条
            const maxScrollLength = Math.floor(maxScroll / rowHeight)
            // 偏差条数
            const error = leave - maxScrollLength
            if (error > 0) {
                return Math.floor(maxScrollLength / error)
            }
        }
        return 0
    }, [mainHeight, scrollY, renderRowKeys, thresholdInner, rowHeight])
    /**
     * 虚拟滚动
     */
    const onVScroll = useCallback((e) => {
        const { scrollTop } = e.currentTarget
        const outTopLinevir = Math.floor(scrollTop / rowHeight); // 用于计算table的位置
        // 校正移动的条数，修正设置的值，防止在rate不为1的情况下，出现数据遗漏的问题
        const outTopLine = outTopLinevir + (scrollError > 0 ? Math.floor(outTopLinevir / scrollError) : 0)
        // 设置数据
        setOutLineNum(outTopLine)
        // 实际渲染的高度
        // td有个border-bottom，要加1
        const domHeight = thresholdInner * rowHeight * rate
        const outTopHeight = outTopLinevir * rowHeight
        let top = Math.max(0, Math.min(mainHeight - domHeight, outTopHeight))

        tableGroup.forEach(table => setStyle(table, `transform: translate(0, ${top}px)`))
        // const table = tableGroup.get('bodyTable')
        // setStyle(table, `transform: translate(0, ${top}px)`)
        // e.preventDefault()
    }, [thresholdInner, rowHeight, renderRowKeys, rate, mainHeight, tableGroup, scrollError])

    // 绑定滚动事件
    const bindScroll = useCallback(
        () => {
            // if (tableWraper && _.isEmpty(computedPagination)) {
            if (tableWraper) {
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
                style: React.CSSProperties
            }
            let headerCellProps: cellProps = {
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
            // 修正rowIndex值
            const computedRowIndex = rowIndex + outlineNum
            // 虚拟滚动或者带有固定列的表格不换行
            // 根据是否有固定列，以及是否是虚拟滚动来控制文本是否折行
            const cWrap = (virtualScroll || hasFixed) ? false : wrap
            const style: React.CSSProperties = { width: col.width }
            if (!cWrap) {
                // 防止折行模式下，被内容撑出
                // 如果有maxWidth，会有出现缩小单元格时内容在单元格外的异常
                style.maxWidth = col.width
            }
            let defaultCellProps = {
                style,
                wrap: cWrap,
                light,
                record: { ...record },
                sortable,
                rowIndex: computedRowIndex,
                dataIndex,
                cellPadding,
                editConfig: {},
            }
            if (cellEditable) defaultCellProps.editConfig = editConfig
            if (originOnCell) {
                return { ...defaultCellProps, ...originOnCell(record, computedRowIndex) }
            }
            return defaultCellProps
        },
        [wrap, light, sortable, tableKey, cellPadding, headerFixed, virtualScroll, outlineNum],
    )


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
                col.onCell = (record, rowIndex) => onCell(col, record, rowIndex + outlineNum, { hasFixed, originOnCell })
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
        [onHeaderCell, onCell, tableKey, withIndex, outlineNum]
    )
    //#endregion

    // 处理表格行删除线
    const onRow = useCallback(
        (record, index) => {
            const pureRecord = getPureRecord(record)
            type OptialProps = Partial<{
                onClick: (e: React.MouseEvent) => void
            }>

            interface onRowProps extends OptialProps {
                isDeleted: boolean,
                rowIndex: number,
                sortable: boolean,
                originRecord?: T
            }
            const rowIndex = index + outlineNum

            const defaultRowProps: onRowProps = {
                isDeleted: record.isDeleted,
                rowIndex,
                sortable
            }
            if (isEdit) {
                defaultRowProps.originRecord = record[originKey]
            }
            let originListener: TableEventListeners = {}
            if (originOnRow) {
                originListener = originOnRow(pureRecord, rowIndex)
            }
            if (_.get(rowSelection, 'clickable')) {
                const getCheckBoxProps = _.get(rowSelection, 'getCheckboxProps')
                let checkable = true
                if (getCheckBoxProps && typeof getCheckBoxProps === 'function') {
                    const boxProps = getCheckBoxProps(pureRecord)
                    checkable = !_.get(boxProps, 'disable')
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
        [sortable, setselectedRowKeys, rowSelection, outlineNum]
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
                    row: HeaderRow,
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
    const tableColumns = useMemo(() => convertColumns(columns), [columns, convertColumns, orderList])
    // dataIndex的索引
    const computedColIndex = useMemo(() => getComputedColIndex(tableColumns), [tableColumns])

    const expandIconColumnIndex = useMemo(() => {
        let index = 0
        index = Math.max(tableColumns.findIndex(item => item.expandColumn), 0)

        return computedRowSelection ? index + 1 : index
    }, [tableColumns, computedRowSelection])

    // 缺省显示
    const emptyText = useMemo(() => {
        return (
            <div className="gant-align-center" style={{ height: scrollY }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={props.emptyDescription} />
            </div>
        )
    }, [scrollY, props.emptyDescription])

    // 展开变化,触发重新计算滚动相关数据
    const expandedRowsChange = useCallback(
        (expandedRowKeys: string[] | number[]) => {
            setEmitReCompute(e => e + 1)
        },
        [],
    )

    const expand = useCallback(
        (expanded, record) => {
            let rowkey = expandRowKeys
            const key = record["g-row-key"];
            if (expanded) {
                rowkey = [...expandRowKeys, key]
            } else {
                // row was collapse
                const expandedRowIndex = expandRowKeys.indexOf(key);
                if (expandedRowIndex !== -1) rowkey = [...expandRowKeys.slice(0, expandedRowIndex), ...expandRowKeys.slice(expandedRowIndex + 1)]
            }
            setexpandRowKeys(rowkey)
            if (onExpandedRowsChange) {
                onExpandedRowsChange(rowkey)
            }
            if (onExpand) {
                const pureRecord = getPureRecord<T>(record)
                onExpand(expanded, pureRecord)
            }
        },
        [onExpandedRowsChange, onExpand, expandRowKeys],
    )

    // 劫持headerRight 
    let headerRightElement = useMemo(() => {
        let actions = null
        if (isEdit && typeof editActions === 'function') {
            const keys = computedRowSelection ? (computedRowSelection.selectedRowKeys || []) : []
            actions = editActions([cacheDataList, setCacheDataList], keys)
        }
        return (
            <>
                {actions}
                {headerRight}
            </>
        )
    }, [isEdit, editActions, cacheDataList, headerRight, computedRowSelection])
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
        computedRowSelection,
        originRowHeight,
        originLineHeight,
    }), [isTree, cellPadding, cacheDataList, editable, computedColIndex, computedRowSelection, originRowHeight, originLineHeight])

    const tableContextValue = useMemo(() => ({
        light,
        spacing,
        dataSource,     // 滚动加载的时候触发更新header的overflow
        emitReCompute, // 展开的时候触发更新header的overflow
        headerFixed,
        tableColumns,
        onResize,
        virtualScroll,
        mainHeight,
        tableGroup,
        outlineNum,
        thresholdInner,
        renderRowKeys,
        storageWidth,
        scrollY,
    }), [light, spacing, dataSource, emitReCompute, tableColumns, headerFixed, onResize, virtualScroll, mainHeight, tableGroup, outlineNum, thresholdInner, renderRowKeys, storageWidth, scrollY])


    const bodyWrapperContext = useMemo(() => ({ onDragEnd }), [onDragEnd])
    const style = useMemo(() => {
        const s = { ...(props.style || {}) }
        s['--padding'] = getStyleText(cellPadding)
        s['--lineHeight'] = getStyleText(originLineHeight)
        return s
    }, [props.style, cellPadding, originLineHeight])

    const getPrefixCls = (cls) => 'gant-' + cls;
    const renderTable = () => {
        const {
            pagination,
            title = '',
            className,
            headerLeft,
            headerMarginBottom,
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
        return (
            <>
                {(title || headerRightElement || headerLeft) && (
                    <Header
                        title={title}
                        {...headerProps}
                        beforeExtra={headerLeft}
                        extra={headerRightElement}
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
                                expandedRowKeys={expandRowKeys}
                                onExpandedRowsChange={expandedRowsChange}
                                onExpand={expand}
                                bordered={bordered}
                                dataSource={renderList}
                                onRow={onRow}
                                // rowKey={computedRowKey}
                                rowKey='g-row-key'
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
                                style={style}
                            />
                        </TableBodyWrapperContext.Provider>
                    </TableContext.Provider>
                </DataContext.Provider>
            </>
        )
    }
    return (
        <div ref={ref}>
            {renderTable()}
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
    resizable: PropTypes.bool,
    headerLeft: PropTypes.element,
    headerRight: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    headerMarginBottom: PropTypes.number,
    isZebra: PropTypes.bool,
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
    onScroll: PropTypes.func,
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