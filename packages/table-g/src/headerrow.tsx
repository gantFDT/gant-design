import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { DataContext } from './context'
import { getStyleText } from './_utils'

const HeaderRow = (props) => {
    const { cellPadding, originLineHeight } = useContext(DataContext)

    const style = useMemo(() => {
        const s = { ...(props.style || {}) }
        s['--padding'] = getStyleText(cellPadding)
        s['--lineHeight'] = getStyleText(originLineHeight)
        return s
    }, [props.style, cellPadding])

    return <tr {...props} className={classnames(props.className, 'gant-table-header-row')} style={style} />
}

export default HeaderRow