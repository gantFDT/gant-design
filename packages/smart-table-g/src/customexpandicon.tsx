import React from 'react';
import { ExpandIconProps } from 'antd/lib/table';
import { Icon } from 'antd';


function CustomExpandIcon(props: ExpandIconProps<object>, isTree?: boolean) {
  if (!isTree) {
    return null;
  }
  let type;
  let prefix;
  if (!props.expandable) {
    type = 'file';
    prefix = null;
  } else if (props.expanded) {
    type = 'folder-open';
    prefix = 'expanded';
  } else {
    type = 'folder';
    prefix = 'collapsed';
  }
  
  
  return (
    <span onClick={(e: any) => props.onExpand(props.record, e)} style={{ paddingLeft: prefix ? 0 : 17 }}>
      {
        prefix && <span className={"ant-table-row-expand-icon ant-table-row-" + prefix} />
      }
      <Icon
        className=""
        type={type}
        theme="filled"
      />
    </span>
  );
}

export default CustomExpandIcon;