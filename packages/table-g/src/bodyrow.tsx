import React, { useMemo, useContext, useEffect, useCallback, useState } from 'react'
import classnames from 'classnames'
import { get } from 'lodash'
import { Draggable } from "react-beautiful-dnd";

import { ConfigConsumer } from '@gantd/config-provider'
import { RowContext, TableContext } from './context'
import { setStyle } from './_utils'

const BodyRow = ({ isDeleted, rowIndex, className, sortable, children, ...props }) => {
    const rowData = useMemo(() => ({ dataRowKey: props['data-row-key'] }), [props])

    const [trRef, setTrRef] = useState(null)
    const row = useMemo(() => {
        // 非拖动排序
        if (!sortable) {
            return (
                <ConfigConsumer>
                    {
                        ({ getPrefixCls }) => (
                            <tr
                                {...props}
                                className={classnames(className, { [getPrefixCls('table-row-deleted')]: isDeleted })}
                            >
                                {children}
                            </tr>
                        )
                    }
                </ConfigConsumer>
            )
        }
        return (
            <Draggable key={rowIndex} draggableId={`dragrow${rowIndex}`} index={rowIndex} >
                {
                    (provided, snapshot) => {
                        const style = {
                            ...(props.style || {}),
                            ...provided.draggableProps.style,
                        }
                        if (snapshot.isDragging) {
                            style.display = 'table';
                            style.tableLayout = 'fixed';
                            style.borderSpacing = 0
                            const table = trRef.parentElement.parentElement;
                            const cols = table.querySelectorAll("colgroup col");
                            ([...trRef.cells]).forEach((td, index) => {
                                setStyle(td, cols[index].style.cssText)
                            })
                        }
                        return (
                            <ConfigConsumer>
                                {
                                    ({ getPrefixCls }) => (
                                        <tr
                                            {...props}
                                            ref={(tr) => {
                                                provided.innerRef(tr)
                                                setTrRef(tr)
                                            }}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={style}
                                            className={classnames(className, { [getPrefixCls('table-row-deleted')]: isDeleted })}
                                        >
                                            {children}
                                            {provided.placeholder}
                                        </tr>
                                    )
                                }
                            </ConfigConsumer>
                        )
                    }
                }

            </Draggable>
        )
    }, [isDeleted, rowIndex, className, sortable, children, trRef])

    return (
        <RowContext.Provider value={rowData}>{row}</RowContext.Provider>
    )
}

export default BodyRow