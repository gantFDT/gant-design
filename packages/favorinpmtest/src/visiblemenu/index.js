import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import { ConfigConsumer } from '../config-provider';
import { Button, Tooltip, Dropdown, Menu, Checkbox } from 'antd';
import { sortableContainer, sortableElement, sortableHandle, } from 'react-sortable-hoc'
import './index.less'


const Handle = sortableHandle(() => <div className='gant-visible-menu-sorthandle'></div>)
const SortableMenu = sortableContainer(({
    children,
    onSortEnd,
    helperClass,
    lockAxis,
    disableAutoscroll,
    getHelperDimensions,
    hideSortableGhost,
    lockOffset,
    lockToContainerEdges,
    pressDelay,
    pressThreshold,
    shouldCancelStart,
    transitionDuration,
    useWindowAsScrollContainer,
    useDragHandle,
    ...props
}) => (
        <Menu className='gant-visible-menu' {...props}>
            {children}
        </Menu>
    ))

const SortableMenuItem = sortableElement(({
    index,
    data,
    isHidden,
    disabled,
    key,
    label,
    handleCheckbox,
    onChange,
    keyName,
    sortable,
    ...props
}) => (
        <Menu.Item key={key} {...props}>
            <div className='gant-visible-menu-item'>
                <div className='gant-visible-menu-item-check'>
                    <Checkbox dataKey={data[keyName]} checked={!isHidden} disabled={disabled} onChange={onChange}>{label}</Checkbox>
                </div>
                {
                    sortable && <Handle />
                }
            </div>
        </Menu.Item>
    ))

export default class VisibleMenu extends Component {
    state = {
        visible: false,
        sortable: false
    }

    static propTypes = {
        title: propTypes.string,
        icon: propTypes.string,
        data: propTypes.array,
        hiddenRows: propTypes.array,
        keyName: propTypes.string,
        labelName: propTypes.string,
        disabled: propTypes.bool,
        handleCheckbox: propTypes.func,
        onSorted: propTypes.func,
    }

    static defaultProps = {
        title: '动态列',
        icon: 'eye',
        data: [],
        hiddenRows: [],
        keyName: 'key',
        labelName: 'value',
        disabled: false,
        handleCheckbox: _ => _,
        onSorted: () => { }
    }

    componentDidMount() {
        if (this.props.onSorted !== VisibleMenu.defaultProps.onSorted) {
            this.setState({
                sortable: true
            })
        }
    }

    onSortEnd = ({ oldIndex: from, newIndex: to }, e) => {

        if (!_.isNil(from) && !_.isNil(to)) this.props.onSorted(from, to)
    }

    onChange = (e) => {
        const { data, hiddenRows, handleCheckbox } = this.props
        const { checked, dataKey } = e.target
        const hiddens = _.cloneDeep(hiddenRows);
        checked ? _.remove(hiddens, key => key === dataKey) : hiddens.push(dataKey);
        handleCheckbox(data, checked, hiddens)
    }

    renderWithConfigConsumer = ({ getPrefixCls, PrimaryColor }) => {
        const { title, icon, data, hiddenRows, keyName, labelName, disabled, children, ...restProps } = this.props;
        const { sortable } = this.state

        return (
            <Tooltip title={disabled ? null : title}>
                <Dropdown
                    disabled={disabled}
                    onVisibleChange={visible => { this.setState({ visible: visible }) }}
                    visible={this.state.visible}
                    {...restProps}
                    overlay={
                        <SortableMenu onSortEnd={this.onSortEnd} helperClass={getPrefixCls("visible-menu-sorting")} lockAxis='y' useDragHandle >
                            {
                                _.map(data, (i, index) => {
                                    let isHidden = hiddenRows.some(name => name === i[keyName])
                                    let _disabled = hiddenRows.length + 1 === data.length && !isHidden;
                                    return <SortableMenuItem key={i[keyName]} sortable={sortable} data={i} keyName={keyName} index={index} isHidden={isHidden} disabled={_disabled} label={i[labelName]} onChange={this.onChange} />
                                })
                            }
                        </SortableMenu>
                    }
                >
                    {children ? children : <Button icon={icon} size='small' style={hiddenRows.length > 0 ? { color: PrimaryColor, borderColor: PrimaryColor } : {}} />}
                </Dropdown>
            </Tooltip>
        );
    }

    render() {
        return (
            <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
        )
    }
}