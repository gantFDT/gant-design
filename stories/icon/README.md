## API

属性如下

| 属性 | 说明         | 类型   | 默认值 |
| ---- | ------------ | ------ | ------ |
| type | 图标唯一标识 | string |        |

更多属性见 https://ant-design.gitee.io/components/icon-cn/

## 注意
前置引入iconfont图标有两种方式  

1、直接引入iconfont js文件  

2、或者调用updateFromIconfontCN方法  

我们提供了一个 `updateFromIconfontCN` 方法  


 ```
Icon.updateFromIconfontCN({  
  scriptUrl: '//at.alicdn.com/t/font_1252237_yp35yr9jf6.js'
})  
```


方便开发者调用在 [iconfont.cn](https://www.iconfont.cn/) 上自行管理的图标。
可以直接通过此组件直接渲染iconfont



