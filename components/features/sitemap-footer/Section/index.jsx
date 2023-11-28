import React from 'react'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import { SectionItem } from '../SectionItem'

export const Section = ({ section }) => {
  return (
    <SitemapFooter.MenuItem>
      <SitemapFooter.MenuTitle>
        {section?.navigation?.menu_url ? (
          <SitemapFooter.MenuLink
            openInNewTab={true}
            title={section.navigation.nav_title}
            url={section.navigation.menu_url}
          >
            {section.navigation.nav_title}
          </SitemapFooter.MenuLink>
        ) : (
          section?.navigation?.nav_title
        )}
      </SitemapFooter.MenuTitle>
      <SitemapFooter.Submenu>
        {section?.children.length
          ? section?.children.map(sectionItem => (
              <SectionItem key={sectionItem._id} sectionItem={sectionItem} />
            ))
          : ''}
      </SitemapFooter.Submenu>
    </SitemapFooter.MenuItem>
  )
}
