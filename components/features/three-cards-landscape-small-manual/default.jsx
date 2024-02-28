import '@r7/ui-card/style.css'
import PropTypes from '@arc-fusion/prop-types'
import React from 'react'
import { LeftPhoto } from '@r7/ui-card'
import { CardHat } from '../../../util/card'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'

const ThreeSmallPhotosManual = props => {
  const calls = [1, 2, 3].map(call => {
    return {
      title: props.customFields[`callTitle${call}`],
      imageURL: props.customFields[`callImageURL${call}`],
      imageAlt: props.customFields[`callImageAlt${call}`],
      url: props.customFields[`callURL${call}`],
    }
  })

  return (
    <LeftPhoto>
      {calls.map(item => (
        <LeftPhoto.Item key={item.title}>
          <LeftPhoto.Flex>
            <LeftPhoto.Figure format="landscape">
              <a href={item.url} title={item.imageAlt}>
                <img
                  src={item.imageURL}
                  alt={item.imageAlt}
                  width={113}
                  height={65}
                  style={{ width: 113, height: 65, objectFit: 'cover' }}
                  data-tb-thumbnail
                />
              </a>
            </LeftPhoto.Figure>

            <LeftPhoto.TextWrapper>
              <CardHat {...item} />

              <a href={item.url} title={item.title}>
                <LeftPhoto.Title fontSize="small">{item.title}</LeftPhoto.Title>
              </a>
            </LeftPhoto.TextWrapper>
          </LeftPhoto.Flex>
        </LeftPhoto.Item>
      ))}
    </LeftPhoto>
  )
}

ThreeSmallPhotosManual.label = 'Três Fotos Pequenas Manual - R7 Block'

ThreeSmallPhotosManual.propTypes = {
  customFields: PropTypes.shape({
    ...repeatProptypeStructure({
      count: 3,
      shapeTemplate(counter) {
        return {
          [`callTitle${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Título',
          }),
          [`callImageURL${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'URL da imagem (https)',
          }),
          [`callImageAlt${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Descrição da imagem',
          }),
          [`callURL${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Link de destino',
          }),
          // [`hatType${call}`]: PropTypes.string.tag({
          //   group: `Chapéu ${counter}`,
          //   label: `Tipo de chapéu`,
          // }),
          // [`hatUrl${call}`]: PropTypes.string.tag({
          //   group: `Chapéu ${counter}`,
          //   label: `Link de destino do chapéu`,
          // }),
          // [`hatTitle${call}`]: PropTypes.string.tag({
          //   group: `Chapéu ${counter}`,
          //   label: `Titulo do chapéu`,
          // }),
          // [`hatImage${call}`]: PropTypes.string.tag({
          //   group: `Chapéu ${counter}`,
          //   label: `URL da imagem do chapéu (caso exista)`,
          // }),
          // [`hatColor${call}`]: PropTypes.string.tag({
          //   group: `Chapéu ${counter}`,
          //   label: `Cor do chapéu`,
          // }),
          // [`hatColor${call}`]: PropTypes.oneOf(['high', 'low', 'high-bold']).tag({
          //   label: 'Cor do chapéu',
          //   labels: {
          //     high: 'high',
          //     low: 'low',
          //     [`high-bold`]: 'high-bold',
          //   },
          //   defaultValue: 'high',
          // }),
        }
      },
    }),
  }),
}

export default ThreeSmallPhotosManual
