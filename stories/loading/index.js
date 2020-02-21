import React from 'react';
import {Loading} from '@packages/gantd/src';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';


function Use(beginIndex) {
    return () => <Loading index={beginIndex} height={150} />
}
Use = Use.bind(this);


let children = [];
var maxLength = 28;
var beginIndex = 0;
while (beginIndex < maxLength) {
    children.push({
        title: `第${beginIndex}种效果`,
        describe: `index为${beginIndex}时的效果`,
        cmp: Use(beginIndex)
    })
    beginIndex++;
}


const config = {
    codes: code,
    inline: true,
    useage: `
    多种loading效果
    `,
    children: children
};
export default () => <CodeDecorator config={config} />

