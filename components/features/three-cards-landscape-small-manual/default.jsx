import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { LeftPhoto } from '@r7/ui-card'
import { withCard, CardLabel, CardHat } from '../../../util/card'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'

const ThreeSmallPhotosManual = withCard(props => {
  const { siteProperties } = props.cardProps
  const { fallbackImage, fallbackImageAlt } = siteProperties

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

                <CardLabel {...item} />
              </a>
            </LeftPhoto.Figure>

            <LeftPhoto.TextWrapper>
              <CardHat {...item} />

              <LeftPhoto.Title fontSize="small">
                <a href={item.url} title={item.title}>
                  {item.title}
                </a>
              </LeftPhoto.Title>
            </LeftPhoto.TextWrapper>
          </LeftPhoto.Flex>
        </LeftPhoto.Item>
      ))}
    </LeftPhoto>
  )
})

ThreeSmallPhotosManual.label = 'Três Fotos Pequenas Manual - R7 Block'

ThreeSmallPhotosManual.propTypes = {
  customFields: PropTypes.shape({
    ...repeatProptypeStructure({
      count: 3,
      shapeTemplate(counter) {
        return {
          [`callTitle${counter}`]: PropTypes.string.call({
            group: `Chamada ${counter}`,
            label: 'Título',
          }),
          [`callImageURL${counter}`]: PropTypes.string.call({
            group: `Chamada ${counter}`,
            label: 'URL da imagem (https)',
          }),
          [`callImageAlt${counter}`]: PropTypes.string.call({
            group: `Chamada ${counter}`,
            label: 'Descrição da imagem',
          }),
          [`callURL${counter}`]: PropTypes.string.call({
            group: `Chamada ${counter}`,
            label: 'Link de destino',
          }),
        }
      },
    }),
  }),
}

export default ThreeSmallPhotosManual
