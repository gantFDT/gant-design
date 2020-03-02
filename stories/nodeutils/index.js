import React, { useState } from 'react'
import Header from '@packages/header-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import reactElementToJSXString from 'react-element-to-jsx-string';
import code from './code'

function demo(props) {
  return (<div>demo</div>)
}


const config = {
  codes: code.map(V => `import React, { useState, useCallback, useEffect, useMemo } from 'react';\n${V}`),
  inline: true,
  useage: `
    一些常用的nodejs工具类
    `,
  children: [
    {
      title: '',
      describe: '',
      cmp: demo,
    }

  ]
};
export default () => <CodeDecorator config={config} />
