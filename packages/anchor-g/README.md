# anchor-g

---
Anchor component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/anchor-g.svg
[npm-url]: https://www.npmjs.com/package/anchor-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/anchor-g.png)](https://npmjs.org/package/anchor-g)

## Feature

- Can switch to the top
- Support magnetic absorption effect
- Anchor item with completion status

## Usage

```js
import React from 'react';
import Anchor from 'anchor-g';

function BasicUse() {
  const list = [
    {
      id: 'horbasic1',
      title: 'title_1',
      complete: true
    },
    {
      id: 'horbasic2',
      title: 'title_2',
    },
    {
      id: 'horbasic3',
      title: 'title_3',
      complete: false
    }
  ]
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    height: 400,
    fontSize:24,
    border:'1px solid rgba(128,128,128,0.1)'
  }
  return (
    <>
      <Anchor
        list={list}
        minHeight={800}
        content={
          <div>
            <div id='horbasic1' style={style}>content_1</div>
            <div id='horbasic2' style={style}>content_2</div>
            <div id='horbasic3' style={style}>content_3</div>
          </div>
        }
      />
    </>
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