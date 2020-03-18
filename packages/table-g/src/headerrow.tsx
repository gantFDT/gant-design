import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
// import { DataContext } from './context'
import { getStyleText } from './_utils'

const HeaderRow = ({ cellPadding, ...props }) => {
    // const { cellPadding } = useContext(DataContext)

    const style = useMemo(() => {
        const s = { ...(props.style || {}) }
        s['--padding'] = getStyleText(cellPadding)
        return s
    }, [props.style, cellPadding])

    return <tr {...props} className={classnames(props.className, 'gant-table-header-row')} style={style} />
}

export default HeaderRow