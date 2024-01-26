import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { Guerra } from '@r7/ui-card'
import { Bullet } from '@r7/ui-base-components'
import { CardHat, withCard } from '../../../util/card'

const TitleWithBulletsBlock = withCard(
  props => {
    const { collection } = props.cardProps
    return (
      <Guerra>
        <CardHat {...collection[0]} color="low" />

        <Guerra.Title color="low">
          <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
            {collection[0].headlines?.basic}
          </a>
        </Guerra.Title>
        <Guerra.Bullets>
          {collection.slice(1).map(item => (
            <Bullet key={item._id} url={item.canonical_url}>
              {item.headlines.basic}
            </Bullet>
          ))}
        </Guerra.Bullets>
      </Guerra>
    )
  },
  { defaultFrom: '0', defaultSize: '5', length: 5 },
)

TitleWithBulletsBlock.label = 'Título com bullets - R7 Block'

TitleWithBulletsBlock.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configurar conteúdo',
      label: 'Fonte de conteúdo',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
      defaultValue: true,
    }),
  }),
}

export default TitleWithBulletsBlock
