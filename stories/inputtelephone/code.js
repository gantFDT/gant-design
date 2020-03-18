export default [
`
import React, { useState } from 'react';
import { InputTelePhone } from 'gantd';

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}


const Demo = WrapperValue({ key: '0832', value: '4300698' })(({ value, setValue }) => <InputTelePhone value={value} onChange={setValue} onSave={onSave} />);

ReactDOM.render(<Demo />, mountNode)`,]