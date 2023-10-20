import React from 'react'
import { Card } from '@r7/ui-card'
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
  sponsoredByUrl,
  sponsoredByImage,
  sponsoredByImageDesc,
  sponsoredByTitle,
}) {
  return (
    <Card>
      <Card.Image className="mb-xxxs" format={imageFormat}>
        <img src={imageSrc} alt={imageDescription} className="w-full h-full object-cover" />
        {labelType && (
          <Card.Label
            type={labelType}
            sponsoredByUrl={sponsoredByUrl}
            sponsoredByImage={sponsoredByImage}
            sponsoredByImageDesc={sponsoredByImageDesc}
            sponsoredByTitle={sponsoredByTitle}
          />
        )}
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
    </Card>
  )
}
