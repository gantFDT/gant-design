# table-g

---
Enhanced table component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/table-g.svg
[npm-url]: https://www.npmjs.com/package/table-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/table-g.png)](https://npmjs.org/package/table-g)

## Feature

- Collapsible columns
- Smooth scrolling under big data
- Support in cell editing
- Support Infinite data loading
  
## Usage

```js
import React from 'react';
import Table from 'table-g';

function BasicUse() {
   const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      showTip: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const dataSource = useMemo(() => getList(), [])
  const [resizable, setresizable] = useState(true)

  const toggleResizable = useCallback(() => {
      setresizable(r => !r)
    },[])

  const headerRight = useMemo(() => {
    return <Button onClick={toggleResizable} >switch to resize columns</Button>
  }, [])

  return <Table
    columns={columns}
    dataSource={dataSource}
    resizable={resizable}
    headerRight={headerRight}
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