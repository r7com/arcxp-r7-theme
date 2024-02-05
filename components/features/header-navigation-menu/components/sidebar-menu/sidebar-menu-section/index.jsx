import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarMenuItem } from '../sidebar-menu-item'

export const SidebarMenuSection = ({ menuItem }) => {
  const { name, children } = menuItem

  return (
    children.length > 0 && (
      <Sidebar.Category title={name}>
        <Sidebar.List label={name}>
          {children.map(menuLink => (
            <SidebarMenuItem key={menuLink._id} menuLink={menuLink} />
          ))}
        </Sidebar.List>
      </Sidebar.Category>
    )
  )
}
