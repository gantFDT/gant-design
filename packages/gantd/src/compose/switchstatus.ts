import EditStatus from './editstatus'

const SwitchStatus = (status: EditStatus) => {
    if (status === EditStatus.EDIT) return EditStatus.CANCEL
    if (status === EditStatus.CANCEL || status === EditStatus.SAVE) return EditStatus.EDIT
}
export default SwitchStatus 