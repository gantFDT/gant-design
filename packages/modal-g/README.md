# modal-g

---
Modal component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/modal-g.svg
[npm-url]: https://www.npmjs.com/package/modal-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/modal-g.png)](https://npmjs.org/package/modal-g)

## Feature

- Support drag and resize
- Can switch to maximize
- Respond to browser window size changes in real time
- Modal status persists during mounting
- Support Modeless and multi-modal modes

## Usage

```js
import React, { useState } from 'react';
import Modal from 'modal-g';
import { Button } from 'antd';

function BasicUse() {
  const [visible, setVisible] = useState(false)
    const [widthAndHei, setWidthAndHei] = useState([400, 400])
    const onSizeChange = (width, height) => {
        setWidthAndHei([width, height])
    }
  return <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>click</Button>
            </div>
            <Modal
                title='custom title'
                itemState={{ height: 400, width: 400 }}
                visible={visible}
                footer={null}
                onCancel={() => { setVisible(false) }}
                onSizeChange={onSizeChange}
            >
                <div>
                    <h4>Dynamic width and height（included header+footer）:</h4>
                    <div>{`width:${widthAndHei[0]}px`}</div>
                    <div>{`height:${widthAndHei[1]}px`}</div>
                </div>
            </Modal>
        </div>
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