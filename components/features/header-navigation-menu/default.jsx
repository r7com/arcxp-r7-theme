import '@r7/ui-header-delivery/style.css'
import { Header, Menu } from '@r7/ui-header-delivery'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'

const HeaderNavigationMenu = props => {
  const { config } = props.customFields
  const { arcSite } = useFusionContext()

  const { primaryColor } = getProperties(arcSite)
  const content = useContent({
    source: config?.contentService,
    query: config?.contentConfigValues,
  })
  const navList = content?.children[0]?.children

  return (
    <Header bgColor={primaryColor}>
      <Menu.Root>
        <Menu.List>
          {navList.map(navLink => (
            <Menu.Item key={navLink._id}>{navLink.name}</Menu.Item>
          ))}
        </Menu.List>
      </Menu.Root>
    </Header>
  )
}

HeaderNavigationMenu.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Content Source',
    }),
  }),
}

HeaderNavigationMenu.label = 'Header - R7 Block'

HeaderNavigationMenu.icon = 'arc-headline'

export default HeaderNavigationMenu
