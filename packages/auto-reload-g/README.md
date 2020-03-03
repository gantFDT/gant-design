# auto-reload-g

---
A component that control timing refresh based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/auto-reload-g.svg
[npm-url]: https://www.npmjs.com/package/auto-reload-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/auto-reload-g.png)](https://npmjs.org/package/auto-reload-g)

## Feature

- Friendly with polling
- Easy for users to decide whether to turn on
- Support internationalization

## Usage

```js
import React from 'react';
import AutoReload from 'auto-load-g';

function BasicUse() {
  return <AutoReload
      refresh={() => { console.log('refresh now') }}
    />
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