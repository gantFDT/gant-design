# header-g

---
Header component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/header-g.svg
[npm-url]: https://www.npmjs.com/package/header-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/header-g.png)](https://npmjs.org/package/header-g)

## Feature

- Supports multiple header types and Options
- Extra tools overflow hidden gently

## Usage

```js
import React from 'react';
import Header from 'header-g';
import { Tooltip, Button } from 'antd';

function BasicUse() {
  return <>
        <Header type='line' title="title(with short line)" />
        <Header type='icon' icon="file-text" title="title(with icon)" />
        <Header type='num' title="title(with number)" />
        <Header
            title="title(extra tools)"
            beforeExtra={
              <>
                <Tooltip title='tool_1'>
                    <Button icon="plus" type="primary" />
                </Tooltip>   
                 <Tooltip title='tool_2'>
                    <Button icon="edit"/>
                </Tooltip>   
                 <Tooltip title='tool_3'>
                    <Button icon="save" />
                </Tooltip>   
                 <Tooltip title='tool_4'>
                    <Button icon="delete"/>
                </Tooltip>   
              </> 
            }
        />
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