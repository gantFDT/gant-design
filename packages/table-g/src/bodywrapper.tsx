import React, { useContext } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { TableBodyWrapperContext } from './context'

const BodyWrapper = ({ children, ...props }) => {
    const { onDragEnd } = useContext(TableBodyWrapperContext)

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Droppable droppableId='droppable'>
                {
                    (provided, snapshot) => {
                        return (
                            <tbody {...props} ref={provided.innerRef} {...provided.droppableProps}>
                                {children}
                                {provided.placeholder}
                            </tbody>
                        )
                    }
                }
            </Droppable>
        </DragDropContext>
    )
}

export default BodyWrapper
