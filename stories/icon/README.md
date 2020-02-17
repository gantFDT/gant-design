## API

属性如下

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| type | 图表类型 | string | |

## 自定义 font 图标
我们提供了一个 `createFromIconfontCN` 方法，方便开发者调用在 [iconfont.cn](https://www.iconfont.cn/) 上自行管理的图标。

```
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});

ReactDOM.render(<MyIcon type="icon-example" />, mountedNode);
```

`options` 的配置项如下：

|参数|说明|类型|默认值|
| --- | ---- | --- | ----- |
|scriptUrl|`iconfont.cn` 项目在线生成的 js 地址|	string|	
|extraCommonProps|给所有的 svg 图标 `<Icon />` 组件设置额外的属性|`{ [key: string]: any }`|	`{}`|

在 scriptUrl 都设置有效的情况下，组件在渲染前会自动引入 iconfont.cn 项目中的图标符号集，无需手动引入。

见 iconfont.cn 使用帮助 查看如何生成 js 地址。

## 注意

## FAQ