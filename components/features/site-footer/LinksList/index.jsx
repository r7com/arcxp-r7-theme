import '@r7/ui-footer-delivery/style.css'
import { Institutional } from '@r7/ui-footer-delivery'
import React from 'react'

const LinksList = ({ labels, links }) => {
  return (
    <Institutional.List>
      {labels?.length &&
        links?.length &&
        labels.map((label, index) => {
          if (links[index]) {
            return (
              <Institutional.Item key={`${label}${index}`}>
                <Institutional.Link href={links[index]} title={label}>
                  {label}
                </Institutional.Link>
              </Institutional.Item>
            )
          }
        })}
    </Institutional.List>
  )
}

export default LinksList
