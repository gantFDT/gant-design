import Grid from '@grid';
import Header from '@header';
import { Random } from 'mockjs';
import React, { useState } from 'react';
import { Button, Input } from 'antd';

const dataSource = [
  { id: 1, name: 2 },
  { id: 2, name: 2 },
  { id: 3, name: 2 },
  { id: 4, name: 2 },
];
const columns = [
  {
    fieldName: 'id',
    title: 'id',
  },
  {
    fieldName: 'name',
    title: '姓名',
    editConfig: {
      component: props => {
        console.log('props', props);
        return <Input {...props} onChange={e => props.onChange(e.target.value)} />;
      },
      props: record => {
        return { record };
      },
      editable: true,
      signable: true,
    },
  },
];

const CopyDemo = () => {
  const [editable, setEditable] = useState(false);
  return (
    <>
      <Header
        title="拷贝单元格"
        extra={
          !editable ? (
            <Button size="small" icon="edit" onClick={() => setEditable(true)} />
          ) : (
            <>
              <Button size="small" icon="poweroff" onClick={() => setEditable(false)} />
              {/* <Button size="small" icon="plus" onClick={onCreate} />
              <Button size="small" icon="minus" onClick={onTagRemove} />
              <Button size="small" icon="delete" onClick={onRemove} />
              <Button size="small" icon="undo" onClick={() => gridManagerRef.current.undo()} />
              <Button size="small" icon="redo" onClick={() => gridManagerRef.current.redo()} />
              <Button size="small" icon="save" onClick={onSave} /> */}
            </>
          )
        }
      />
      <Grid
        rowkey="id"
        editable={editable}
        dataSource={dataSource}
        columns={columns}
        enableCellTextSelection={false}
        //支持区域选中
        enableRangeSelection
      />
    </>
  );
};

export default CopyDemo;
