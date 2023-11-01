import '@r7/ui-footer-delivery/style.css'
import { Institutional } from '@r7/ui-footer-delivery'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import LinksList from './LinksList'

const Footer = props => {
  const { navigationLabelsList, navigationLinksList } = props.customFields
  const { arcSite, globalContent } = useFusionContext()

  const { websiteName, primaryColor } = getProperties(arcSite)

  const sectionContent =
    globalContent?.node_type === 'section'
      ? globalContent
      : useContent({
          source: 'site-service-hierarchy',
          query: {
            hierarchy: '',
            sectionId: globalContent.websites?.[arcSite].website_section._id,
          },
        })

  const currentYear = new Date().getFullYear()

  return (
    <Institutional.Root bgColor={primaryColor}>
      <Institutional.Content>
        <Institutional.Wrapper>
          <Institutional.Logo />
          <Institutional.Editorial editorialName={sectionContent?.name ?? websiteName} />
        </Institutional.Wrapper>
        <Institutional.Copyright>
          Todos os direitos reservados - 2009-{currentYear} - Rádio e Televisão Record S.A
        </Institutional.Copyright>
      </Institutional.Content>
      <LinksList labels={navigationLabelsList} links={navigationLinksList} />
    </Institutional.Root>
  )
}

Footer.propTypes = {
  customFields: PropTypes.shape({
    navigationLabelsList: PropTypes.list.tag({
      group: 'Navigation Links',
      label: 'Navigation Labels',
    }),
    navigationLinksList: PropTypes.list.tag({
      group: 'Navigation Links',
      label: 'Navigation Links',
    }),
  }),
}

Footer.label = 'Footer - R7 Block'

Footer.icon = 'arc-footer'

export default Footer
