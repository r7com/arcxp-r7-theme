import './default.scss'
import '@r7/ui-footer-delivery/style.css'
import { Institutional } from '@r7/ui-footer-delivery'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import LinksList from './LinksList'

const Footer = () => {
  const { arcSite } = useFusionContext()

  const { websiteName, primaryColor } = getProperties(arcSite)
  const BLOCK_CLASS_NAME = 'b-site-footer'
  const sectionContent = useContent({
    source: 'custom-site-service-hierarchy',
    query: {
      hierarchy: 'footer-institutional',
      sectionId: '/',
      siteId: 'r7',
    },
  })

  const currentYear = new Date().getFullYear()

  return (
    <div
      className={BLOCK_CLASS_NAME}
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <div className={`${BLOCK_CLASS_NAME}__wrapper`}>
        <Institutional.Content>
          <Institutional.Wrapper>
            <Institutional.Logo />
            <Institutional.Editorial editorialName={sectionContent?.name ?? websiteName} />
          </Institutional.Wrapper>
          <Institutional.Copyright>
            Todos os direitos reservados - 2009-{currentYear} - Rádio e Televisão Record S.A
          </Institutional.Copyright>
        </Institutional.Content>
        <LinksList links={sectionContent?.children?.[0]?.children} />
      </div>
    </div>
  )
}

Footer.label = 'Footer - R7 Block'
Footer.icon = 'arc-footer'
Footer.static = true

export default Footer
