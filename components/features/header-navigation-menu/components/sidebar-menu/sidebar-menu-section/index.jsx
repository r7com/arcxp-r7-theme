import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarItem } from '../../sidebar-item'

export const SidebarMenuSection = ({ menuItem }) => {
  const { name, children } = menuItem

  return (
    children.length > 0 && (
      <Sidebar.Category title={name}>
        <Sidebar.List label={name}>
          {children.map(menuLink => (
            <SidebarItem key={menuLink._id} menuItem={menuLink} />
          ))}
        </Sidebar.List>
      </Sidebar.Category>
    )
  )
}
