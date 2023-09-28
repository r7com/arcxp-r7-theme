import React from 'react'
import '@r7/ui-footer-delivery/style.css'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'

const SitemapFooterBlock = props => {
  const { config } = props.customFields
  const content = useContent({
    source: config?.contentService,
    query: config?.contentConfigValues,
  })
  const columns = content?.children[0]?.children
  return (
    <SitemapFooter.Root>
      <SitemapFooter.Container>
        {columns.length &&
          columns.map(column => {
            return (
              <SitemapFooter.MenuList key={column._id}>
                {column?.children.map(section => {
                  return (
                    <SitemapFooter.MenuItem key={section._id}>
                      <SitemapFooter.MenuTitle>{section.name}</SitemapFooter.MenuTitle>
                      <SitemapFooter.Submenu>
                        {section?.children.map(link => {
                          return (
                            <SitemapFooter.SubmenuItem key={link._id}>
                              <SitemapFooter.MenuLik
                                openInNewTab={true}
                                title={link.display_name}
                                url={link.url}
                              >
                                {link.display_name}
                              </SitemapFooter.MenuLik>
                            </SitemapFooter.SubmenuItem>
                          )
                        })}
                      </SitemapFooter.Submenu>
                    </SitemapFooter.MenuItem>
                  )
                })}
              </SitemapFooter.MenuList>
            )
          })}
      </SitemapFooter.Container>
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
