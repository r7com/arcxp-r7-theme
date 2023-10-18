import React from 'react'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'
import { Hat } from '../../Hat'

export function ImageAbove({
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
    <>
      <Card.Image className="mb-xxxs" format={imageFormat} shadow={showImageShadow}>
        <img src={imageSrc} alt={imageDescription} className="w-full h-full object-cover" />
        {labelType && <Card.Label type={labelType} />}
      </Card.Image>
      <div>
        <Hat
          type={hatType}
          hatImage={hatImage}
          hatImageDescription={hatImageDescription}
          hatTitle={hatTitle}
        />
        <Card.Title>{cardTitle}</Card.Title>
      </div>
    </>
  )
}
