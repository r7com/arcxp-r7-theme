import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'

export const SidebarSubmenuItem = ({ item }) => {
  return (
    <>
      <Sidebar.Item key={item._id}>
        <Sidebar.Link
          style={{ textTransform: 'capitalize' }}
          title={item.display_name}
          href={item.url}
        >
          {item.display_name}
        </Sidebar.Link>
      </Sidebar.Item>
    </>
  )
}
