const code_1 = `
import { FooterToolbar } from 'gantd';
import { Button, Tooltip ,Icon} from 'antd';
ReactDOM.render(
    <FooterToolbar
    extraLeft={<Button size="small">返回</Button>}
    extraRight={<>
        <Tooltip placement="top" title='提示'>
            <Icon type="exclamation-circle" />
        </Tooltip>
        <Tooltip title='新增'>
            <Button icon="plus" size="small" type="primary" />
        </Tooltip>
        <Tooltip title='编辑'>
            <Button icon="edit" size="small" />
        </Tooltip>
        <Tooltip title='保存'>
            <Button icon="save" size="small">保存</Button>
        </Tooltip>
        <Tooltip title='复制'>
            <Button icon="copy" size="small">复制</Button>
        </Tooltip>
        <Tooltip title='删除'>
            <Button icon="delete" size="small" type="danger" />
        </Tooltip>
    </>}
/>,
    mountNode,
);
`;


const code_2 = `
import { FooterToolbar } from 'gantd';
import { Button, Tooltip ,Icon} from 'antd';
ReactDOM.render(
    <FooterToolbar
            fixed={true}
            extraLeft={<Button size="small">返回</Button>}
            extraRight={<>
                <Tooltip placement="top" title='提示'>
                    <Icon type="exclamation-circle" />
                </Tooltip>
                <Button type="danger" size="small">删除</Button>
                <Button type="primary" size="small">保存</Button>
            </>}
        />,
    mountNode,
);
`;


export default [code_1,code_2];
