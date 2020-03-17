export default [
`
import React, { useState, useCallback } from 'react';
import { InputMoney, EditStatus, InputNumber } from 'gantd';


const Use = () => {
  const [value, setValue] = useState({ key: "USD", value: 123.123 })
  const [precision, setprecision] = useState(2)
  const onSave = (id, value, cb) => {
    cb()
  }
  const onPrecisionChange = useCallback((p) => {
    setprecision(Math.max(0, Math.min(p, 7)))
  }, []);
  return <>
    小数点后位数: <InputNumber style={{ width: 80, display: 'inline-block' }} min={0} max={7} edit={EditStatus.EDIT} value={precision} onChange={onPrecisionChange} />
    <InputMoney placeholder='可编辑' style={{ marginTop: 8 }} precision={precision} onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use />, mountNode)`,]