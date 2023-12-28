import React from 'react'
import { Menu } from '@r7/ui-header-delivery'

export const HeaderMenu = ({ menuList }) => {
  const hasMenu = menuList?.children.length > 0
  console.log(menuList)

  if (!hasMenu) return null

  return (
    <Menu>
      <Menu.List>
        {menuList.children.map(item => {
          return (
            <Menu.Item key={item._id}>
              <Menu.Link href={item.navigation.menu_url} title={item.navigation.nav_title}>
                {item.name}
              </Menu.Link>
            </Menu.Item>
          )
        })}
      </Menu.List>
    </Menu>
  )
}
