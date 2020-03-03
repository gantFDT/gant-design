# smart-table-g

---
Dynamically and configurable column properties with Multiview support of table component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/smart-table-g.svg
[npm-url]: https://www.npmjs.com/package/smart-table-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/smart-table-g.png)](https://npmjs.org/package/smart-table-g)

## Feature

- Dynamically and configurable column properties
- Dynamically configurable table style properties
- Multi-view support  
  
## Usage

```js
import React from 'react';
import SmartTable from 'smart-table-g';
import { Tag, Divider } from 'antd';

function BasicUse() {
  const tableColumns = [
  {
    title: 'name',
    fieldName: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'age',
    fieldName: 'age',
  },
  {
    title: 'address',
    fieldName: 'address',
  },
  {
    title: 'tags',
    fieldName: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'action',
    fieldName: 'action',
    render: (text, record) => (
      <span>
        <a>invite {record.name}</a>
        <Divider type="vertical" />
        <a>delete</a>
      </span>
    ),
  },
]

const dataSource = [
  {
    key: '1',
    name: 'Mr someone1',
    age: 32,
    address: 'custom address',
    tags: ['Otaku', 'Developer'],
  },
  {
    key: '2',
    name: 'Mr someone2',
    age: 42,
    address: 'custom address',
    tags: ['Product manager'],
  },
  {
    key: '3',
    name: 'Mr someone3',
    age: 32,
    address: 'custom address',
    tags: ['Teacher'],
  },
]

  return <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
      />
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