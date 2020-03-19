export default [
`
import React, { useState } from 'react'
import { Intro } from 'gantd';


function BasicUse() {
    return <Intro
        title="标题"
        imageRadius="5"
        image="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2105413885,2540060979&fm=26&gp=0.jpg"
        content='this is the content'
    />
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState } from 'react'
import { Intro } from 'gantd';


function noImageUse() {
    return <Intro
        title="标题"
        imageRadius="5"
        image={false}
        content='this is the content'
    />
}

ReactDOM.render(<noImageUse />, mountNode)`,`
import React, { useState } from 'react'
import { Intro } from 'gantd';


function ImageRightUse() {
    return <Intro
        title="标题"
        imageRadius="5"
        image="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2105413885,2540060979&fm=26&gp=0.jpg"
        imageAlign='right'
        content='this is the content'
    />
}

ReactDOM.render(<ImageRightUse />, mountNode)`,`
import React, { useState } from 'react'
import { Intro } from 'gantd';


const config = {
    inline: true,
    codes: code.map(item => {
        return \`
        import { Intro } from 'gantd';
     
        ReactDOM.render(
            \${item},
            mountNode,
        );
        \`
    }),
    useage: '业务对象属性非常复杂的情况下，需要关键信息介绍的时候',
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法',
            cmp: BasicUse
        },
        {
            title: '不使用图片',
            describe: '不使用图片',
            cmp: noImageUse
        },
        {
            title: '图片居右',
            describe: '图片居右',
            cmp: ImageRightUse
        },
    ]
};
export default () => <CodeDecorator config={config} /
ReactDOM.render(<config />, mountNode)`,]