import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { Guerra } from '@r7/ui-card'
import { Bullet } from '@r7/ui-base-components'
import { CardHat, withCard } from '../../../util/card'

const TitleWithBulletsBlock = withCard(
  props => {
    const { collection } = props.cardProps
    const [mainNews, ...bulletNews] = collection
    return (
      <Guerra>
        <CardHat {...mainNews} color="low" />

        <Guerra.Title color="low">
          <a href={mainNews.canonical_url} title={mainNews.headlines?.basic}>
            {mainNews.headlines?.basic}
          </a>
        </Guerra.Title>
        <Guerra.Bullets>
          {bulletNews.map(item => (
            <Bullet key={item._id} url={item.canonical_url}>
              {item.headlines.basic}
            </Bullet>
          ))}
        </Guerra.Bullets>
      </Guerra>
    )
  },
  { defaultSize: 5, length: 5 },
)

TitleWithBulletsBlock.label = 'Título com bullets - R7 Block'

TitleWithBulletsBlock.propTypes = {
  customFields: PropTypes.shape({
    isGlobalContent: PropTypes.boolean.tag({
      group: 'Configurar conteúdo',
      label: 'Usar conteúdo global',
      default: false,
    }),
    globalContentFrom: PropTypes.number.tag({
      group: 'Configurar conteúdo',
      label: 'from global',
      defaultValue: 0,
    }),
    globalContentSize: PropTypes.number.tag({
      group: 'Configurar conteúdo',
      label: 'size global',
      defaultValue: 0,
    }),
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
