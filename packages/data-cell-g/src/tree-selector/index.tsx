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
      {/* <OptGroup key="recent" label="最近选择"></OptGroup>
      <OptGroup key="result" label="搜索结果">
        <Tree
          checkable
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          // onSelect={this.onSelect}
          // onCheck={this.onCheck}
        >
          <Option key="0-0" value="0-0">
            <TreeNode title="parent 1" key="0-0"></TreeNode>
          </Option>
        </Tree>
      </OptGroup> */}
    </Select>
  );
});
