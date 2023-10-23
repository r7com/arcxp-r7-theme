import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarMenuSection } from './sidebar-menu-section'

export const SidebarMenu = ({ menuList }) => {
  return (
    <>
      <Sidebar.Toggle>MENU</Sidebar.Toggle>
      <Sidebar>
        {menuList &&
          menuList.map(menuItem => <SidebarMenuSection key={menuItem._id} menuItem={menuItem} />)}
      </Sidebar>
    </>
  )
}
