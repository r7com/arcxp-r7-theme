import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarMenuSection } from './sidebar-menu-section'

export const SidebarMenu = ({ menuList }) => {
  const hasMenuSection = menuList?.children.length > 0

  return (
    <>
      <Sidebar.Toggle>MENU</Sidebar.Toggle>
      <Sidebar>
        {hasMenuSection &&
          menuList.children.map(menuItem => (
            <SidebarMenuSection key={menuItem._id} menuItem={menuItem} />
          ))}
      </Sidebar>
    </>
  )
}
