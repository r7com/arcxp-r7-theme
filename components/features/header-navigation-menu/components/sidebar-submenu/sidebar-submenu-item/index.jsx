import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'

function renderItem(item) {
  if (item.navigation?.menu_url) {
    return (
      <Sidebar.Link
        href={item.navigation.menu_url}
        title={item.navigation.nav_title}
        style={{ textTransform: 'capitalize' }}
      >
        {item.name}
      </Sidebar.Link>
    )
  }

  return (
    <Sidebar.Link href={item.url} title={item.display_name} style={{ textTransform: 'capitalize' }}>
      {item.display_name}
    </Sidebar.Link>
  )
}

export const SidebarSubmenuItem = ({ item }) => {
  return <Sidebar.Item key={item._id}>{renderItem(item)}</Sidebar.Item>
}
