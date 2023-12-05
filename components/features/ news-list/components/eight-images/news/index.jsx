import React from 'react'
import { Card } from '@r7/ui-card'
import { Image } from '@wpmedia/arc-themes-components'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import { setImage } from '../../../../../../util/image'
import '../../../default.scss'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  // note: collections items doesn't have the 'elements' to find the first image, so we need to have lead_art
  // How to discover the image file type?

  const imageToUse = setImage(content?.promo_items?.basic)
  const { arcSite } = useFusionContext()
  const RESIZER_URL = `https://newr7-${arcSite}-sandbox.web.arc-cdn.net/resizer/v2/`

  return (
    <Card
      className="eight-images__card"
      newsUrl={content?.canonical_url}
      newsUrlTitle={content?.headlines?.basic}
    >
      <Card.Image className="eight-images__figure">
        <Image
          className="news-list__image"
          src={imageToUse._id ? `${imageToUse._id}.jpg` : imageToUse.url}
          width={113}
          height={113}
          resizerURL={RESIZER_URL}
          alt={imageToUse.alt_text}
          resizedOptions={{
            auth: imageToUse?.auth[RESIZER_TOKEN_VERSION],
            smart: true,
          }}
        />
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
