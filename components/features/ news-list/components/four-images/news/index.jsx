import React from 'react'
import { Card } from '@r7/ui-card'
import { useFusionContext } from 'fusion:context'
import { Image } from '@wpmedia/arc-themes-components'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { setImage } from '../../../../../../util/image'
import '../../../default.scss'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  // note: collections items doesn't have the 'elements' to find the first image, so we need to have lead_art
  const imageToUse = setImage(content?.promo_items?.basic)
  const { arcSite } = useFusionContext()
  const RESIZER_URL = `https://newr7-${arcSite}-sandbox.web.arc-cdn.net/resizer/v2/`

  return (
    <Card
      className="four-images__card"
      newsUrl={content?.canonical_url}
      newsUrlTitle={content?.headlines?.basic}
    >
      <Card.Image className="four-images__figure" format="landscape">
        <Image
          className="news-list__image"
          src={imageToUse._id ? `${imageToUse._id}.jpg` : imageToUse.url}
          width={360}
          height={202}
          resizerURL={RESIZER_URL}
          alt={imageToUse.alt_text}
          responsiveImages={[260, 360]}
          resizedOptions={{
            auth: imageToUse?.auth[RESIZER_TOKEN_VERSION],
            smart: true,
          }}
          sizes={[
            { isDefault: true, sourceSizeValue: '360px' },
            { sourceSizeValue: '260px', mediaCondition: '(min-width: 768px)' },
          ]}
        />
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
