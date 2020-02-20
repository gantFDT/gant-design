import React, { useState } from 'react'
import Header from '@pkgs/header-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import { message, Icon, Button, Tooltip, Slider } from 'antd';
import reactElementToJSXString from 'react-element-to-jsx-string';


const config = {
  inline: true,
  useage: `
    🤡 在编写代码的时候，我们会总结一些复用性高的，功能性公共样式类，提高编码效率
    `,
  children: [
    {
      title: '内容上下左右居中',
      describe: 'gant-align-center',
      cmp: <div className="gant-align-center">
        内容上下左右居中
        </div>,
    },
    {
      title: '外边距(1-20)',
      describe: 'gant-margin-*, gant-margin-h-*, gant-margin-v-*',
      cmp: <>
        <div>
          <div className="gant-margin-v-10" style={{ border: '1px solid #ccc' }}>
            gant-margin-v-10
          </div>
          <div className="gant-margin-v-10" style={{ border: '1px solid #ccc' }}>
            gant-margin-v-10
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="gant-margin-h-5" style={{ border: '1px solid #ccc' }}>
            gant-margin-h-5
          </div>
          <div className="gant-margin-h-5" style={{ border: '1px solid #ccc' }}>
            gant-margin-h-5
          </div>
        </div>
      </>,
    },
    {
      title: '内边距(1-20)',
      describe: 'gant-padding-*, gant-padding-h-*, gant-padding-v-*',
      cmp: <>
        <div>
          <div className="gant-padding-v-10" style={{ border: '1px solid #ccc' }}>
            gant-padding-v-10
        </div>
          <div className="gant-padding-v-10" style={{ border: '1px solid #ccc' }}>
            gant-padding-v-10
        </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="gant-padding-h-5" style={{ border: '1px solid #ccc' }}>
            gant-padding-h-5
        </div>
          <div className="gant-padding-h-5" style={{ border: '1px solid #ccc' }}>
            gant-padding-h-5
        </div>
        </div>
      </>
    },
    {
      title: '限制文本显示行数(1-10)',
      describe: 'gant-omit-*',
      cmp: <><div className="gant-omit-3">
        gant-omit-3  声明式
React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。

以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

组件化
创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。

组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。

一次学习，随处编写
无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。

React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。
        </div>
      </>
    },
  ]
};
export default () => <CodeDecorator config={config} />
