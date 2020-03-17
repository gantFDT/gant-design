export default [
`
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = 'color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器


function BasicUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器</h3>
    <PurePicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = 'color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器


function BottomUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(向下弹出)</h3>
    <PurePicker
      placement="bottom"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(<BottomUse />, mountNode)`,`
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = 'color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器


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

ReactDOM.render(<ReadWriteUse />, mountNode)`,`
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = 'color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器


function ReadOnlyUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（只读）</h3>
    <ColorPicker
      allowEdit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(<ReadOnlyUse />, mountNode)`,`
import React, { useState } from 'react';
import { ColorPicker } from 'gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = 'color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器


function DisabledUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（禁用）</h3>
    <PurePicker
      disabled
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

ReactDOM.render(<DisabledUse />, mountNode)`,]