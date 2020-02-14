import './index.less';
import React, { ReactNode, useRef, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ConfigContext } from '@gantd/config-provider';
import classnames from 'classnames'
import { Dropdown, Menu, Button } from 'antd'
import Icon from '@gantd/icon';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash'

enum headerType {
    icon,
    line,
    num
}
interface BlockHeaderIF {
    id?: string,
    type?: headerType,
    bottomLine?: boolean,
    title?: string | ReactNode,
    beforeExtra?: ReactNode,
    extra?: ReactNode,
    icon?: string | ReactNode,
    color?: string,
    style?: object,
    className?: string,
    [props: string]: any
}

const BlockHeader = (props: BlockHeaderIF) => {
    let {
        prefixCls: customizePrefixCls,
        id,
        type = '',
        bottomLine = false,
        title,
        beforeExtra,
        extra = <></>,
        icon = null,
        num = "1",
        color = '#202020',
        style = {},
        className,
        ...restProps
    } = props;

    let toolsCollection = extra['props']['children'] ? extra['props']['children'] : []

    let tools = []

    //过滤掉fragment
    const interator = (items) => {
        for (var index = 0; index < items.length; index++) {
            if (items[index] && items[index].type && items[index].type.toString() === 'Symbol(react.fragment)') {
                if (_.isArray(items[index].props.children)) {
                    interator(items[index].props.children)
                }
                if (_.isObject(items[index].props.children)) {
                    interator([items[index].props.children])
                }
            } else {
                if (!_.isArray(items[index])) {
                    tools.push(items[index])
                }
            }
        }
    }

    interator(toolsCollection)

    const outerRef = useRef(null)
    const [hiddenStartIndex, setHiddenStartIndex] = useState(tools.length);
    const [numberArr, setNumberArr] = useState([])
    const [toolsHeight, setToolsHeight] = useState()
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const childrenEL = outerRef.current.children[0].children
        const numberArr = []
        let total = 0
        let toolsHeight: number = 0
        for (let index = 0; index < childrenEL.length; index++) {
            const child = childrenEL[index]
            if (index === 0)//排除space占位
                continue;
            if (child.style.display === 'none') {//排除隐藏的tool
                continue;
            }
            toolsHeight = child.offsetHeight > toolsHeight ? child.offsetHeight : toolsHeight
            let margin = (child.style.marginLeft && parseInt(child.style.marginLeft)) + (child.style.marginRight && parseInt(child.style.marginRight));
            margin = margin ? margin : 10
            total = total + child.offsetWidth + margin;
            numberArr.push(total);
        }
        setToolsHeight(toolsHeight)
        setNumberArr(numberArr)
    }, [])

    //宽度改变
    const onResize = useCallback(() => {
        const outerWidth = outerRef.current.offsetWidth - (showMore ? 35 : 0)
        let startIndex = tools.length
        numberArr.map((item, index, arr) => {
            if (outerWidth <= arr[0]) {
                startIndex = -1
                return
            } else if (arr[index] < outerWidth && outerWidth < arr[index + 1]) {
                startIndex = index
                return
            } else if (outerWidth >= arr[arr.length - 1]) {
                startIndex = tools.length
                return
            }
        })
        if (outerWidth < numberArr[numberArr.length - 1]) {
            setShowMore(true)
        } else {
            setShowMore(false)
        }
        setHiddenStartIndex(startIndex + 1)
    }, [numberArr, showMore])

    //收缩的内容
    const getDrapContent = useMemo(() => {
        return React.Children.map(tools, (item, index) => {
            if (index >= hiddenStartIndex) {
                return <div style={{ margin: '5px' }}>{item}</div>
            }
        })
    }, [hiddenStartIndex])
    // console.log('hiddenStartIndex', hiddenStartIndex)
    //默认内容
    const getContent = useMemo(() => {
        // console.log('tools', tools)
        return React.Children.map(tools, (item, index) => {
            return index < hiddenStartIndex && item
        })
    }, [hiddenStartIndex])


    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('blockheader', customizePrefixCls);
    const width = '100%'

    const clsString = classnames(prefixCls, className);

    return (
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} key={1}>
            <div id={id} className={clsString} style={{ borderBottom: bottomLine && '1px solid #edebe9', ...style }}>
                <div className={prefixCls + '-wrapper'}>
                    <div className={prefixCls + '-beforeExtra'}>
                        {beforeExtra}
                    </div>
                    {type == 'icon' && <div className={prefixCls + '-icon'} style={{ color: color }}>
                        {typeof icon === 'string' && <Icon type={icon} />}
                        {typeof icon === 'object' && { icon }}
                    </div>}
                    {type == 'line' && title && <div className={prefixCls + '-line'} style={{ background: color }}></div>}
                    {type == 'num' && <div className={prefixCls + '-num'} style={{ background: color }}>{num}</div>}
                    <div className={prefixCls + '-title'} style={{ color: color }}>{title}</div>
                    <div ref={(ref) => outerRef.current = ref} className={getPrefixCls('overflow-tool-outer')}>
                        <div className={getPrefixCls('overflow-tool-inner')} style={{ width: width }} >
                            <div className={getPrefixCls('overflow-tool-space')}></div>
                            {getContent}
                            {showMore && <Dropdown
                                trigger={['click']}
                                overlay={<Menu style={{ padding: '5px 0' }}>{getDrapContent}</Menu>}
                                placement="bottomRight"
                                getPopupContainer={(triggerNode) => triggerNode}
                                overlayStyle={{ zIndex: 1 }}
                            >
                                <Button icon="ellipsis" className={getPrefixCls('overflow-tool-icon')} style={{ height: toolsHeight }} />
                            </Dropdown>}
                        </div>
                    </div>
                </div>
            </div>
        </ReactResizeDetector>
    )
}

export default BlockHeader