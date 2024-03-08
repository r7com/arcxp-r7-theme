import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { LeftPhoto, Card } from '@r7/ui-card'
import { getLabelPropTypes, CardLabel } from '../../../util/card'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'
import { getHatBySite } from '../../../util/card/get-hat-by-site'

const CONTENT_LENGTH = 2

const TwoCardsSquarePhotoManual = ({ customFields }) => {
  const { arcSite, isAdmin } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)
  const indexList = [...Array(CONTENT_LENGTH)].map((_, idx) => idx + 1)
  const content = indexList.map(idx => {
    const { contentService, contentConfigValues } = customFields[`_id-${idx}`]
    const articleData = useContent({
      source: contentService,
      key: {
        _id: contentConfigValues._id,
      },
    })

    return articleData
  })

  if (isAdmin && !customFields.display)
    return <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>

  if (isAdmin && !content.filter(item => item).length > 0)
    return <p>É necessário definir uma fonte de conteúdo para este bloco.</p>

  return (
    customFields.display &&
    content.map((item, index) => {
      const id = index + 1
      const imageUrl = customFields[`image-${id}`] || item?.promo_items?.basic?.url || fallbackImage
      const imageAlt =
        customFields[`image-description-${id}`] || item?.promo_items?.basic?.url || fallbackImageAlt
      const headline = customFields[`headline-${id}`] || item?.headlines?.basic
      const link = customFields[`link-${id}`] || item?.canonical_url
      const { name } = getHatBySite({ taxonomy: item?.taxonomy })
      const hat = customFields[`hat-${id}`] || name

      return (
        <LeftPhoto key={item?._id}>
          <LeftPhoto.Item key={item?._id}>
            <LeftPhoto.Flex>
              <LeftPhoto.Figure format="square">
                <a href={link} title={headline}>
                  <img
                    data-tb-thumbnail
                    src={imageUrl}
                    alt={imageAlt}
                    width={113}
                    height={113}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardLabel {...item} />
                </a>
              </LeftPhoto.Figure>
              <LeftPhoto.TextWrapper>
                <Card.HatWrapper type={item?.type}>
                  <a href={link} title={headline}>
                    <Card.HatTitle color={item?.color}>{hat}</Card.HatTitle>
                  </a>
                </Card.HatWrapper>
                <LeftPhoto.Title fontSize="small">
                  <a href={link} title={headline}>
                    {headline}
                  </a>
                </LeftPhoto.Title>
              </LeftPhoto.TextWrapper>
            </LeftPhoto.Flex>
          </LeftPhoto.Item>
        </LeftPhoto>
      )
    })
  )
}

TwoCardsSquarePhotoManual.propTypes = {
  customFields: PropTypes.shape({
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
      defaultValue: true,
    }),
    ...repeatProptypeStructure({
      count: CONTENT_LENGTH,
      shapeTemplate(counter) {
        return {
          [`_id-${counter}`]: PropTypes.contentConfig('ans-item').tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Display Content Info',
          }),
          [`headline-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Título da Matéria',
          }),
          [`link-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Link da Matéria',
          }),
          [`hat-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Título Chapéu da Matéria',
          }),
          [`image-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Imagem da Matéria',
            searchable: 'image',
          }),
          [`image-description${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Descreva a imagem',
          }),
          ...getLabelPropTypes(counter),
        }
      },
    }),
  }),
}

TwoCardsSquarePhotoManual.label = 'Duas Fotos Pequenas Manual - R7 Block'

export default TwoCardsSquarePhotoManual
