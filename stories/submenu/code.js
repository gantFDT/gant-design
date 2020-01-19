const code =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})

function BasicUse() {
  const menuData = [
    {
      name: '个人设置',
      icon: <SubMenuIcon type='icon-xingming' />,
      path: 'personal',
    },
    {
      name: '语言偏好',
      icon: <SubMenuIcon type='icon-yuyan' />,
      path: 'preferences',
    },
    {
      name: '修改密码',
      icon: <SubMenuIcon type='icon-iconbi' />,
      path: 'editpwd',
    },
    {
      name: '关注领域',
      icon: <SubMenuIcon type='icon-mubiao' />,
      path: 'focus',
    },
    {
      name: '历史消息',
      icon: <SubMenuIcon type='icon-lishi' />,
      path: 'historymsg',
    },
    {
      name: '账号绑定',
      icon: <SubMenuIcon type='icon-bangding' />,
      path: 'accountbind',
    }
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].name)

  const onSelectedChange = (path, eventKey) => {
    setSelectedKey(eventKey);
  }

  return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      width={180}
      heightDiff={0}
      onSelectedChange={onSelectedChange}
      extra={
        <div id='menuExtra' style={{  padding:'10px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,height:'auto',width:'auto'}}>
          <div>
            <Avatar size={64} style={{height:'30px',width:'30px'}} src={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560143638308&di=bd43a25e740c8010cd803bffb6191a74&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201605%2F07%2F20160507191419_J2m8R.thumb.700_0.jpeg'} />
          </div>
        </div>
      }
    >
      <div style={{ padding: '20px' }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <BasicUse/>,
    mountNode,
);
`


const code1 =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})

function TopLayout() {
  const menuData = [
    {
      name: '个人设置',
      icon: <SubMenuIcon type='icon-xingming' />,
      path: 'personal',
    },
    {
      name: '语言偏好',
      icon: <SubMenuIcon type='icon-yuyan' />,
      path: 'preferences',
    },
    {
      name: '修改密码',
      icon: <SubMenuIcon type='icon-iconbi' />,
      path: 'editpwd',
    },
    {
      name: '关注领域',
      icon: <SubMenuIcon type='icon-mubiao' />,
      path: 'focus',
    },
    {
      name: '历史消息',
      icon: <SubMenuIcon type='icon-lishi' />,
      path: 'historymsg',
    },
    {
      name: '账号绑定',
      icon: <SubMenuIcon type='icon-bangding' />,
      path: 'accountbind',
    },
    
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].name)

  const onSelectedChange = (path, eventKey) => {
    setSelectedKey(eventKey);
  }

  return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      mode='horizontal'
      onSelectedChange={onSelectedChange}
    >
      <div style={{ padding: '20px' }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <TopLayout/>,
    mountNode,
);
`
const code2 =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})
  
function ExtraUse() {
  const menuData = [
    {
      name: '个人设置',
      icon: <SubMenuIcon type='icon-xingming' />,
      path: 'personal',
    },
    {
      name: '语言偏好',
      icon: <SubMenuIcon type='icon-yuyan' />,
      path: 'preferences',
    },
    {
      name: '修改密码',
      icon: <SubMenuIcon type='icon-iconbi' />,
      path: 'editpwd',
    },
    {
      name: '关注领域',
      icon: <SubMenuIcon type='icon-mubiao' />,
      path: 'focus',
    },
    {
      name: '历史消息',
      icon: <SubMenuIcon type='icon-lishi' />,
      path: 'historymsg',
    },
    {
      name: '账号绑定',
      icon: <SubMenuIcon type='icon-bangding' />,
      path: 'accountbind',
    },
    
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].name)

  const onSelectedChange = (path, eventKey) => {
    setSelectedKey(eventKey);
  }

  return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      collapsed={true}
      onSelectedChange={onSelectedChange}
    >
      <div style={{ padding: '20px' }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <ExtraUse/>,
    mountNode,
);
`
export default [code, code1,code2];