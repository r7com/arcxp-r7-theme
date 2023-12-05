import React from 'react'
import { Card } from '@r7/ui-card'
import { useFusionContext } from 'fusion:context'
import { Image } from '@wpmedia/arc-themes-components'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import getProperties from 'fusion:properties'
import getResizeParamsFromANSImage from '../../../../../../util/get-resize-params-from-ans-image'
import '../../../default.scss'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  const { arcSite } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  return (
    <Card
      className="four-images__card"
      newsUrl={content?.canonical_url}
      newsUrlTitle={content?.headlines?.basic}
    >
      <Card.Image className="four-images__figure" format="landscape">
        {content?.promo_items?.basic ? (
          <Image
            {...getResizeParamsFromANSImage(content.promo_items.basic, arcSite, 360, [260, 360])}
            className="news-list__image"
            alt={content.promo_items.basic.alt_text}
            resizedOptions={{
              auth: content.promo_items.basic.auth[RESIZER_TOKEN_VERSION],
              smart: true,
            }}
            sizes={[
              { isDefault: true, sourceSizeValue: '360px' },
              { sourceSizeValue: '260px', mediaCondition: '(min-width: 768px)' },
            ]}
          />
        ) : (
          <Image className="news-list__image" src={fallbackImage} alt={fallbackImageAlt} />
        )}
      </Card.Image>
      <div>
        <Card.HatWrapper>
          <Card.HatTitle>{content?.taxonomy?.primary_section?.name}</Card.HatTitle>
        </Card.HatWrapper>
        <Card.Title fontStyle="heading-level-3">{content?.headlines?.basic}</Card.Title>
      </div>
    </Card>
  )
}
