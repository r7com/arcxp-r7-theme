import React from 'react'
import '@r7/ui-footer-delivery/style.css'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import { Section } from '../Section'

export const Column = ({ column }) => {
  return (
    <SitemapFooter.MenuList>
      {column?.children.length &&
        column?.children.map(section => <Section key={section._id} section={section} />)}
    </SitemapFooter.MenuList>
  )
}
