import React from 'react'
import { Card } from '@r7/ui-card'
import { Hat } from '../../Hat'

export function TitleOverImage({
  cardTitle,
  hatImage,
  hatImageDescription,
  hatTitle,
  imageFormat,
  imageSrc,
  imageDescription,
  labelType,
  hatType,
  showImageShadow,
}) {
  return (
    <Card
      className="relative"
      newsTitle="The McRib is back (again): How a McNugget shortage led to its rise"
      newsUrl="https://www.google.com"
      openInBlank
    >
      <Card.Image format={imageFormat} shadow={showImageShadow}>
        <img src={imageSrc} alt={imageDescription} className="w-full h-full object-cover" />
        {labelType && <Card.Label type={labelType} />}
      </Card.Image>
      <div className="absolute bottom-0 p-xxxs">
        <Hat
          type={hatType}
          hatImage={hatImage}
          hatImageDescription={hatImageDescription}
          hatTitle={hatTitle}
          color="high"
        />
        <Card.Title color="high">{cardTitle}</Card.Title>
      </div>
    </Card>
  )
}
