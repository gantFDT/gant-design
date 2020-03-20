import React from 'react'
import EditStatus from '../edit-status'
export default (WrapperedComponent) => {
	return class extends React.Component<any>{
		componentDidUpdate(prevProps) {
			const { edit, selfEdit, setEdit, onCancelCache } = this.props;
			if (prevProps.edit !== edit && edit === EditStatus.CANCEL) {
				onCancelCache();
			}
			if (edit === EditStatus.EDIT && selfEdit === EditStatus.EDIT) {
				setEdit(EditStatus.CANCEL)
			}
		}
		render() {
			return <WrapperedComponent {...this.props} />
		}
	}

}