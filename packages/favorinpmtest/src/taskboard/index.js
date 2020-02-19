import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ConfigConsumer } from '../config-provider';
import Column from './Column';
import './index.less'

class InnerColumnsList extends React.PureComponent {
    render() {
        const { ...nextProps } = this.props;
        return <Column {...nextProps} />
    }
}

export default class TaskBoard extends Component {
    static propTypes = {
        dataSource: propTypes.array,
        className: propTypes.string,
        hideQuickAdd: propTypes.bool,
        idKey: propTypes.string,
        titleKey: propTypes.string,
        childrenKey: propTypes.string,
        taskNameKey: propTypes.string,
        hightLightWords: propTypes.string,
        isColumnDragDisabled: propTypes.bool,
        isColumnDropDisabled: propTypes.bool,
        isTaskDragDisabled: propTypes.bool,
        isTaskDropDisabled: propTypes.bool,
        onBeforeDragStart: propTypes.func,
        onDragStart: propTypes.func,
        onDragUpdate: propTypes.func,
        onDragEnd: propTypes.func,
    }

    static defaultProps = {
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

    static childContextTypes = {
        renderHeader: propTypes.func,
        renderExtra: propTypes.func,
        renderItem: propTypes.func,
        highlightTasksBy: propTypes.func,
        handleAddBtn: propTypes.func,
    }
    getChildContext() {
        return {
            renderHeader: this.props.renderHeader,
            renderExtra: this.props.renderExtra,
            renderItem: this.props.renderItem,
            highlightTasksBy: this.props.highlightTasksBy,
            handleAddBtn: this.props.handleAddBtn
        }
    }

    renderWithConfigConsumer = ({ getPrefixCls }) => {
        const {
            dataSource,
            className,
            childrenKey,
            isColumnDropDisabled,
            onBeforeDragStart,
            onDragStart,
            onDragUpdate,
            onDragEnd,
            ...nextProps
        } = this.props;
        const prefixCls = getPrefixCls('taskboard');
        return (<DragDropContext
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
                                return <InnerColumnsList
                                    key={key}
                                    index={key}
                                    column={item}
                                    tasks={item[childrenKey]}
                                    prefixCls={prefixCls}
                                    {...nextProps}
                                />
                            })}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>)
    }

    render() {
        return (
            <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
        )
    }
}