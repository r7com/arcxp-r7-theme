import React from 'react'
import { Sidebar, Header } from '@r7/ui-header-delivery'
import { SidebarMenuSection } from './sidebar-menu-section'

export const SidebarMenu = ({ menuList, alt, logoUrl, link }) => {
  const hasMenuSection = menuList?.children.length > 0

  return (
    <>
      <Sidebar.Toggle>MENU</Sidebar.Toggle>
      <Sidebar>
        <Sidebar.Category title={'Conheça também'}>
          <Sidebar.List label={'list'}>
            <Sidebar.Item>
              <Header.PlayPlusLogo alt={alt} logoUrl={logoUrl} link={link} />
            </Sidebar.Item>
          </Sidebar.List>
        </Sidebar.Category>
        {hasMenuSection &&
          menuList.children.map(menuItem => (
            <SidebarMenuSection key={menuItem._id} menuItem={menuItem} />
          ))}
      </Sidebar>
    </>
  )
}
