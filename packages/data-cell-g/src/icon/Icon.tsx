import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from 'antd'
import { CustomIconOptions } from 'antd/lib/icon/IconFont'
import { IconProps, IconComponent } from 'antd/lib/icon/index.d'
import * as allIcons from '@ant-design/icons/lib/dist';

let dynamicIcon: IconComponent<IconProps> = Icon

// 所有icon的更新函数列表，实际是setState函数
const chain = new Map()

export interface GantIconProps extends IconProps {
    perfix?: string
}

const GantIcon = (props: GantIconProps) => {
    const [RenderIcon, setRenderIcon] = useState(() => dynamicIcon)
    useEffect(() => {
        chain.set(props.type, setRenderIcon)
        return () => {
            chain.delete(props.type)
        };
    }, [RenderIcon, props.type])
    const icon = useMemo(() => {
        if (typeof props.type === 'string') {
            if (props.type.startsWith('http')) {
                return (
                    <Icon component={() => (<img src={props.type} alt="icon" className="ant-pro-sider-menu-icon" />)} />
                );
            }
            if (props.type.startsWith(props.perfix)) {
                return <RenderIcon {...props} type={props.type} />;
            }
            return <Icon {...props} type={props.type} />;
        }
        return props.type;
    }, [props.type, RenderIcon])
    return icon
}

// 添加图标库,并更新
GantIcon.updateFromIconfontCN = (config: CustomIconOptions) => {
    const Iconfont = Icon.createFromIconfontCN(config)
    // 记忆最新icon
    dynamicIcon = Iconfont as IconComponent<IconProps>
    // // 更新操作
    for (const setFn of chain.values()) {
        setFn(() => Iconfont)
    }
}

// 在Icon上追加组件,
// const iconmap = new Map()
// GantIcon.createFromIconfontCN = (key, config) => {
//     const computedKey = key.slice(0, 1).toUpperCase() + key.slice(1)
//     if (iconmap.has(computedKey)) {
//         return iconmap.get(computedKey)
//     } else if (config) {
//         const Iconfont = Icon.createFromIconfontCN(config)
//         iconmap.set(computedKey, Iconfont)
//         GantIcon[computedKey] = Iconfont
//         return Iconfont
//     }
//     return dynamicIcon
// }
GantIcon.Ant = Icon

type Theme = 'fill' | 'outline' | 'twotone'
const excludeIcons = ['interation', 'colum-height']
function getIconsByTheme(theme: Theme): Array<string> {
    const types = []
    for (const icon of Object.values(allIcons)) {
        if (icon.theme === theme) {
            if (!excludeIcons.includes(icon.name)) {
                types.push(icon.name)
            }
        }
    }
    return types
}

GantIcon.getOutLine = () => getIconsByTheme('outline')
GantIcon.getFill = () => getIconsByTheme('fill')
GantIcon.getTwoTone = () => getIconsByTheme('twotone')

export default GantIcon
export {
    IconProps,
    IconComponent
}