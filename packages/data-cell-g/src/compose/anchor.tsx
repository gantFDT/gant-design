import React, { ComponentClass, ReactNode } from 'react'
import { compose, withHandlers, withState, mapProps } from 'recompose'
import { Anchor, Layout, } from 'antd'
import { memoize } from 'lodash'
import { HandlerWithType } from './common'

export interface AnchorType {
  id: string,
  title: string,
  key?: string,
}

interface WrapperComponentProps {
  anchorList: Array<AnchorType>,
  getAnchor: (list: Array<AnchorType>) => ReactNode,
}

const customAnchorData = {
  id: 'custom',
  title: "自定义属性",
}

/**
 * 
 * @toggleCustomAnchor 切换显示自定义属性锚点
 */
const withAnchor = (list: Array<AnchorType>) => compose(
  withState('anchorList', 'setAnchorList', list),
  withHandlers(({ setAnchorList }: { setAnchorList: HandlerWithType<Array<AnchorType>> }) => {
    const memorizeGetAnchor = memoize((anchorList: Array<AnchorType>) => (<Anchor offsetTop={90} onClick={(e) => { e.preventDefault() }}> {anchorList.map(item => <Anchor.Link key={item.key || item.title} href={`#${item.id || item.title}`} title={item.title} />)} </Anchor>))
    const memorizeToggleCustom = memoize(isShow => {
      setAnchorList(isShow ? [...list, customAnchorData] : list)
    })
    return {
      getAnchor: () => memorizeGetAnchor,
      toggleCustomAnchor: () => memorizeToggleCustom,
    }
  }),
  (WrapperComponent: ComponentClass) => (props: WrapperComponentProps) => {
    const { anchorList, getAnchor } = props
    if (anchorList && anchorList.length) {
      return (
        <Layout>
          <Layout.Content style={{ background: '#fff' }}>
            <WrapperComponent {...props} />
          </Layout.Content>
          <Layout.Sider width={150} style={{ background: '#fafafa', paddingLeft: '20px', borderLeft: '1px solid #edebe9', paddingTop: '20px' }}>
            {getAnchor(anchorList)}
          </Layout.Sider>
        </Layout>
      )
    }

    return <WrapperComponent {...props} />
  },
  mapProps(({
    // 禁止被装饰的组件访问的属性和方法
    anchorList,
    setAnchorList,
    getAnchor,
    ...props }: { anchorList: [], setAnchorList: any, getAnchor: any, props: object }) => props),
)

export default withAnchor
