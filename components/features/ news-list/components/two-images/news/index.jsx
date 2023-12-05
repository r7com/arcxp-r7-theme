import React from 'react'
import { Card } from '@r7/ui-card'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../../../util/get-resize-params-from-ans-image'
import '../../../default.scss'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  // note: collections items doesn't have the 'elements' to find the first image, so we need to have lead_art
  const { arcSite } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  return (
    <Card
      className="two-images__card"
      newsUrl={content?.canonical_url}
      newsUrlTitle={content?.headlines?.basic}
    >
      <Card.Image className="two-images__figure" format="landscape" shadow>
        {content?.promo_items?.basic ? (
          <Image
            {...getResizeParamsFromANSImage(content.promo_items.basic, arcSite, 360, [360, 536])}
            className="news-list__image"
            alt={content.promo_items.basic.alt_text}
            resizedOptions={{
              auth: content.promo_items.basic.auth[RESIZER_TOKEN_VERSION],
              smart: true,
            }}
            sizes={[
              { isDefault: true, sourceSizeValue: '360px' },
              { sourceSizeValue: '536px', mediaCondition: '(min-width: 768px)' },
            ]}
          />
        ) : (
          <Image className="news-list__image" src={fallbackImage} alt={fallbackImageAlt} />
        )}
      </Card.Image>
      <div className="two-images__title-wrapper">
        <Card.HatWrapper>
          <Card.HatTitle color="high">{content?.taxonomy?.primary_section?.name}</Card.HatTitle>
        </Card.HatWrapper>
        <Card.Title color="high" fontStyle="heading-level-3">
          {content?.headlines?.basic}
        </Card.Title>
      </div>
    </Card>
  )
}
