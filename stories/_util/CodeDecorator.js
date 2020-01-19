import React, { useState } from 'react';
import { Card, Collapse, Icon, Tooltip, Row, Col, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { version } from '../../package.json';
const Panel = Collapse.Panel;
console.log('version', version)

const headerStyle = {
    fontSize: 24,
    margin: '40px 0 16px'
};
const cardStyle = {
    margin: '0 0 20px 0'
};
const wrapperStyle = {
    padding: '42px 24px 50px',
    borderBottom: '1px solid #e8e8e8'
};
const metaStyle = {
    position: 'relative',
    width: '100%',
};
const titleStyle = {
    position: 'absolute',
    top: '-14px',
    marginLeft: '16px',
    padding: '1px 8px',
    color: '#202020',
    background: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    borderRadius: '2px 2px 0 0',
};
const descriptionStyle = {
    padding: '10px 24px',
};
const collapseStyle = {
    borderTop: '1px dashed #ebedf0'
}
const codePenStyle = {
    width: 14,
    height: 14,
    overflow: 'hidden',
    textIndent: -9999,
    background: 'transparent url(https://gw.alipayobjects.com/zos/rmsportal/OtZslpOjYXijshDERXwc.svg) center / 14px no-repeat',
    border: 0,
    cursor: 'pointer'
}
const getCodePenStr = (title, description, code) => {
    code = code
      .replace(/import\s?ReactDom\s?from\s?['|"]react-dom['|"];?/, '')
      .replace(/import\s?React\s?from\s?['|"]react['|"];?/, '')
      .replace(/import\s?{(.*)\}\s?from\s?['|"](\w+)['|"]/g, 'const {$1} = $2')
      .replace(/import\s?.*\{(.*)\}\s?from\s?['|"]react['|"]/, 'const {$1} = React');

    const codePenData = {
      title: `${title} - Gant Design Demo`,
      description,
      html: `<div id="container" style="padding: 24px"></div>\n<script>var mountNode = document.getElementById('container');</script>`,
      js: code,
      css: `@import 'antd/dist/antd.css';\n@import 'gantd/dist/gantd.css';`,
      editors: "001",
      css_external: `https://unpkg.com/antd/dist/antd.css;https://unpkg.com/gantd@${version}/dist/gantd.css`,
      js_external: `https://unpkg.com/react@16.x/umd/react.development.js;https://unpkg.com/react-dom@16.x/umd/react-dom.development.js;https://unpkg.com/moment/min/moment-with-locales.js;https://unpkg.com/antd/dist/antd-with-locales.js;https://unpkg.com/react-router-dom/umd/react-router-dom.min.js;https://unpkg.com/react-router@3.x/umd/ReactRouter.min.js;https://unpkg.com/gantd@${version}/dist/gantd.js`,
      js_pre_processor: "typescript"
    }

    return JSON.stringify(codePenData);
}
function CodeBox({ title = '标题', describe = '暂无描述', code, children }) {
    const [copy, setCopy] = useState(false);

    function genExtra() {
        return <>
          <Tooltip
              title="在 CodePen 中打开"
          >
            <form action="https://codepen.io/pen/define" style={{display: 'inline-block', verticalAlign: 'sub', marginRight: 8}} method="POST" target="_blank">
              <input type="hidden" name="data" value={getCodePenStr(title, describe, code)}/>
              <input type="submit" style={codePenStyle}  value="codePen"/>
            </form>
          </Tooltip>
          <CopyToClipboard text={code}
              onCopy={() => { setCopy(true) }}>
              <Tooltip
                  title={copy ? '复制成功' : '复制代码'}
                  onVisibleChange={(visible) => {
                      !visible && copy && (setCopy(false))
                  }}
              >
                  <Icon
                      style={{ color: copy ? '#52c41a' : '#697b8c' }}
                      type={copy ? 'check' : 'snippets'}
                      onClick={event => { event.stopPropagation() }}
                  />
              </Tooltip>
          </CopyToClipboard>
        </>
    }
    return (
        <>
            <Card bodyStyle={{ padding: 0 }} style={cardStyle}>
                <div style={wrapperStyle}>
                    {children}
                </div>
                <div style={metaStyle}>
                    {title && <div style={titleStyle}>{title}</div>}
                    <div style={descriptionStyle}>{describe}</div>
                </div>
                {code && <Collapse bordered={false} style={collapseStyle} >
                    <Panel header='显示代码' style={{ borderBottom: 0 }} extra={genExtra()}>
                        <SyntaxHighlighter language="javascript" style={githubGist}>{code}</SyntaxHighlighter>
                    </Panel>
                </Collapse>}
            </Card>
        </>
    )
};
/**
* @config useage[string|ReactNode] 何时使用内容
*         inline[bool]是否一行两列展示 默认false
*         codes[array] 示例代码集合
*         children[array] 示例items集合 [{title:'...','describe':'...',cmp:function},...]
*/
export default ({ config }) => {
    if (!config) return null;
    const { useage, inline, codes = [], children } = config;
    let elements = children.map((item, key) => {
        const Comp = item.cmp;
        return < CodeBox
            key={key}
            title={item.title}
            describe={item.describe}
            code={codes[key]}
        >
            <Comp />
        </CodeBox>
    });
    return (
        <>
            {useage && <div>
                <h2 style={headerStyle}>何时使用</h2>
                <div>{useage}</div>
            </div>}
            <h2 style={headerStyle}>代码演示</h2>
            {inline ? <Row gutter={20}>
                <Col span={12}>
                    {elements.filter((el, index) => { return ++index % 2 != 0 })}
                </Col>
                <Col span={12}>
                    {elements.filter((el, index) => { return ++index % 2 == 0 })}
                </Col>
            </Row>
                : elements}
        </>
    )
}
