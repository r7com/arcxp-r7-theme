import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarSubmenu } from '../../sidebar-submenu'

export const SidebarMenuItem = ({ menuLink }) => {
  return (
    <>
      <Sidebar.Item>
        {menuLink.children?.length > 0 ? (
          <>
            <Sidebar.Button id={menuLink._id}>{menuLink.name}</Sidebar.Button>
            <SidebarSubmenu submenu={menuLink} />
          </>
        ) : (
          <Sidebar.Link href={menuLink.url} title={menuLink.display_name}>
            {menuLink.display_name}
          </Sidebar.Link>
        )}
      </Sidebar.Item>
    </>
  )
}
