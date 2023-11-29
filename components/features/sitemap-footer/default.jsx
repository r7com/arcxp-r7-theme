import '@r7/ui-footer-delivery/style.css'
import React from 'react'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'

const SitemapFooterBlock = props => {
  const { config } = props.customFields
  const content = useContent({
    source: config?.contentService,
    query: config?.contentConfigValues,
  })
  if (!content) return null
  const columns = content?.children
  return (
    <SitemapFooter.Root>
      <SitemapFooter.MenuList>
        {columns.length > 0 &&
          columns.map(column => (
            <SitemapFooter.MenuItem key={column._id}>
              <SitemapFooter.MenuTitle>
                <SitemapFooter.Dropdown id={column._id}>
                  <SitemapFooter.MenuLink title={column.name} href={column.navigation?.menu_url}>
                    {column.name}
                  </SitemapFooter.MenuLink>
                </SitemapFooter.Dropdown>
              </SitemapFooter.MenuTitle>
              <SitemapFooter.Submenu id={column._id}>
                {column.children.length > 0 &&
                  column.children.map(
                    submenu =>
                      submenu.navigation && (
                        <SitemapFooter.SubmenuItem key={submenu._id}>
                          <SitemapFooter.MenuLink
                            title={submenu.navigation.nav_title}
                            href={submenu.navigation.menu_url}
                          >
                            {submenu.name}
                          </SitemapFooter.MenuLink>
                        </SitemapFooter.SubmenuItem>
                      ),
                  )}
              </SitemapFooter.Submenu>
            </SitemapFooter.MenuItem>
          ))}
      </SitemapFooter.MenuList>
    </SitemapFooter.Root>
  )
}

SitemapFooterBlock.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Content Config',
    }),
  }),
}

SitemapFooterBlock.label = 'Sitemap Footer - R7 Block'

export default SitemapFooterBlock
