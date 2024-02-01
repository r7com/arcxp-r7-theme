import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { BriefNews } from './components/BriefNews'
import { FormattedImage } from './components/FormattedImage'
import { Poll } from './components/Poll'
import { Quiz } from './components/Quiz'

const CustomEmbed = ({ element, classPrefix, customFields }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const { embed, subtype } = element
  const COMPONENT_CLASS_NAME = `${classPrefix}-custom-embed`
  switch (subtype) {
    case 'brief_news':
      return embed.config ? (
        <BriefNews className={COMPONENT_CLASS_NAME} primaryColor={primaryColor} item={embed} />
      ) : null
    case 'formatted_image':
      return embed.config ? (
        <FormattedImage className={classPrefix} customFields={customFields} item={embed} />
      ) : null
    case 'poll':
      return embed.config ? <Poll className={COMPONENT_CLASS_NAME} item={embed} /> : null
    case 'quiz':
      return embed.config ? <Quiz className={COMPONENT_CLASS_NAME} item={embed} /> : null
    default:
      return null
  }
}

export default CustomEmbed
