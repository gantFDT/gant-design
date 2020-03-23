import React from 'react'
import classnames from 'classnames'

const HeaderRow = (props) => {

    return <tr {...props} className={classnames(props.className, 'gant-table-header-row')} />
}

export default HeaderRow