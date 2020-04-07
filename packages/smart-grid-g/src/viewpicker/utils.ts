import { DefaultView } from './index'

interface GetActiveDefaultViewProps {
  systemViews: any[]
  companyViews: any[]
  customViews: any[]
  defaultView: DefaultView
}

/**
 * 获取当前显示的默认视图
 * @param props
 */
export function getActiveDefaultView(props: GetActiveDefaultViewProps) {
  const { systemViews = [], companyViews = [], customViews = [], defaultView } = props
  let activeDefaultView = undefined

  if (defaultView) {
    switch (defaultView.type) {
      case 'company':
        activeDefaultView = companyViews.filter(item => item.viewId === defaultView.viewId)[0]
        activeDefaultView && (activeDefaultView.isSystem = true)
        break
      case 'system':
        activeDefaultView = systemViews.filter(item => item.viewId === defaultView.viewId)[0]
        activeDefaultView && (activeDefaultView.isSystem = true)
        break
      case 'custom':
        activeDefaultView = customViews.filter(item => item.viewId === defaultView.viewId)[0]
        activeDefaultView && (activeDefaultView.isSystem = false)
        break
    }
  }

  if (!activeDefaultView) {
    activeDefaultView = { ...systemViews[0] }
    activeDefaultView.isSystem = true
  }

  return activeDefaultView
}
