import '@r7/ui-card/style.css'
import React from 'react'
import getProperties from 'fusion:properties'
import { useFusionContext } from 'fusion:context'
import PropTypes from '@arc-fusion/prop-types'
import { Card, LeftPhoto } from '@r7/ui-card'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'

const CALLS_NUMBER = 3

const ThreeSmallPhotosManual = props => {
  const { arcSite } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  const calls = Array.from({ length: CALLS_NUMBER }, (v, i) => {
    return {
      title: props.customFields[`callTitle${i + 1}`],
      imageURL: props.customFields[`callImageURL${i + 1}`],
      imageAlt: props.customFields[`callImageAlt${i + 1}`],
      url: props.customFields[`callURL${i + 1}`],
      hatURL: props.customFields[`hatURL${i + 1}`],
      hatTitle: props.customFields[`hatTitle${i + 1}`],
    }
  })

  return (
    <LeftPhoto>
      {calls.map(item => (
        <LeftPhoto.Item key={item.title}>
          <LeftPhoto.Flex>
            <LeftPhoto.Figure format="landscape">
              <a href={item.url} title={item.imageAlt}>
                {item.imageURL ? (
                  <img
                    src={item.imageURL}
                    alt={item.imageAlt}
                    width={113}
                    height={65}
                    style={{ width: 113, height: 65, objectFit: 'cover' }}
                    data-tb-thumbnail
                  />
                ) : (
                  <img
                    data-tb-thumbnail
                    src={fallbackImage}
                    alt={fallbackImageAlt}
                    width={113}
                    height={65}
                    style={{ width: 113, height: 65, objectFit: 'contain' }}
                  />
                )}
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
            label: 'Imagem de 113 x 65',
            searchable: 'image',
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
