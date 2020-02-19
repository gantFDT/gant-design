import React from 'react';
import propTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import './index.less';

export default class Task extends React.Component {
    static contextTypes = {
        renderItem: propTypes.func,
    }
    highlightTasksBy = (keywords, task) => {
        return task[this.props.taskNameKey].indexOf(keywords) < 0;
    }
    render() {
        const {
            task,
            prefixCls,
            column,
            index,
            idKey,
            taskNameKey,
            hightLightWords,
            isTaskDragDisabled
        } = this.props;
        const { renderItem, highlightTasksBy } = this.context;
        let fn = highlightTasksBy || this.highlightTasksBy;
        return (
            <Draggable
                draggableId={task[idKey]}
                index={index}
                isDragDisabled={isTaskDragDisabled}
            >
                {(provided, snapshot) => (
                    <div
                        className={prefixCls + '-task-container-wrapper'}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div
                            className={prefixCls + '-task-container'}
                            style={{
                                boxShadow: `${snapshot.isDragging ? 'rgba(0, 0, 0, 0.2) 2px 2px 1px' : ''}`,
                                opacity: hightLightWords && fn(hightLightWords, task) ? 0.4 : 1
                            }}
                        >
                            {renderItem ? renderItem(task, column) : <div style={{ padding: 8 }}>{task[taskNameKey]}</div>}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}
