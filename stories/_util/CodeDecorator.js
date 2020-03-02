import 'antd/dist/antd.css';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Collapse, Icon, Tooltip, Row, Col } from 'antd';
import { ConfigProvider } from '@gantd';
import Anchor from '@packages/anchor-g/src';
import zhCN from '@gantd/locale/zh_CN';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { version, name } from '../../packages/gantd/package.json';
import reactElementToJSXString from 'react-element-to-jsx-string';
const Panel = Collapse.Panel;
import Highlight, { defaultProps } from "prism-react-renderer";
// console.log('version', version)
import { CodeDecoratorStyles } from "./CodeDecoratorStyles.js";
import classnames from 'classnames'
import Prism from 'prismjs'
import styles from './CodeDecoratorStyles.css'
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
    fontSize: '16px',
    borderRadius: '2px 2px 0 0',
};
const descriptionStyle = {
    padding: '24px 24px',
    fontSize: '12px',
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

const codeShowExtra = {
    marginLeft: 10
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
        css: `@import 'antd/dist/antd.css';\n@import '${name}/dist/${name}.css';`,
        editors: "001",
        css_external: `https://unpkg.com/antd/dist/antd.css;https://unpkg.com/${name}@${version}/dist/${name}.css`,
        js_external: `https://unpkg.com/react@16.x/umd/react.development.js;https://unpkg.com/react-dom@16.x/umd/react-dom.development.js;https://unpkg.com/moment/min/moment-with-locales.js;https://unpkg.com/antd/dist/antd-with-locales.js;https://unpkg.com/react-router-dom/umd/react-router-dom.min.js;https://unpkg.com/react-router@3.x/umd/ReactRouter.min.js;https://unpkg.com/${name}@${version}/dist/${name}.js`,
        js_pre_processor: "typescript"
    }

    return JSON.stringify(codePenData);
}
function CodeBox(props) {
    const { id, title = '标题', describe = '暂无描述', code, children, isActive, isCollapsed, handleCollapse } = props;
    const [copy, setCopy] = useState(false);

    function genExtra() {
        return <>
            <Tooltip
                title="在 CodePen 中打开"
            >
                <form action="https://codepen.io/pen/define" style={{ display: 'inline-block', verticalAlign: 'sub', marginRight: 8 }} method="POST" target="_blank">
                    <input type="hidden" name="data" value={getCodePenStr(title, describe, code)} />
                    <input type="submit" style={codePenStyle} value="codePen" />
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
            <Card id={id} bodyStyle={{ padding: 0 }} style={{ ...cardStyle, border: isActive ? '1px solid #1890ff' : null }}>
                <div style={wrapperStyle}>
                    {children}
                </div>
                <div style={metaStyle}>
                    {title && <div style={titleStyle}>{title}</div>}
                    {/* <div style={descriptionStyle}>{describe}</div> */}
                    <div style={descriptionStyle} dangerouslySetInnerHTML={{ __html: describe }} />
                </div>
                {code && <Collapse activeKey={isCollapsed ? null : id} bordered={false} style={collapseStyle} onChange={handleCollapse.bind(null, id)}>
                    <Panel key={id} header='显示代码' style={{ borderBottom: 0 }} extra={genExtra()}>
                        {/* <SyntaxHighlighter language="javascript" style={githubGist}>{code}</SyntaxHighlighter> */}
                        {/* <Highlight {...defaultProps} code={code} language="js">
                        
                        {({ className, style, tokens, getLineProps, getTokenProps }) => {
                            return (
                                <pre className={classnames(className, styles.gantdPrism)} style={styles}>
                                    {tokens.map((line, i) => {
                                        return (
                                            <div {...getLineProps({ line, key: i })}>
                                                {line.map((token, key) => {
                                                    return (
                                                        <span {...getTokenProps({ token, key })} />
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </pre>
                            )
                        }}
                        </Highlight> */}
                        <pre className="language-tsx">
                            <code>
                                <div dangerouslySetInnerHTML={{
                                    __html: Prism.highlight(code, Prism.languages.tsx, 'tsx')
                                }} ></div>
                            </code >
                        </pre >
                    </Panel>
                </Collapse>}
            </Card>
        </>
    )
};
/**
* @config useage[string|ReactNode] 何时使用内容
*         inline[bool] 是否一行两列展示 默认false
*         showAnchor[bool] 是否展示示例锚点 默认true
*         codes[array] 示例代码集合
*         children[array] 示例items集合 [{title:'...','describe':'...',cmp:function},...]
*/
export default ({ config }) => {
    if (!config) return null;

    const [codeExpends, setCodeExpends] = useState([]);
    const [showAllCode, setShowAllCode] = useState(false);
    const [currentAnchor, setCurrentAnchor] = useState(null);
    const { useage, inline, codes = [], children, showAnchor = true } = config;
    let anchors = [];

    useEffect(() => {
        showAllCodes(showAllCode)
    }, [showAllCode]);

    const allExpends = useMemo(() => {
        let arr = []
        for (let i = 0; i < children.length; i++) {
            arr.push(`demo_${i}`)
        }
        return arr
    }, [children.length])

    const showAllCodes = useCallback((show) => {
        setCodeExpends(show ? allExpends : [])
    }, [allExpends])

    const onAnchorClick = useCallback((e, { href }) => {
        e.stopPropagation();
        e.preventDefault();
        href && setCurrentAnchor(href);
    }, [])

    const handleCollapse = useCallback((id) => {
        let pos = codeExpends.indexOf(id);
        if (pos < 0) {
            setCodeExpends(expends => [...expends, id])
        } else {
            let newExpends = [...codeExpends]
            newExpends.splice(pos, 1)
            setCodeExpends(newExpends)
        }
    }, [codeExpends])

    const elements = useMemo(() => {
        return children.map(({ title, describe, cmp: Comp, code }, key) => {
            let id = `demo_${key}`;
            anchors.push({ id: id, title });
            let thisCode = code ? code : codes[key];
            if (React.isValidElement(Comp)) {
                thisCode = reactElementToJSXString(Comp)
            }
            return <CodeBox
                id={id}
                key={key}
                title={title}
                describe={describe}
                code={thisCode}
                isActive={`#${id}` == currentAnchor}
                isCollapsed={!codeExpends.includes(id)}
                handleCollapse={handleCollapse}
            >
                {React.isValidElement(Comp) ? Comp : <Comp />}
            </CodeBox>
        });
    }, [codes, children, currentAnchor, codeExpends, handleCollapse])

    const demos = useMemo(() => {
        return <>
            {inline ? <Row gutter={20}>
                <Col span={12}>{elements.filter((el, index) => ++index % 2 != 0)}</Col>
                <Col span={12}>{elements.filter((el, index) => ++index % 2 == 0)}</Col>
            </Row> : elements}
        </>
    }, [inline, elements])

    return (
        <ConfigProvider locale={zhCN}>
            {useage && <div>
                <h2 style={headerStyle}>特性</h2>
                {_.isObject(useage) ?
                    <div style={{ fontSize: 14 }}>{useage}</div> :
                    <div style={{ fontSize: 14 }} dangerouslySetInnerHTML={{ __html: useage }} />
                }
            </div>}
            <h2 style={headerStyle}>
                代码演示
          <span style={codeShowExtra}>
                    <Tooltip title={showAllCode ? '收起全部代码' : '展开全部代码'}>
                        <Icon type='code' theme={showAllCode ? 'filled' : 'outlined'} onClick={() => setShowAllCode(show => !show)} />
                    </Tooltip>
                </span>
            </h2>
            {showAnchor ? <Anchor
                list={anchors}
                onClick={onAnchorClick}
                content={demos}
            /> : demos}
        </ConfigProvider>
    )
}
