import '@r7/ui-header-delivery/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { Header } from '@r7/ui-header-delivery'
import { SidebarMenu } from './components/sidebar-menu'
import { HeaderMenu } from './components/header-menu'
import { HeaderSocials } from './components/header-socials'

const HeaderNavigationMenu = props => {
  const { headerConfig, sidebarConfig } = props.customFields
  const { arcSite } = useFusionContext()

  const { primaryColor, websiteDomain, primaryLogo, primaryLogoAlt } = getProperties(arcSite)

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
      <SidebarMenu menuList={sidebarContent} />
      <HeaderMenu menuList={headerContent} />
      <HeaderSocials />
      <Header.SearchToggle />
      <Header.Search />
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
  }),
}

HeaderNavigationMenu.label = 'Header Main Navigation - R7 Block'

HeaderNavigationMenu.icon = 'arc-headline'

export default HeaderNavigationMenu
