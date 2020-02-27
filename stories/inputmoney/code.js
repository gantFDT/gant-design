export default [
  `
  import React, { useState } from 'react';
  import {InputLanguage} from '@data-cell';
  
  const Demo = () => {
    const [value, setValue] = useState(
      { 
        currency: "USD", 
        money: 123.123 
      }
    )
    const [precision, setprecision] = useState(2)
    const onSave = (id, value, cb) => {
      cb()
    }
    return <>
      小数点后位数: 
      <InputNumber 
        style={{ width: 80, display: 'inline-block' }} 
        min={1} 
        edit={EditStatus.EDIT} 
        value={precision} 
        onChange={setprecision} 
      />
      <InputMoney 
        placeholder='可编辑' 
        style={{ marginTop: 8 }} 
        precision={precision} 
        onSave={onSave} 
        value={value} 
        onChange={setValue} 
      />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
]



