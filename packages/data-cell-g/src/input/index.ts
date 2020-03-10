type InputShape = {
    TextArea?: any,
    Search?: any,
    Group?: any,
    Password?: any,
}

import Input from './Input'
import TextArea from './TextArea'
import Password from './Password'
import Search from './Search'
import Group from './Group'

(<InputShape>Input).TextArea = TextArea;
(<InputShape>Input).Search = Search;
(<InputShape>Input).Group = Group;
(<InputShape>Input).Password = Password;

export default Input
export {
    TextArea,
    Search,
    Group,
    Password,
}