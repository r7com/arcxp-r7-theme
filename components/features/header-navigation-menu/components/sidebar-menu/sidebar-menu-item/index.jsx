import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarSubmenu } from '../../sidebar-submenu'

function renderItem(menuLink) {
  if (menuLink.children?.length > 0) {
    return (
      <>
        <Sidebar.Button id={menuLink._id}>{menuLink.name}</Sidebar.Button>
        <SidebarSubmenu submenu={menuLink} />
      </>
    )
  }

  if (menuLink.navigation) {
    return (
      <Sidebar.Link href={menuLink.navigation.menu_url} title={menuLink.navigation.nav_title}>
        {menuLink.name}
      </Sidebar.Link>
    )
  }

  return (
    <Sidebar.Link href={menuLink.url} title={menuLink.display_name}>
      {menuLink.display_name}
    </Sidebar.Link>
  )
}

export const SidebarMenuItem = ({ menuLink }) => {
  return (
    <>
      <Sidebar.Item>{renderItem(menuLink)}</Sidebar.Item>
    </>
  )
}
