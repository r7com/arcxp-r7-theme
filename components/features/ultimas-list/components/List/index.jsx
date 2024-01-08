import React, { useState } from 'react'
import { Stack, HeadingSection } from '@wpmedia/arc-themes-components'
import { SimpleListContent } from '../ListContent'

export const SimpleList = props => {
  const { className, arcSite, customFields, id = '', primaryColor, websiteDomain, storyId } = props
  const [size, setSize] = useState(customFields.listContentConfig.contentConfigValues.feedSize)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const clickHandler = () => {
    setSize(prev => prev + customFields.loadMoreSize)
    setLoading(true)
  }
  return (
    <HeadingSection>
      <Stack key={id} className={className}>
        <SimpleListContent
          customFields={customFields}
          className={className}
          arcSite={arcSite}
          websiteDomain={websiteDomain}
          setLoading={setLoading}
          setDisabled={setDisabled}
          size={size}
          storyId={storyId}
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
              disabled={disabled}
            >
              Veja mais Notícias
            </button>
          </div>
        )}
      </Stack>
    </HeadingSection>
  )
}
