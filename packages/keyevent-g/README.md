# keyevent-g

---
Keyevent component based with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/keyevent-g.svg
[npm-url]: https://www.npmjs.com/package/keyevent-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![keyevent-g](https://nodei.co/npm/keyevent-g.png)](https://npmjs.org/package/keyevent-g)

## Feature

- Supports custom key combinations
- Supports focus state

## Usage

```js
import React, { useState, useCallback } from 'react'
import { Modal, Button } from 'antd';
import withKeyevent from 'keyevent-g';

function BasicUse() {
  const [visible, setVisible] = useState(false);

  const handlerVisible = useCallback(() => {
    setVisible(!visible)
  },[visible])
  return withKeyevent(
    <div>
      <Button onClick={handlerVisible}>点击或者按下Meta+Shift+U</Button>
      <Modal
        title="弹框标题"
        visible={visible}
        onCancel={handlerVisible}
        onOk={handlerVisible}
        cancelText="取消"
        okText="确定"
      >
        <div>
          弹框内容
        </div>
      </Modal>
    </div>,
    {
      onMetaShiftU: handlerVisible
    }
  )
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