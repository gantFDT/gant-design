export default ` 
import { Grid, Header, Input } from 'gantd';
import { Button, Icon, Tooltip, Dropdown, Menu } from 'antd';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { isEmpty, find, has, isArray } from 'lodash';
import Faker from 'faker';
import { notification } from 'antd';
import moment from 'moment';

const columns: any = [
  {
    title: '零件名',
    fieldName: 'partName',
    filter: 'agMultiColumnFilter',
    cellRenderer: 'gantGroupCellRenderer', //树形展示
    width: 150,
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '零件名不能为空',
        },
      ],
    },
  },
  {
    title: '零件号',
    fieldName: 'partNum',
    filter: 'agTextColumnFilter',
    width: 120,
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '零件号不能为空',
        }
      ],
    },
  },
  {
    title: '中文名',
    fieldName: 'zh',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
    },
  },
  {
    title: '英文名',
    fieldName: 'en',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
    },
  },
];

const dataSource = [
  {
    id: '1',
    path: ['1'],
    partName: '发动机',
    partNum: 'P000001',
    zh: '发动机',
    en: 'engine',
  },
  {
    id: '1-1',
    path: ['1', '1-1'],
    partName: '机体',
    partNum: 'P0000011',
    zh: '机体',
    en: 'body',
  },
  {
    id: '1-2',
    path: ['1', '1-2'],
    partName: '机体22',
    partNum: 'P0000022',
    zh: '机体',
    en: 'body',
  },
  {
    id: '2',
    path: ['2'],
    partName: '变速器',
    partNum: 'P000002',
    zh: '变速器',
    en: 'transmission',
  },
];

const TreeGrid = () => {
  const [selectedKeys, setSelectedKeys] = useState<any>([1, 2]);
  const [selectedRows, setSelectedRows] = useState<any>();

  const [editable, setEditable] = useState(false);
  const gridApiRef = useRef(null);
  const gridManagerRef = useRef(null);

  const onReady = useCallback((params, manager) => {
    gridApiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  //选择
  const onSelect = useCallback((keys, rows) => {
    console.log('--->',keys)
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  //结束编辑
  const cancelEdit = () => {
    setEditable(false);
    setSelectedRows([]);
    setSelectedKeys([]);
    gridManagerRef.current.cancel();
  };

  //添加根节点
  const addRootNode = useCallback(async () => {
    const id = Faker.datatype.uuid();
    const newData = {
      id,
      path: [id],
    };
    gridManagerRef.current.create(newData);
    const node = gridApiRef.current.getRowNode(id);
    node && gridApiRef.current.ensureIndexVisible(node.rowIndex);
  }, []);

  //添加子节点
  const addChildNode = useCallback(() => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    if (selectedRows.length !== 1) {
      notification['warning']({
        message: \`请先选择单条数据\`,
      });
      return;
    }
    const node = gridApiRef.current.getRowNode(selectedRows[0].id);
    const { path } = node.data;
    const id = Faker.datatype.uuid();
    const newData = {
      id,
      path: [...path, id],
    };
    gridManagerRef.current.create(newData);
  }, []);

  //添加平行节点
  const addParallelNode = useCallback(() => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    if (selectedRows.length !== 1) {
      notification['warning']({
        message: \`请先选择单条数据\`,
      });
      return;
    }
    const node: any = gridApiRef.current.getRowNode(selectedRows[0].id).parent;
    if (!has(node, 'data')) {
      addRootNode();
      return;
    }
    const { path } = node.data;
    const id = Faker.datatype.uuid();
    const newData = {
      id,
      path: [...path, id],
    };
    gridManagerRef.current.create(newData);
  }, []);

  //保存
  const handleSave = useCallback(async () => {
    const { onDataAsyncEnd, validate, getPureData, diff } = gridManagerRef.current;
    onDataAsyncEnd(async () => {
      if (!gridManagerRef.current.isChanged) {
        notification['success']({
          message: '数据没有改变',
        });
        return;
      }
      const errors = await validate();
      if (errors) {
        notification['warning']({
          message: '校验不通过',
          description: JSON.stringify(errors, null, 2),
        });
        return;
      }
      gridManagerRef.current.save(() => {
        const dataSource = getPureData();
        notification['success']({
          message: '保存成功',
          description: JSON.stringify(dataSource, null, 2),
        });
        setEditable(false);
        return dataSource;
      });
    });
  }, []);

  return (
    <>
      <Header
        extra={
          <>
            {editable ? (
              <>
                <Tooltip title={'结束编辑'}>
                  <Button size="small" icon="poweroff" onClick={cancelEdit} />
                </Tooltip>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={addRootNode}>
                        <Icon type="icon-root" />
                        {'新增根节点'}
                      </Menu.Item>
                      <Menu.Item disabled={isEmpty(selectedRows)} onClick={addChildNode}>
                        <Icon type="icon-parallel" />
                        {'新增子节点'}
                      </Menu.Item>
                      <Menu.Item disabled={isEmpty(selectedRows)} onClick={addParallelNode}>
                        <Icon type="icon-children" />
                        {'新增兄弟节点'}
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomCenter"
                >
                  <Button size="small" icon="plus" />
                </Dropdown>
                <Tooltip title={'删除'}>
                  <Button
                    size="small"
                    icon="minus"
                    disabled={isEmpty(selectedRows)}
                    onClick={() => gridManagerRef.current.tagRemove(selectedKeys)}
                  ></Button>
                </Tooltip>
                <Tooltip title={'撤销'}>
                  <Button
                    size="small"
                    icon="undo"
                    onClick={() => gridManagerRef.current.undo()}
                  ></Button>
                </Tooltip>
                <Tooltip title={'恢复'}>
                  <Button
                    size="small"
                    icon="redo"
                    onClick={() => gridManagerRef.current.redo()}
                  ></Button>
                </Tooltip>
                <Tooltip title={'保存'}>
                  <Button size="small" icon="save" type="primary" onClick={handleSave}></Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip title={'进入编辑'}>
                <Button size="small" icon="edit" onClick={() => setEditable(true)}></Button>
              </Tooltip>
            )}
          </>
        }
        title="树形单元格编辑"
        type="line"
      />
      <Grid
        rowkey="id"
        columns={columns}
        dataSource={dataSource}
        onReady={onReady}
        serialNumber
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
        editable={editable}
        openEditSign
        treeData //开启树形模式
        getDataPath={data => data.path} //树形分组依据
        groupSuppressAutoColumn //关闭默认分组
        groupSelectsChildren
        suppressGroupSelectParent
        // groupSelectsChildren //选择子集
      />
    </>
  );
};

export default TreeGrid;
 
 `