import React from 'react'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'

export const News = ({ content }) => {
  // note: collections items doesn't have the 'elements' to find the first image, so we need to have lead_art
  const imageToUse = content?.promo_items?.lead_art || {
    alt_text: 'Logomarga do Portal R7',
    url: 'https://img.r7.com/images/r7-30072019142631584?crop_position=c',
  }

  return (
    <Card className="relative">
      <Card.Image className="w-full" format="landscape" shadow>
        <img alt={imageToUse.alt_text} className="w-full" src={imageToUse.url} />
      </Card.Image>
      <div className="absolute bottom-0 p-xxxs">
        <Card.HatWrapper>
          <Card.HatTitle color="high">{content?.taxonomy?.primary_section?.name}</Card.HatTitle>
        </Card.HatWrapper>
        <Card.Title color="high">{content?.headlines?.basic}</Card.Title>
      </div>
    </Card>
  )
}
