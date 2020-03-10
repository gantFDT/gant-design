import EditStatus from '../edit-status'

const SwitchStatus = (status: EditStatus) => {
    if (status === EditStatus.EDIT) return EditStatus.CANCEL
    if (status === EditStatus.CANCEL || status === EditStatus.SAVE) return EditStatus.EDIT
}
export default SwitchStatus 