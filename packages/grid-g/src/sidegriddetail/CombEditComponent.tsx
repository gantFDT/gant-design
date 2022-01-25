import React from 'react';
import {get} from 'lodash'
//聚合的编辑组件
const CombEditComponent = (props: any) => {
  const { type, node, fields } = props;
  const {
    data: { fieldName },
  } = node;
  //获取单元格的component、props
  const { editConfig = {} } = get(fields,fieldName);
  const { component, props: editProps } = editConfig;

  //获取最终的props
  let finalEditConfig = editProps;
  if (typeof editProps === 'function') {
    finalEditConfig = editProps(node.data, props);
  }

  if (typeof component === 'function') {
    const Component = component;
    return <Component {...props} {...finalEditConfig} />;
  }
  return React.createElement(component, { ...props, ...finalEditConfig });
};

export default CombEditComponent;
