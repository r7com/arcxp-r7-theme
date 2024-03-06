import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarItem } from '../sidebar-item'

export const SidebarSubmenu = ({ submenu }) => {
  return (
    <Sidebar.Submenu id={submenu._id}>
      <Sidebar.List label={submenu.name}>
        {submenu.children.map(submenuItem => {
          return (
            <SidebarItem
              key={submenuItem._id}
              menuItem={submenuItem}
              parentSubmenuId={submenu._id}
            />
          )
        })}
      </Sidebar.List>
    </Sidebar.Submenu>
  )
}
