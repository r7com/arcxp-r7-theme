import React from 'react'
import '@r7/ui-footer-delivery/style.css'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import { SectionItem } from '../SectionItem'

export const Section = ({ section }) => {
  return (
    <SitemapFooter.MenuItem>
      <SitemapFooter.MenuTitle>{section.name}</SitemapFooter.MenuTitle>
      <SitemapFooter.Submenu>
        {section?.children.length &&
          section?.children.map(sectionItem => (
            <SectionItem key={sectionItem._id} sectionItem={sectionItem} />
          ))}
      </SitemapFooter.Submenu>
    </SitemapFooter.MenuItem>
  )
}
