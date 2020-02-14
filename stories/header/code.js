const code_1 = `
import React from 'react';
import { BlockHeader } from 'gantd';

ReactDOM.render(
    <BlockHeader title="标题" />
    ,mountNode);
`;
const code_2 = `
import React from 'react';
import { BlockHeader } from 'gantd';

ReactDOM.render(
    <>
        <BlockHeader type='icon' icon="file-text" title="标题(图标)" />
        <BlockHeader type='num' title="标题-(数字)" />
    </>
    ,mountNode);
`;
const code_3 = `
import React from 'react';
import { BlockHeader } from 'gantd';
import { Icon } from 'antd';

ReactDOM.render(
    <BlockHeader
        title="标题(回退)"
        beforeExtra={
            <Icon
            type="left"
            style={{ marginRight: 10 }}
            onClick={() => { message.info('goback success') }} />
        } />
    ,mountNode);
`;
const code_4 = `
import React from 'react';
import { BlockHeader } from 'gantd';
import { message, Icon, Button, Tooltip } from 'antd';

function ExtraUse() {
    const [value, setvalue] = useState(100)
    const onChange = React.useCallback(
        (v) => {
            setvalue(v)
        },
        []
    )
    return <>
        <Slider min={1} max={100} onChange={onChange} value={value} />
        <div style={{ width: value+'%' }}>
            <BlockHeader
                title="工具栏"
                extra={<>

                    <Tooltip title='新增'>
                        <Button icon="plus" type="primary"/>
                    </Tooltip>
                    <Tooltip title='编辑'>
                        <Button icon="edit" />
                    </Tooltip>
                    <Tooltip title='保存'>
                        <Button icon="save">保存</Button>
                    </Tooltip>
                    <Tooltip title='复制'>
                        <Button icon="copy">复制</Button>
                    </Tooltip>
                    <Tooltip title='删除' >
                        <Button icon="delete" type="danger"/>
                    </Tooltip>
                </>}
            />
            <BlockHeader
                title="小工具栏"
                extra={<>

                    <Tooltip title='新增'>
                        <Button icon="plus" size="small" type="primary"/>
                    </Tooltip>
                    <Tooltip title='编辑'>
                        <Button icon="edit" size="small"/>
                    </Tooltip>
                    <Tooltip title='保存'>
                        <Button icon="save" size="small">保存</Button>
                    </Tooltip>
                    <Tooltip title='复制'>
                        <Button icon="copy" size="small">复制</Button>
                    </Tooltip>
                    <Tooltip title='删除'>
                        <Button icon="delete" size="small" type="danger"/>
                    </Tooltip>
                </>}
            />
        </div>
    </>
}
ReactDOM.render(<ExtraUse />, mountNode)`

const code_5 = `
import React from 'react';
import { BlockHeader } from 'gantd';

ReactDOM.render(
    <>
        <BlockHeader title="标题(主题色)" color='theme' />
        <BlockHeader title="标题(自定义颜色)" color='#FFC0CB' />
    </>
    ,mountNode);

`;

const code_6 = `
import React from 'react';
import { BlockHeader } from 'gantd';

ReactDOM.render(
    <>
        <BlockHeader title="显示分割线" bottomLine={true}/>
    </>
    ,mountNode);

`;

export default [code_1, code_2, code_3, code_4, code_5,code_6]

