import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarSubmenu } from '../sidebar-submenu'

function renderLink(item, parentSubmenuId) {
  if (item?.children?.length > 0) {
    return (
      <>
        <Sidebar.Button id={item._id} parentSubmenuId={parentSubmenuId}>
          {item.name}
        </Sidebar.Button>
        <SidebarSubmenu submenu={item} />
      </>
    )
  }

  if (item?.navigation?.menu_url) {
    return (
      <Sidebar.Link href={item.navigation.menu_url} title={item.navigation.nav_title}>
        {item.name}
      </Sidebar.Link>
    )
  }

  return (
    <Sidebar.Link href={item?.url} title={item?.display_name}>
      {item?.display_name}
    </Sidebar.Link>
  )
}

export const SidebarItem = ({ key, menuItem, parentSubmenuId }) => {
  return <Sidebar.Item key={key}>{renderLink(menuItem, parentSubmenuId)}</Sidebar.Item>
}
