import '@packages/gantd/src/task-board/style';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code';
import _ from 'lodash';
/*! Start !*/
import React, { useState } from 'react'
import { Input, Button, Radio, Icon, Tooltip, Avatar } from 'antd'
import { TaskBoard } from '@gantd'
const Search = Input.Search;
const data = [
    {
        title: '卡片1',
        id: 'col1',
        children: [
            {
                name: 'task-1',
                id: '1',
            }, {
                name: 'task-2',
                id: '2',
            }
        ]
    }, {
        title: '卡片2',
        id: 'col2',
        children: []
    },
];
/*! Split !*/
function BasicUse() {
    const [hideAddBtn, setHide] = useState(false);
    const [columnKey, setColumn] = useState('default');
    const [taskKey, setTask] = useState('default');

    const customTaskContent = (task) => (
        <div style={{ padding: 8, borderLeft: '3px solid red' }}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
            <div>custom-task-content of {task.name}</div>
        </div>
    );
    return (<div>
        <div style={{ marginBottom: 10 }}>
            <Radio.Group value={columnKey} onChange={(e) => { setColumn(e.target.value) }}>
                <Radio.Button value="default">默认header</Radio.Button>
                <Radio.Button value="extra">自定义extra</Radio.Button>
                <Radio.Button value="custom">自定义header</Radio.Button>
                <Radio.Button value="none">无header</Radio.Button>
            </Radio.Group>
        </div>
        <div style={{ marginBottom: 10 }}>
            <Radio.Group value={taskKey} onChange={(e) => { setTask(e.target.value) }}>
                <Radio.Button value="default">默认task内容</Radio.Button>
                <Radio.Button value="custom">自定义task内容</Radio.Button>
            </Radio.Group>
        </div>
        <Button onClick={() => { setHide(!hideAddBtn) }}>
            {hideAddBtn ? '显示' : '隐藏'}-快速新增按钮
        </Button>
        <TaskBoard
            style={{height:1500}}
            dataSource={data}
            hideQuickAdd={hideAddBtn}
            handleAddBtn={(column) => {
                console.log('click add btn now!,column info=', column);
            }}
            renderHeader={columnKey == 'custom' ?
                (column) => (<div style={{ backgroundColor: 'aquamarine' }}>custom header of {column.title}</div>)
                : columnKey == 'none' ? null : undefined}
            renderExtra={columnKey == 'extra' ?
                () => (<Tooltip title='菜单'>
                    <Icon type='dash' style={{ cursor: 'pointer' }} />
                </Tooltip>)
                : undefined}

            renderItem={taskKey == 'custom' ? customTaskContent : undefined}
        />
    </div>)
}
/*! Split !*/
function HightLightUse() {
    const [keywords, setKeyWords] = useState('');
    return (
        <div>
            <Search
                placeholder="输入关键字"
                onSearch={(value) => setKeyWords(value)}
                style={{ width: 600 }}
            />
            <TaskBoard
                dataSource={data}
                hightLightWords={keywords}
            />
        </div>
    )
}
/*! Split !*/
function DragDropUse() {
    const [columnKey, setColumn] = useState('default');
    const [dragDropData, setData] = useState([{
        title: '拖拽1',
        id: 'column_1',
        children: [
            {
                name: '任务-1',
                id: '1',
            }, {
                name: '任务-2',
                id: '2',
            },
            {
                name: '任务-3',
                id: '3',
            }
        ]
    }, {
        title: '拖拽2',
        id: 'column_2',
        children: []
    }]);
    function onBeforeDragStart(result) {
        console.log('拖拽开始前=', result)
    };
    function onDragStart(result) {
        console.log('开始拖拽=', result)
    };
    function onDragUpdate(result) {
        console.log('拖拽位置发生更新变化时=', result)
    };
    function onDragEnd(result) {
        console.log('拖拽结束=', result)
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        let startIndex = source.index;
        let endIndex = destination.index;
        if (destination.droppableId == source.droppableId && endIndex == startIndex) return;
        //column拖拽
        if (type == 'column') {
            let target = dragDropData[startIndex];
            let cloneData = _.cloneDeep(dragDropData);
            cloneData.splice(startIndex, 1);
            cloneData.splice(endIndex, 0, target);
            setData(cloneData);
            return;
        }
        //同一column组内任务拖拽
        if (destination.droppableId == source.droppableId) {
            let nowColIndex = dragDropData.findIndex(col => col.id == source.droppableId);
            let nowCol = dragDropData[nowColIndex];
            let nowTasks = _.cloneDeep(nowCol.children);
            nowTasks.splice(startIndex, 1);
            nowTasks.splice(endIndex, 0, nowCol.children[startIndex]);
            nowCol.children = nowTasks;
            let cloneData = _.cloneDeep(dragDropData);
            cloneData[nowColIndex] = nowCol;
            setData(cloneData);
        } else {
            let startColumnIndex = dragDropData.findIndex(col => col.id == source.droppableId);
            let endColumnIndex = dragDropData.findIndex(col => col.id == destination.droppableId);
            let target = dragDropData[startColumnIndex].children[startIndex];
            let cloneData = _.cloneDeep(dragDropData);
            cloneData[startColumnIndex].children.splice(startIndex, 1);
            cloneData[endColumnIndex].children.splice(endIndex, 0, target);
            setData(cloneData);
        }
    }
    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <Radio.Group value={columnKey} onChange={(e) => { setColumn(e.target.value) }}>
                    <Radio.Button value="default">默认</Radio.Button>
                    <Radio.Button value="column-drag">禁止column拖拽</Radio.Button>
                    <Radio.Button value="column-drop">禁止column放置</Radio.Button>
                    <Radio.Button value="task-drag">禁止task拖拽</Radio.Button>
                    <Radio.Button value="task-drop">禁止task放置</Radio.Button>
                </Radio.Group>
            </div>
            <TaskBoard
                dataSource={dragDropData}
                //拖拽函数
                // onBeforeDragStart={onBeforeDragStart}
                // onDragStart={onDragStart}
                // onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
                //拖拽禁用
                isColumnDragDisabled={columnKey == 'column-drag'}
                isColumnDropDisabled={columnKey == 'column-drop'}
                isTaskDragDisabled={columnKey == 'task-drag'}
                isTaskDropDisabled={columnKey == 'task-drop'}
            />
        </div>
    )
}
/*! End !*/
const config = {
    codes: code,
    useage: `
    🦁 提供默认支持面板与任务拖拽排序的功能性面板，支持自定义面板header与task内容、任务高亮、手势操作等功能
    `,
    children: [
        {
            title: '基本用法',
            describe: '相关配置功能展示,dataSource的数据表标识为id,可通过idKey进行标识字段的自定义',
            cmp: BasicUse
        },
        {
            title: '任务高亮',
            describe: '任务面板支持关键字过滤任务并高亮显示，默认筛选任务名称。支持自定义过滤函数',
            cmp: HightLightUse
        },
        {
            title: '拖拽功能',
            describe: `<div>
                <p>相关拖拽函数暴露与拖拽禁用</p>
                <p>支持键盘拖拽操作:</p>
                <div>
                    <span><span style="font-weight:bold;border:1px solid">tab</span>切换拖拽项，</span>
                    <span><span style="font-weight:bold;border:1px solid">(↑ + ↓ + ← + →)</span>移动，</span>
                    <span><span style="font-weight:bold;border:1px solid">(tab + shift)</span>向后回退，</span>
                    <span><span style="font-weight:bold;border:1px solid">space</span>放下拖拽项，</span>
                    <span><span style="font-weight:bold;border:1px solid">esc</span>取消拖动</span>
                </div>
            </div>`,
            cmp: DragDropUse
        }
    ]
};
export default () => <CodeDecorator config={config} />

