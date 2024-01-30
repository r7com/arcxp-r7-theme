import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarSubmenuItem } from './sidebar-submenu-item'

export const SidebarSubmenu = ({ submenu }) => {
  return (
    <Sidebar.Submenu id={submenu._id}>
      <Sidebar.List label={submenu.name}>
        {submenu.children.map(submenuItem =>
          submenuItem.node_type === 'section' && submenuItem.children.length > 0 ? (
            <Sidebar.Category key={submenuItem._id} title={submenuItem.name}>
              <Sidebar.List label={submenuItem.name}>
                {submenuItem?.children.map(submenuLink => {
                  return <SidebarSubmenuItem key={submenuLink._id} item={submenuLink} />
                })}
              </Sidebar.List>
            </Sidebar.Category>
          ) : (
            <SidebarSubmenuItem key={submenuItem._id} item={submenuItem} />
          ),
        )}
      </Sidebar.List>
    </Sidebar.Submenu>
  )
}
