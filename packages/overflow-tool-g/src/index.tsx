import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import ReactResizeDetector from 'react-resize-detector';
import './index.less'
import _ from 'lodash'

interface FlexGroupProps {
    [props: string]: any
}

const FlexGroup = (props: FlexGroupProps) => {
    const { children } = props
    const thisRef = useRef(null)
    const [hiddenStartIndex, setHiddenStartIndex] = useState(children.length);
    const [numberArr, setNumberArr] = useState([])
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const childrenEL = thisRef.current.getElementsByClassName('gant-flexgroup-inner')[0].children
        const numberArr = []
        let total = 0
        childrenEL.forEach((child, index) => {
            if (index === 0) return //排除space占位
            total = total + child.offsetWidth + 10
            numberArr.push(total)
        })
        setNumberArr(numberArr)
    }, [])

    //宽度改变
    const onResize = useCallback(() => {
        const outerWidth = thisRef.current.offsetWidth - (showMore ? 35 : 0)
        let startIndex = children.length
        numberArr.map((item, index, arr) => {
            if (outerWidth <= arr[0]) {
                startIndex = -1
                return
            } else if (arr[index] < outerWidth && outerWidth < arr[index + 1]) {
                startIndex = index
                return
            } else if (outerWidth >= arr[arr.length - 1]) {
                startIndex = children.length
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
        return React.Children.map(children, (item, index) => {
            if (index >= hiddenStartIndex) {
                return <div style={{ margin: '5px 0px' }}>{item}</div>
            }
        })
    }, [hiddenStartIndex])

    //默认内容
    const getContent = useMemo(() => {
        return React.Children.map(children, (item, index) => {
            return index < hiddenStartIndex && item
        })
    }, [hiddenStartIndex])

    const getPrefixCls = (cls) => 'gant-' + cls
    const width = showMore ? 'calc(100% - 35px)' : '100%'

    return (<ReactResizeDetector handleWidth handleHeight onResize={onResize} key={1}>
        <div ref={(ref) => thisRef.current = ref} className={getPrefixCls('flexgroup-outer')}>
            <div className={getPrefixCls('flexgroup-inner')} style={{ width: width }} >
                <div className={getPrefixCls('flexgroup-space')}></div>
                {getContent}
            </div>
            {showMore && <Dropdown trigger={['click']} overlay={<Menu>{getDrapContent}</Menu>} placement="bottomRight">
                <Icon type="ellipsis" className={getPrefixCls('flexgroup-icon')} />
            </Dropdown>
            }
        </div>
    </ReactResizeDetector>)
}

export default FlexGroup