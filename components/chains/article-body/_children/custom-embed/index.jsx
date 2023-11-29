import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { BriefNews } from './components/BriefNews'

const CustomEmbed = ({ element, classPrefix }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const { embed, subtype } = element
  const COMPONENT_CLASS_NAME = `${classPrefix}-custom-embed`
  switch (subtype) {
    case 'brief_news':
      return embed.config ? (
        <BriefNews className={COMPONENT_CLASS_NAME} primaryColor={primaryColor} item={embed} />
      ) : null
  }
}

export default CustomEmbed
