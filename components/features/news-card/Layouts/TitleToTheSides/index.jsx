import React from 'react'
import { Card } from '@r7/ui-card'
import { Hat } from '../../Hat'
import './title-to-the-sides.scss'

export function TitleToTheSides({
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
  inverted,
}) {
  return (
    <Card
      className={`flex title-to-the-sides ${inverted ? 'inverse' : ''}`}
      newsTitle="The McRib is back (again): How a McNugget shortage led to its rise"
      newsUrl="https://www.google.com"
      openInBlank
    >
      <Card.Image format={imageFormat}>
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
