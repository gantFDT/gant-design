import React from 'react';
import Task from './Task';
import propTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import _ from 'lodash';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class InnerTasksList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps)
    }
    render() {
        const { tasks, ...nextProps } = this.props;
        if (_.isEmpty(tasks)) return null;
        return tasks.map((task, key) => <Task
            key={key}
            task={task}
            index={key}
            {...nextProps}
        />)
    }
}
export default class Column extends React.Component {
    static contextTypes = {
        renderHeader: propTypes.func,
        renderExtra: propTypes.func,
        handleAddBtn: propTypes.func,
    }
    render() {
        const {
            column,
            tasks,
            idKey,
            titleKey,
            index,
            prefixCls,
            hideQuickAdd,
            isColumnDragDisabled,
            isTaskDropDisabled,
            ...nextProps
        } = this.props;
        const { renderHeader, renderExtra, handleAddBtn } = this.context;
        return (
            <Draggable
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
                                        <InnerTasksList tasks={tasks} column={column} idKey={idKey} prefixCls={prefixCls} {...nextProps} />
                                        {provided.placeholder}
                                        {!hideQuickAdd && <div
                                            className={prefixCls + '-quick-add'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddBtn && handleAddBtn(column);
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
        )
    }
}

