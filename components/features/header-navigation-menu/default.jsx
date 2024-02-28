import '@r7/ui-header-delivery/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { Header, InternalsHeader } from '@r7/ui-header-delivery'
import { getSectionInfo } from '../../../util/get-section-info'
import { SidebarMenu } from './components/sidebar-menu'
import { HeaderMenu } from './components/header-menu'
import { HeaderSocials } from './components/header-socials'

const HeaderNavigationMenu = ({ customFields }) => {
  const { headerConfig, sidebarConfig, internalHeaderTrigger } = customFields

  const defaultSelector = 'h1'

  const { arcSite, metaValue, globalContent } = useFusionContext()

  const {
    primaryColor,
    websiteDomain,
    playPlusDomain,
    primaryLogo,
    primaryLogoAlt,
    secondaryLogo,
    secondaryLogoAlt,
    playPlusLogo,
    playPlusLogoAlt,
    playPlusLogoWhite,
    playPlusLogoWhiteAlt,
  } = getProperties(arcSite)

  const isInternal = Boolean(
    metaValue('page-type') && !['homepage', 'section'].includes(metaValue('page-type')),
  )

  const { sectionName, sectionUrl } = getSectionInfo(globalContent, arcSite)

  /* 
   source:site-service-hierarchy
   hierarchy: header-navigation-menu
  */
  const headerContent = useContent({
    source: headerConfig?.contentService,
    query: headerConfig?.contentConfigValues,
  })
  /* 
   source:site-service-hierarchy
   hierarchy: sidebar-navigation-menu
  */
  const sidebarContent = useContent({
    source: sidebarConfig?.contentService,
    query: sidebarConfig?.contentConfigValues,
  })

  return (
    <Header.MainSection bgColor={primaryColor}>
      <Header.Logo link={websiteDomain} logoUrl={primaryLogo} alt={primaryLogoAlt} />
      <SidebarMenu
        menuList={sidebarContent}
        alt={playPlusLogoAlt}
        logoUrl={playPlusLogo}
        link={playPlusDomain}
      />
      <HeaderMenu menuList={headerContent} />
      <Header.PlayPlusLogo
        link={playPlusDomain}
        logoUrl={playPlusLogoWhite}
        alt={playPlusLogoWhiteAlt}
        color="white"
      />
      <HeaderSocials />
      {isInternal && (
        <InternalsHeader triggerElementSelector={internalHeaderTrigger || defaultSelector}>
          <Header.Logo link={websiteDomain} logoUrl={secondaryLogo} alt={secondaryLogoAlt} />
          <InternalsHeader.SectionName sectionUrl={sectionUrl}>
            {sectionName}
          </InternalsHeader.SectionName>

          <InternalsHeader.Title>{globalContent?.headlines?.basic}</InternalsHeader.Title>
        </InternalsHeader>
      )}
    </Header.MainSection>
  )
}

HeaderNavigationMenu.propTypes = {
  customFields: PropTypes.shape({
    headerConfig: PropTypes.contentConfig().tag({
      group: 'Configure Header Content',
      label: 'Content Source',
    }),
    sidebarConfig: PropTypes.contentConfig().tag({
      group: 'Configure Sidebar Content',
      label: 'Content Source',
    }),
    internalHeaderTrigger: PropTypes.string.tag({
      group: 'Configure Internals Header trigger',
      label: 'Elemento que ativa o header para internas',
    }),
  }),
}

HeaderNavigationMenu.label = 'Menu Principal - R7 Block'

HeaderNavigationMenu.icon = 'arc-headline'

export default HeaderNavigationMenu
