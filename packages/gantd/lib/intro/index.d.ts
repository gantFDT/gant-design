import React from 'react';
interface IntroIF {
    imageAlign?: string;
    imageRadius?: number;
    image?: string;
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    [props: string]: any;
}
declare const Intro: (props: IntroIF) => JSX.Element;
export default Intro;
