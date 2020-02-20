import React, { useContext, memo } from 'react'
import Task from './Task'
import { Icon, Tooltip } from 'antd'
import { isEqual, isEmpty } from 'lodash'
import { TaskBoardContext } from './index'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps)

const InnerTasksList = (props) => {
    const { tasks, ...nextProps } = props
    if (isEmpty(tasks)) return null
    return tasks.map((task, key) => <Task
        key={key}
        task={task}
        index={key}
        {...nextProps}
    />)
}

const TaskList = memo(InnerTasksList, areEqual)

const Column = (props) => {
    const {
        column,
        tasks,
        index,
        hideQuickAdd,
        isColumnDragDisabled,
        isTaskDropDisabled,
        ...nextProps
    } = props
    const { prefixCls, renderHeader, renderExtra, handleAddBtn, idKey, titleKey } = useContext(TaskBoardContext)

    return <Draggable
        index={index}
        draggableId={column[idKey]}
        isDragDisabled={isColumnDragDisabled}
    >
        {(provided, snapshot) => (
            <div
                className={prefixCls + '-column-wrapper'}
                ref={provided.innerRef}
                {...provided.draggableProps}
            >
                <div
                    className={prefixCls + '-column-container'}
                    style={{
                        boxShadow: `${snapshot.isDragging ? 'rgba(0, 0, 0, 0.2) 2px 2px 1px' : ''}`,
                    }}
                >
                    <div {...provided.dragHandleProps}>
                        {renderHeader === null ? null :
                            renderHeader ? renderHeader(column) :
                                <div className={prefixCls + '-column-header-wrapper'}>
                                    <Tooltip title={column[titleKey]} mouseEnterDelay={0.3} placement="topLeft">
                                        <div className={prefixCls + '-column-header-title'}>
                                            {column[titleKey]}{tasks && tasks.length > 0 ? `(${tasks.length})` : null}
                                        </div>
                                    </Tooltip>
                                    <div className={prefixCls + '-column-header-extra'}>
                                        {renderExtra && renderExtra(column)}
                                    </div>
                                </div>
                        }
                    </div>
                    <Droppable
                        droppableId={column[idKey]}
                        type='task'
                        isDropDisabled={isTaskDropDisabled}
                    >
                        {(provided, snapshot) => (
                            <div
                                className={prefixCls + '-task-drop-inner'}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <TaskList tasks={tasks} column={column} {...nextProps} />
                                {provided.placeholder}
                                {!hideQuickAdd && <div
                                    className={prefixCls + '-quick-add'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddBtn && handleAddBtn(column)
                                    }}>
                                    <Icon type="plus" />
                                </div>}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        )}
    </Draggable>
}
export default Column