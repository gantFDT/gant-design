import React from 'react';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './en-US';
import zh from './zh-CN';

export interface LocaleInterface {
    [key: string]: any;
}

export interface Props {
    children: (locale: LocaleInterface) => React.ReactNode;
}

const langs = {
    'en': en,
    'zh-cn': zh
}


export default (props: Props) => {
    return <LocaleReceiver>
        {(local, localeCode = 'zh-cn') => {
            let locale = langs[localeCode] || langs['zh-cn']
            return <>{props.children(locale)}</>
        }}
    </LocaleReceiver>
}