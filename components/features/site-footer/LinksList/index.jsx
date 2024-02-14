import { Institutional } from '@r7/ui-footer-delivery'
import React from 'react'

const LinksList = ({ links }) => {
  return (
    <Institutional.List>
      {links?.map(link => {
        return (
          <Institutional.Item key={link._id}>
            <Institutional.Link href={link.url} title={link.display_name}>
              {link.display_name}
            </Institutional.Link>
          </Institutional.Item>
        )
      })}
    </Institutional.List>
  )
}

export default LinksList
