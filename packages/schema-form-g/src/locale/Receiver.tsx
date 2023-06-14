import React from 'react';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './en-US';
import zh from './zh-CN';
import de from './de-DE';
import fr from './fr-FR';
import ja from './ja-JP';
import ru from './ru-RU';
import it from './it-IT';


//参考antd的locale文件的定义规范
const langs = {
  'zh-cn': zh,
  en: en,
  de: de,
  fr: fr,
  ja: ja,
  ru: ru,
  it: it,
};

export interface LocaleInterface {
  [key: string]: any;
}

export interface Props {
  children: (locale: LocaleInterface) => React.ReactNode;
}

export default (props: Props) => {
  return (
    <LocaleReceiver>
      {(local, localeCode = 'zh-cn') => {
        let locale = langs[localeCode] || langs['zh-cn'];
        return <>{props.children(locale)}</>;
      }}
    </LocaleReceiver>
  );
};
