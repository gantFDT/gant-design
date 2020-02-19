import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd'
import './index.less';

type Item = {
    title: string,
    [key: string]: any
}

export interface FlipOverFooterProps {
    prefixCls: string,
    data: Item[],
    nowKey: string,
    className?: string,
    style?: React.CSSProperties,
    itemKey?: string,
    onSelectedChange: (nowKey: string, record: Item) => void
}

const FlipOverFooter = (props: FlipOverFooterProps) => {
    const { prefixCls, className, style, data, nowKey, itemKey, onSelectedChange } = props;

    const currentIndex = useMemo(() => data.findIndex((item) => item[itemKey] == nowKey) || 0, [data, nowKey])

    const onFooterChangePage = useCallback((parameter) => {
        const item = parameter == 'before' ? data[currentIndex - 1] : data[currentIndex + 1]
        item && onSelectedChange && onSelectedChange(item[itemKey], item)
    }, [data, currentIndex])

    return <div className={classnames(`${prefixCls}-contextfooter`, className)} style={style}>
        <div className={`${prefixCls}-footerdiv`}
            onClick={onFooterChangePage.bind(null, 'before')}
            style={{ display: currentIndex == 0 ? 'none' : 'block' }}
        >
            <span style={{ display: 'inline-block', fontSize: 16, color: 'rgba(128,128,128,1)', margin: 5 }}><Icon type="left-circle" /></span>
            <p style={{ display: 'inline-block', color: 'rgba(128,128,128,1)', margin: 0 }}>{currentIndex == 0 ? '' : data[currentIndex - 1].title}</p>
        </div>
        <div className={`${prefixCls}-footerdiv`}
            onClick={onFooterChangePage.bind(null, 'after')}
            style={{ textAlign: 'right', display: currentIndex + 1 == data.length ? 'none' : 'block' }}
        >
            <p style={{ display: 'inline-block', color: 'rgba(128,128,128,1)', margin: 0 }}>{currentIndex + 1 == data.length ? '' : data[currentIndex + 1].title}</p>
            <span style={{ display: 'inline-block', fontSize: 16, color: 'rgba(128,128,128,1)', margin: 5 }}><Icon type="right-circle" /></span>
        </div>
    </div>
}

FlipOverFooter.defaultProps = {
    data: [],
    itemKey: 'key',
    style: {}
}

export default FlipOverFooter;