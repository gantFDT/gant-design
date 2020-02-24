import React from 'react'
import classnames from 'classnames'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ConfigContext } from '../config-provider'
import Column from './Column'
export const TaskBoardContext = React.createContext({} as ContextProps)
import './index.less'

type Data = {
    [prop: string]: any
}

export interface ContextProps {
    prefixCls?: string,
    idKey?: string,
    titleKey?: string,
    childrenKey?: string,
    taskNameKey?: string,
    hightLightWords?: string,
    renderHeader?: (column: any) => React.ReactNode,
    renderExtra?: (column: any) => React.ReactNode,
    renderItem?: (task: any, column: any) => React.ReactNode,
    highlightTasksBy?: (keywords: string, task: any) => boolean,
    handleAddBtn?: (column: any) => void,
}
export interface TaskBoardProps extends ContextProps {
    dataSource: Data[],
    className?: string,
    hideQuickAdd?: boolean,
    isColumnDragDisabled?: boolean,
    isColumnDropDisabled?: boolean,
    isTaskDragDisabled?: boolean,
    isTaskDropDisabled?: boolean,
    onBeforeDragStart?: (result) => void,
    onDragStart?: (result) => void,
    onDragUpdate?: (result) => void,
    onDragEnd: (result) => void
}

const ColumnsList = React.memo((props: any) => <Column {...props} />)

const TaskBoard = (props: TaskBoardProps) => {
    const {
        prefixCls: customizePrefixCls,
        dataSource,
        className,
        idKey,
        titleKey,
        childrenKey,
        taskNameKey,
        hightLightWords,
        isColumnDropDisabled,
        renderHeader,
        renderExtra,
        renderItem,
        highlightTasksBy,
        handleAddBtn,
        onBeforeDragStart,
        onDragStart,
        onDragUpdate,
        onDragEnd,
        ...nextProps
    } = props

    const ContextValue = {
        renderHeader, renderExtra, renderItem,
        highlightTasksBy, handleAddBtn,
        idKey, titleKey, childrenKey, taskNameKey,
        hightLightWords
    }

    return <ConfigContext.Consumer>
        {({ getPrefixCls }) => {
            const prefixCls = getPrefixCls('taskboard', customizePrefixCls)
            return <TaskBoardContext.Provider value={{ ...ContextValue, prefixCls }}>
                <DragDropContext
                    onBeforeDragStart={onBeforeDragStart}
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                    onDragEnd={onDragEnd}
                >
                    <Droppable
                        droppableId='all-columns'
                        direction='horizontal'
                        type='column'
                        isDropDisabled={isColumnDropDisabled}
                    >
                        {(provided) => (
                            <div className={classnames(prefixCls, className)}>
                                <div
                                    className={prefixCls + '-drag-drop-content'}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {dataSource.map((item, key) => {
                                        return <ColumnsList
                                            key={key}
                                            index={key}
                                            column={item}
                                            tasks={item[childrenKey]}
                                            {...nextProps}
                                        />
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </TaskBoardContext.Provider>
        }}
    </ConfigContext.Consumer>
}
TaskBoard.defaultProps = {
    dataSource: [],
    className: '',
    hightLightWords: '',
    idKey: 'id',
    titleKey: 'title',
    childrenKey: 'children',
    taskNameKey: 'name',
    hideQuickAdd: false,
    isColumnDragDisabled: false,
    isColumnDropDisabled: false,
    isTaskDragDisabled: false,
    isTaskDropDisabled: false,
    onBeforeDragStart: _ => _,
    onDragStart: _ => _,
    onDragUpdate: _ => _,
    onDragEnd: _ => _,
}
export default TaskBoard