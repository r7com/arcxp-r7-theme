import React, { useState } from 'react'
import { Stack, HeadingSection } from '@wpmedia/arc-themes-components'
import { UltimasListItem } from '../ListItem'

export const UltimasList = props => {
  const {
    className,
    arcSite,
    customFields,
    id = '',
    primaryColor,
    websiteDomain,
    websiteName,
    storyId,
    isAdmin,
  } = props
  const [size, setSize] = useState(customFields.listContentConfig.contentConfigValues.feedSize)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const clickHandler = () => {
    setSize(prev => prev + customFields.listContentConfig.contentConfigValues.feedSize)
    setIsLoading(true)
  }
  return (
    <HeadingSection>
      <Stack key={id} className={className}>
        <UltimasListItem
          customFields={customFields}
          className={className}
          arcSite={arcSite}
          websiteDomain={websiteDomain}
          websiteName={websiteName}
          setIsLoading={setIsLoading}
          size={size}
          storyId={storyId}
          isLoading={isLoading}
          setSize={setSize}
          setIsDisabled={setIsDisabled}
          isAdmin={isAdmin}
        />
        {isLoading ? (
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
              disabled={isDisabled}
            >
              Veja mais Notícias
            </button>
          </div>
        )}
      </Stack>
    </HeadingSection>
  )
}
