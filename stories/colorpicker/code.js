const code_1 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
// import { ColorPicker } from 'color-picker-g';//与gantd中引入效果相同

function BasicUse() {
  const [color, setColor] = useState('#1890FF');
  
  return <>
    <h3 style={{color}}>颜色选择器</h3>
    <ColorPicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(
    <BasicUse />,
    mountNode,
);
`;
const code_2 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
// import { ColorPicker } from 'color-picker-g';//与gantd中引入效果相同

function BasicUse() {
  const [color, setColor] = useState('#1890FF');
  
  return <>
    <h3 style={{color}}>颜色选择器</h3>
    <ColorPicker
      placement="bottom"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(
    <BasicUse />,
    mountNode,
);
`;
const code_3 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
// import { ColorPicker } from 'data-cell-g'; 此包生效 //与gantd中引入效果相同


function ReadWriteUse() {
  const [color, setColor] = useState('#EB2F96');
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }

  return <>
    <h3 style={{ color }}>颜色选择器（读写分离）</h3>
    <ColorPicker
      value={color}
      onSave={onSave}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(
    <ReadWriteUse />,
    mountNode,
);
`;
const code_4 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
// import { ColorPicker } from 'color-picker-g';//与gantd中引入效果相同

function ReadOnlyUse() {
  const [color, setColor] = useState('#1890FF');
  
  return <>
    <h3 style={{color}}>颜色选择器(只读)</h3>
    <ColorPicker
      edit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(
    <ReadOnlyUse />,
    mountNode,
);
`;
const code_5 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
// import { ColorPicker } from 'color-picker-g';//与gantd中引入效果相同

function ReadOnlyUse() {
  const [color, setColor] = useState('#1890FF');
  
  return <>
    <h3 style={{color}}>颜色选择器(禁用)</h3>
    <ColorPicker
      disabled
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(
    <BasicUse />,
    ReadOnlyUse,
);
`;
export default [code_1, code_2, code_3, code_4, code_5];
