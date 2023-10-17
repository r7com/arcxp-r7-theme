import React from 'react'
import { Sidebar } from '@r7/ui-header-delivery'

export const SidebarItem = ({ menuLink }) => {
  return (
    <>
      <Sidebar.Item>
        {menuLink.children?.length ? (
          <>
            <Sidebar.Button id={menuLink._id}>{menuLink.name}</Sidebar.Button>
            <Sidebar.Submenu id={menuLink._id}>
              <Sidebar.List label={menuLink.name}>
                {menuLink.children.map(({ _id, display_name, url }) => {
                  return (
                    <Sidebar.Item key={_id}>
                      <Sidebar.Link
                        style={{ textTransform: 'capitalize' }}
                        title={display_name}
                        href={url}
                      >
                        {display_name}
                      </Sidebar.Link>
                    </Sidebar.Item>
                  )
                })}
              </Sidebar.List>
            </Sidebar.Submenu>
          </>
        ) : (
          <Sidebar.Link href={menuLink.url} title={menuLink.display_name}>
            {menuLink.display_name}
          </Sidebar.Link>
        )}
      </Sidebar.Item>
    </>
  )
}
