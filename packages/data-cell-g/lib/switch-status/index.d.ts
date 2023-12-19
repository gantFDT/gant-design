import EditStatus from '../edit-status';
declare const SwitchStatus: (status: EditStatus) => EditStatus.EDIT | EditStatus.CANCEL;
export default SwitchStatus;
