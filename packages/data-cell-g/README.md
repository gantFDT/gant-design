# data-cell-g

---
Basic field-type components that support read-write separation based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/data-cell-g.svg
[npm-url]: https://www.npmjs.com/package/data-cell-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/data-cell-g.png)](https://npmjs.org/package/data-cell-g)

## Feature

- Data-intensive field components for business
- Support read and write separation
- Keep UI style with antd

## Usage

```js
import React, { useState } from 'react';
import { Input, InputTelePhone, InputEmail, SwitchStatus } from 'data-cell-g';

function BasicUse() {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? 'toEdit' : 'toRead'}</Button>
    <Input edit={edit}/>
    <InputTelePhone edit={edit}/>
    <InputEmail edit={edit}/>
    </>
}

React.render(<BasicUse/>, mountNode);
```

## API

[Documentation](https://jhildenbiddle.github.io/css-vars-ponyfill)

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/css-vars-ponyfill/issues) for bug reports, feature requests, or questions
- Follow [@GantFDT](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/css-vars-ponyfill) to support the project❤️!

## Anthor 

GantFDT

## License

MIT