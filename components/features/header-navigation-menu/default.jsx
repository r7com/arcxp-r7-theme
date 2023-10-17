import '@r7/ui-header-delivery/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { Header } from '@r7/ui-header-delivery'
import { SidebarMenu } from './sidebar-menu'
import { HeaderMenu } from './header-menu'

const HeaderNavigationMenu = props => {
  const { headerConfig, sidebarConfig } = props.customFields
  const { arcSite } = useFusionContext()

  const { primaryColor } = getProperties(arcSite)
  const headerContent = useContent({
    source: headerConfig?.contentService,
    query: headerConfig?.contentConfigValues,
  })
  const sidebarContent = useContent({
    source: sidebarConfig?.contentService,
    query: sidebarConfig?.contentConfigValues,
  })
  const headerMenuList = headerContent?.children[0]?.children
  const sidebarMenuList = sidebarContent?.children[0]?.children

  return (
    <Header bgColor={primaryColor}>
      <SidebarMenu menuList={sidebarMenuList} />
      <HeaderMenu menuList={headerMenuList} />
    </Header>
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

HeaderNavigationMenu.label = 'Header - R7 Block'

HeaderNavigationMenu.icon = 'arc-headline'

export default HeaderNavigationMenu
