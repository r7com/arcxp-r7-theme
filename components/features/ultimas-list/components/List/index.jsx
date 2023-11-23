import React, { useState } from 'react'
import { Stack, HeadingSection } from '@wpmedia/arc-themes-components'
import { SimpleListContent } from '../ListContent'
import { SimpleListHeading } from '../ListHeading'

export const SimpleList = props => {
  const {
    className,
    arcSite,
    customFields,
    id = '',
    primaryColor,
    targetFallbackImage,
    websiteDomain,
  } = props
  const [size, setSize] = useState(customFields.listContentConfig.contentConfigValues.feedSize)
  const [loading, setLoading] = useState(false)
  const clickHandler = () => {
    setSize(prev => prev + customFields.loadMoreSize)
    setLoading(true)
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
          customFields={customFields}
          size={size}
          className={className}
          arcSite={arcSite}
          websiteDomain={websiteDomain}
          targetFallbackImage={targetFallbackImage}
          setLoading={setLoading}
        />

        {loading ? (
          <div className={`${className}__loader-container`}>
            <div
              className={`${className}__loader`}
              style={{ backgroundColor: primaryColor, color: primaryColor }}
            />
          </div>
        ) : (
          <div className={`${className}__btn-container`}>
            <button
              onClick={clickHandler}
              className={`${className}__btn`}
              style={{ backgroundColor: primaryColor }}
            >
              Veja mais Notícias
            </button>
          </div>
        )}
      </Stack>
    </HeadingSection>
  )
}
