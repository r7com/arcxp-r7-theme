import React from 'react'
import '@r7/ui-footer-delivery/style.css'
import { SitemapFooter } from '@r7/ui-footer-delivery'

export const SectionItem = ({ sectionItem }) => {
  return (
    <SitemapFooter.SubmenuItem>
      <SitemapFooter.MenuLink
        openInNewTab={true}
        title={sectionItem.display_name}
        url={sectionItem.url}
      >
        {sectionItem.display_name}
      </SitemapFooter.MenuLink>
    </SitemapFooter.SubmenuItem>
  )
}
