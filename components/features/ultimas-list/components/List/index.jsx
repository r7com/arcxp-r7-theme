import React, { useState } from 'react'
import { Stack, HeadingSection } from '@wpmedia/arc-themes-components'
import { SimpleListContent } from '../ListContent'
import { SimpleListHeading } from '../ListHeading'

export const SimpleList = props => {
  const { className, arcSite, customFields, id = '', primaryColor, targetFallbackImage } = props
  const [size, setSize] = useState(customFields.listContentConfig.contentConfigValues.size)
  const clickHandler = () => {
    setSize(prev => prev + customFields.loadMoreSize)
  }

  return (
    <HeadingSection>
      <Stack key={id} className={className}>
        {customFields.title ? (
          <SimpleListHeading
            className={className}
            primaryColor={primaryColor}
            title={customFields.title}
          />
        ) : null}
        <SimpleListContent
          contentService={customFields.listContentConfig.contentService}
          contentConfigValues={customFields.listContentConfig.contentConfigValues}
          size={size}
          className={className}
          arcSite={arcSite}
          targetFallbackImage={targetFallbackImage}
        />
        <div className={`${className}__btn-container`}>
          <button
            onClick={clickHandler}
            className={`${className}__btn`}
            style={{ backgroundColor: primaryColor }}
          >
            Veja mais Notícias
          </button>
        </div>
      </Stack>
    </HeadingSection>
  )
}
