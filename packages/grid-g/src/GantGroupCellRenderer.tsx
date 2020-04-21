import React, { Component } from 'react'
import classnames from 'classnames'
import { ICellRendererParams, IComponent, RowNode, GroupCellRenderer } from 'ag-grid-community'

interface GantGroupCellRendererProps extends ICellRendererParams {
}
interface GantGroupCellRendererState {
	expanded: boolean
}
export default class GantGroupCellRenderer extends Component<GantGroupCellRendererProps, GantGroupCellRendererState> {
	constructor(props) {
		super(props);
		const { node: { expanded } } = this.props;
		this.state = {
			expanded
		}
	}
onExpend = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
	const { node, context: { serverDataRequest }, data: { treeDataPath }, api } = this.props;
	event.stopPropagation();
	if (node.childrenAfterFilter.length > 0) {
		return node.setExpanded(true)
	}
	api.showLoadingOverlay()
	serverDataRequest(this.props, treeDataPath, () => {
		node.setExpanded(true);
		api.hideOverlay()
	})
}
onClose = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
	event.stopPropagation();
	const { node } = this.props;
	node.setExpanded(false)

}
selectionChangedCallback = (params) => {
	const { node: { expanded } } = params;
	this.setState({ expanded })
}
	componentDidMount() {
		this.props.node.addEventListener(RowNode.EVENT_EXPANDED_CHANGED, this.selectionChangedCallback)
	}
	componentWillUnmount() {
		this.props.node.removeEventListener(RowNode.EVENT_EXPANDED_CHANGED, this.selectionChangedCallback)
	}
	render() {
		const { expanded = false } = this.state
		const { value, node: { childrenAfterFilter, level }, data, context: { isServerSideGroup } } = this.props;
		const hasChildren = childrenAfterFilter.length > 0 || (isServerSideGroup && isServerSideGroup(data))
		
		return <span className={classnames('ag-cell-wrapper', ' ag-row-group', ` ag-row-group-indent-${level}`)}>
			{
				hasChildren &&
				(expanded ? <span className="ag-group-expanded" onClick={this.onClose} ref="eExpanded">
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


