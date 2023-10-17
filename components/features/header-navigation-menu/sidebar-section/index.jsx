import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'
import { SidebarItem } from '../sidebar-item'

export const SidebarSection = ({ menuItem }) => {
  const { name, children } = menuItem
  return (
    <>
      <Sidebar.Category title={name}>
        <Sidebar.List label={name}>
          {children.length > 0 &&
            children.map(menuLink => <SidebarItem key={menuLink._id} menuLink={menuLink} />)}
        </Sidebar.List>
      </Sidebar.Category>
    </>
  )
}
