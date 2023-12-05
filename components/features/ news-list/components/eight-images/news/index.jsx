import React from 'react'
import { Card } from '@r7/ui-card'
import { Image } from '@wpmedia/arc-themes-components'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import getResizeParamsFromANSImage from '../../../../../../util/get-resize-params-from-ans-image'
import '../../../default.scss'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  const { arcSite } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  return (
    <Card
      className="eight-images__card"
      newsUrl={content?.canonical_url}
      newsUrlTitle={content?.headlines?.basic}
    >
      <Card.Image className="eight-images__figure">
        {content?.promo_items?.basic ? (
          <Image
            {...getResizeParamsFromANSImage(content.promo_items.basic, arcSite, 113)}
            className="news-list__image"
            alt={content.promo_items.basic.alt_text}
            resizedOptions={{
              auth: content.promo_items.basic.auth[RESIZER_TOKEN_VERSION],
              smart: true,
            }}
            height={113}
          />
        ) : (
          <Image
            className="news-list__image"
            src={fallbackImage}
            alt={fallbackImageAlt}
            width={113}
            height={113}
          />
        )}
      </Card.Image>
      <div>
        <Card.HatWrapper>
          <Card.HatTitle>{content?.taxonomy?.primary_section?.name}</Card.HatTitle>
        </Card.HatWrapper>
        <Card.Title fontStyle="heading-level-4">{content?.headlines?.basic}</Card.Title>
      </div>
    </Card>
  )
}
