import '@r7/ui-section-menu/style.css'

import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import getProperties from 'fusion:properties'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { SectionMenu } from '@r7/ui-section-menu'

function SectionNavigationMenu({ customFields }) {
  const { sectionMenuConfig } = customFields
  const { arcSite } = useFusionContext()

  const { primaryColor } = getProperties(arcSite)

  const sectionMenuContent = useContent({
    source: sectionMenuConfig?.contentService,
    query: sectionMenuConfig?.contentConfigValues,
  })

  const sectionMenuData = sectionMenuContent?.children[0]?.children

  return (
    <SectionMenu label={sectionMenuContent.name} sectionColor={primaryColor}>
      <SectionMenu.List>
        {sectionMenuData.map(item => (
          <SectionMenu.Item key={item._id}>
            {item.children.length > 0 ? (
              <>
                <SectionMenu.Button id={item._id}>{item.name}</SectionMenu.Button>
                <SectionMenu.Submenu id={item._id}>
                  {item.children.map(subitem => (
                    <SectionMenu.SubmenuItem key={subitem._id}>
                      <SectionMenu.Link
                        href={subitem.navigation.menu_url}
                        title={subitem.navigation.nav_title}
                      >
                        {subitem.name}
                      </SectionMenu.Link>
                    </SectionMenu.SubmenuItem>
                  ))}
                </SectionMenu.Submenu>
              </>
            ) : (
              <SectionMenu.Link href={item.navigation.menu_url} title={item.navigation.nav_title}>
                {item.name}
              </SectionMenu.Link>
            )}
          </SectionMenu.Item>
        ))}
      </SectionMenu.List>
    </SectionMenu>
  )
}

SectionNavigationMenu.propTypes = {
  customFields: PropTypes.shape({
    sectionMenuConfig: PropTypes.contentConfig().tag({
      group: 'Configure Section Menu Content',
      label: 'Content Source',
    }),
  }),
}

SectionNavigationMenu.label = 'Section Menu - R7 Block'

SectionNavigationMenu.icon = 'arc-headline'

export default SectionNavigationMenu
