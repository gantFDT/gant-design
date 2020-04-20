import React, { Component } from 'react'
export default class GirdRenderColumn extends Component<any, any> {
	render() {
		const { value, rowIndex, render, data, } = this.props;
		return (
			<>
				< span className={`gant-grid-cell-content`} > {typeof render == 'function' ? render(value, data, rowIndex) : value}</span >
			</>
		)
	}
}