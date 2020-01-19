const code_1 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';

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
const code_3 = `
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';

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
export default [code_1,code_2,code_3];
