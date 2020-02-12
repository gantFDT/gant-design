import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames';
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
        <div className={`${prefixCls}-footerbox`}>
            <div className={`${prefixCls}-footerdiv`}>
                <a
                    onClick={onFooterChangePage.bind(null, 'before')}
                    style={{ display: currentIndex == 0 ? 'none' : 'block' }}>
                    <span>{'上一篇'}</span>
                    <h6>{currentIndex == 0 ? '' : data[currentIndex - 1].title}</h6>
                </a>
            </div>
            <div className={`${prefixCls}-footerdiv`} style={{ textAlign: 'right' }}>
                <a
                    onClick={onFooterChangePage.bind(null, 'after')}
                    style={{ display: currentIndex + 1 == data.length ? 'none' : 'block' }}>
                    <span>{'下一篇'}</span>
                    <h6>{currentIndex + 1 == data.length ? '' : data[currentIndex + 1].title}</h6>
                </a>
            </div>
        </div>
    </div>
}

FlipOverFooter.defaultProps = {
    data: [],
    itemKey: 'key',
    style: {}
}

export default FlipOverFooter;