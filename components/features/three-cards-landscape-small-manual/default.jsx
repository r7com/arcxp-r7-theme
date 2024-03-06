import '@r7/ui-card/style.css'
import PropTypes from '@arc-fusion/prop-types'
import React from 'react'
import { Card, LeftPhoto } from '@r7/ui-card'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'

const CALLS_NUMBER = 3

const ThreeSmallPhotosManual = props => {
  const calls = Array.from({ length: CALLS_NUMBER + 1 }, (v, i) => {
    return {
      title: props.customFields[`callTitle${i}`],
      imageURL: props.customFields[`callImageURL${i}`],
      imageAlt: props.customFields[`callImageAlt${i}`],
      url: props.customFields[`callURL${i}`],
      hatURL: props.customFields[`hatURL${i}`],
      hatTitle: props.customFields[`hatTitle${i}`],
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
              <Card.HatWrapper>
                <a href={item.hatURL} title={item.hatTitle}>
                  <Card.HatTitle>{item.hatTitle}</Card.HatTitle>
                </a>
              </Card.HatWrapper>
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
      count: CALLS_NUMBER,
      shapeTemplate(counter) {
        return {
          [`callTitle${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Título da chamada',
          }),
          [`callImageURL${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'URL da imagem da chamada (https)',
          }),
          [`callImageAlt${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Descrição da imagem da chamada',
          }),
          [`callURL${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Link de destino da chamada',
          }),
          [`hatTitle${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Título do chapéu',
          }),
          [`hatURL${counter}`]: PropTypes.string.tag({
            group: `Chamada ${counter}`,
            label: 'Link de destino do chapéu',
          }),
        }
      },
    }),
  }),
}

export default ThreeSmallPhotosManual
