import React from 'react'
import {
  Conditional,
  Image as DefaultImage,
  Link,
  MediaItem,
  formatCredits,
} from '@wpmedia/arc-themes-components'
import { useFusionContext } from 'fusion:context'
import getResizeParamsFromANSImage from '../../get-resize-params-from-ans-image'

export const Image = ({ item, customFields, className, width, height }) => {
  const { arcSite } = useFusionContext()
  const { hideImageCaption, hideImageCredits, hideImageTitle } = customFields
  const {
    additional_properties: { link = '' } = {},
    alt_text: altText,
    caption,
    credits,
    subtitle,
    url,
    vanity_credits: vanityCredits,
  } = item
  const formattedCredits = formatCredits(vanityCredits || credits)

  if (!url) {
    return null
  }

  return (
    <MediaItem
      className={className}
      caption={!hideImageCaption ? caption : null}
      credit={!hideImageCredits ? formattedCredits : null}
      title={!hideImageTitle ? subtitle : null}
    >
      <Conditional component={Link} condition={link} href={link}>
        <div
          className="b-article-body__image-wrapper"
          style={{ width: width ?? '100%', height: height ?? '100%' }}
        >
          <DefaultImage
            {...getResizeParamsFromANSImage(item, arcSite, item.width, [390, 460, 660, 770])}
            alt={altText}
          />
        </div>
      </Conditional>
    </MediaItem>
  )
}
