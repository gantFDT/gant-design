# submenu-g

---
Submenu component based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/submenu-g.svg
[npm-url]: https://www.npmjs.com/package/submenu-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/submenu-g.png)](https://npmjs.org/package/submenu-g)

## Feature

- Can switch to the top
- Support magnetic absorption effect
- Fast page turn footer

## Usage

```js
import React from 'react';
import Submenu from 'submenu-g';
import { Icon } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function BasicUse() {
    const menuData = [
    {
      title: 'menu_1',
      icon: <Icon type='idcard' />,
      path: 'personal',
      count: 10
    },
    {
      title: 'menu_2',
      icon: <Icon type='global' />,
      path: 'preferences',
      count: 10
    },
    {
      title: 'menu_3',
      icon: <Icon type='lock' />,
      path: 'editpwd',
      count: 10
    },
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].path)
  const menuBoxRef = useRef(null);
  const onSelectedChange = (key, record, item) => setSelectedKey(key);
  const onSwitchChange = (mode) => {
    // console.log(mode)
  }
  const activeMenu = _.find(menuData, i => i.path === selectedKey)
  return (
    <Submenu
      menuData={menuData}
      selectedKey={selectedKey}
      width={180}
      setMenuBoxRef={ref => { menuBoxRef.current = ref }}
      showFlipOverFooter
      onCollapseChange={(collapsed) => {
        console.log(collapsed)
        console.log(menuBoxRef)
      }}
      onSelectedChange={onSelectedChange}
      onSwitchChange={onSwitchChange}
      extra={
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Avatar size={64} icon={UserOutlined} />
            <div style={{ textAlign: 'center' }}>admin</div>
          </div>
        </div>
      }
    >
      <div style={{ padding: '20px', height: 400 }}>
        {activeMenu['title']}
      </div>
    </Submenu>
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