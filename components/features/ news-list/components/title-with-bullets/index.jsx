import React from 'react'
import { Bullet } from '@r7/ui-base-components'
import { Card } from '@r7/ui-card'
import './index.scss'

export const TitleWithBullets = ({ content }) => {
  // to-do: agency version
  return (
    <div className="title-with-bullets">
      <div className="title-with-bullets__highlight">
        <Card
          className="title-with-bullets__highlight-title"
          newsUrl={content[0].canonical_url}
          newsUrlTitle={content[0]?.headlines?.basic}
        >
          <Card.HatWrapper>
            <Card.HatTitle>{content[0]?.taxonomy?.primary_section?.name}</Card.HatTitle>
          </Card.HatWrapper>
          <Card.Title fontStyle="heading-level-1" as="h2">
            {content[0]?.headlines?.basic}
          </Card.Title>
        </Card>
      </div>
      <div className="title-with-bullets__wrapper">
        <Bullet url={content[1].canonical_url} size="large">
          {content[1]?.headlines?.basic}
        </Bullet>
        <Bullet url={content[2].canonical_url} size="large">
          {content[2]?.headlines?.basic}
        </Bullet>
      </div>
    </div>
  )
}
