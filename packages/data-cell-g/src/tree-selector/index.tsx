import React, { memo } from 'react';
import { Tree, Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
const { OptGroup, Option } = Select;
const { TreeNode } = Tree;
export interface TreeSelector extends SelectProps {
  treeIcon;
  treeDefaultExpandAll?: boolean;
}
export default memo(function TreeSelector() {
  return (
    <Select style={{ width: '100%' }}>
      <OptGroup key="recent" label="最近选择"></OptGroup>
    </Select>
  );
});
