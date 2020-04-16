import React, { Component } from 'react'
import classnames from 'classnames'
import { ICellRendererParams } from 'ag-grid-community'
interface GantGroupCellRendererProps extends ICellRendererParams {
	isServerSideGroup: (data: any) => boolean,
	serverDataRequest: (params: any, groupKeys: any, successCallback: any) => void
}
export default class GantGroupCellRenderer extends Component<GantGroupCellRendererProps> {
	onExpend = () => {
		const { node, isServerSideGroup, serverDataRequest, data: { treeDataPath } } = this.props;
		if (node.childrenAfterFilter.length > 0) {
			return node.setExpanded(true)
		}
		serverDataRequest(this.props, treeDataPath, () => { 
			node.setExpanded(true)
		})
	}
	onClose = () => {
		const { node } = this.props;
		node.setExpanded(false)
	}
	render() {
		console.log(this.props)
		const { value, node: { expanded, childrenAfterFilter, level }, data, isServerSideGroup } = this.props;
		const hasChildren = (childrenAfterFilter.length > 0 || (isServerSideGroup && isServerSideGroup(isServerSideGroup)))
		return <span className={classnames('ag-cell-wrapper', ' ag-row-group', ` ag-row-group-indent-${level + 1}`)}>
			{
				hasChildren &&
				(expanded ? <span className="ag-group-expanded" ref="eExpanded">
					< span className="ag-icon ag-icon-tree-open" unselectable="on" ></span >
				</span >
					:
					<span className="ag-group-contracted" onClick={this.onExpend} ref="eContracted">
						<span className="ag-icon ag-icon-tree-closed" unselectable="on">
						</span>
					</span>)
			}
			<span className="ag-group-value" ref="eValue">{value}</span>
		</span >
	}
}