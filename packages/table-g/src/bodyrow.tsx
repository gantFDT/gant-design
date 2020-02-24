import React, { useMemo, useState, useContext } from 'react'
import classnames from 'classnames'
import { Draggable } from "react-beautiful-dnd";

import { RowContext, TableContext } from './context'
import { setStyle } from './_utils'

const getPrefixCls = (cls) => 'gant' + cls;

const BodyRow = ({ isDeleted, rowIndex, className, sortable, children, ...props }) => {
    const rowData = useMemo(() => ({ dataRowKey: props['data-row-key'] }), [props])

    const { outlineNum, thresholdInner, renderRowKeys } = useContext(TableContext)
    const keysRange = renderRowKeys.slice(outlineNum, outlineNum + thresholdInner)
    const style = useMemo(() => {
        const s = props.style || {}
        if (!keysRange.includes(rowData.dataRowKey)) {
            return { ...s, display: 'none' }
        }
        return s
    }, [props.style, keysRange, rowData])
    const [trRef, setTrRef] = useState(null)
    const row = useMemo(() => {
        // 非拖动排序
        if (!sortable) {
            return (
                <tr
                    {...props}
                    style={style}
                    className={classnames(className, { [getPrefixCls('table-row-deleted')]: isDeleted })}
                >
                    {children}
                </tr>
            )
        }
        return (
            <Draggable key={rowIndex} draggableId={`dragrow${rowIndex}`} index={rowIndex} >
                {
                    (provided, snapshot) => {
                        const dragStyle = {
                            ...(style || {}),
                            ...provided.draggableProps.style,
                        }
                        if (snapshot.isDragging) {
                            dragStyle.display = 'table';
                            dragStyle.tableLayout = 'fixed';
                            dragStyle.borderSpacing = 0
                            const table = trRef.parentElement.parentElement;
                            const cols = table.querySelectorAll("colgroup col");
                            ([...trRef.cells]).forEach((td, index) => {
                                setStyle(td, cols[index].style.cssText)
                            })
                        }
                        return (
                            <tr
                                {...props}
                                ref={(tr) => {
                                    provided.innerRef(tr)
                                    setTrRef(tr)
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={dragStyle}
                                className={classnames(className, { [getPrefixCls('table-row-deleted')]: isDeleted })}
                            >
                                {children}
                                {provided.placeholder}
                            </tr>
                        )
                    }
                }

            </Draggable>
        )
    }, [isDeleted, rowIndex, className, sortable, children, trRef, style])

    return (
        <RowContext.Provider value={rowData}>{row}</RowContext.Provider>
    )
}

export default BodyRow