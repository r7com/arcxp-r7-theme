import '@r7/ui-footer-delivery/style.css'
import React from 'react'
import { SitemapFooter } from '@r7/ui-footer-delivery'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { Column } from './Column'

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
        {columns?.length ? columns.map(column => <Column key={column._id} column={column} />) : ''}
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
