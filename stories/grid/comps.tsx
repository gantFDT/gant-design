
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
// import Gird from '@grid'
import React from 'react'


/*! Split !*/
// const BasicUse = () => {
//     return (
//         <Gird />
//     )
// }
/*! End !*/
const config = {
    codes: [],
    inline: true,
    useage: '',
    children: [
        // {
        //     title: "基本使用",
        //     describe: "基本使用",
        //     cmp: BasicUse
        // }
    ]
}

export default () => <CodeDecorator config={config} />