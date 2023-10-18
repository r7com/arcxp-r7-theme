import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'
import { Title } from './Layouts/Title'
import { ImageAbove } from './Layouts/ImageAbove'
import { TitleOverImage } from './Layouts/TitleOverImage'

const NewsCard = props => {
  const { cardType, display, cardTitle, labelType, hatType, imageFormat, showImageShadow } =
    props.customFields
  const hatImage =
    '//img.r7.com/images/pantano-australia-rosa-brilhante-04102023182425856?resize=536x326&crop=691x420 80 0&dimensions=536x326'
  const hatImageDescription = 'descrição chapéu'
  const hatTitle = 'chapéu'
  const imageSrc =
    '//img.r7.com/images/pantano-australia-rosa-brilhante-04102023182425856?resize=536x326&crop=691x420 80 0&dimensions=536x326'
  const imageDescription = 'descrição imagem'
  const layout = {
    Título: <Title cardTitle={cardTitle} />,
    'Imagem acima': (
      <ImageAbove
        cardTitle={cardTitle}
        labelType={labelType}
        hatType={hatType}
        imageFormat={imageFormat}
        imageSrc={imageSrc}
        imageDescription={imageDescription}
        showImageShadow={showImageShadow}
        hatImage={hatImage}
        hatImageDescription={hatImageDescription}
        hatTitle={hatTitle}
      />
    ),
    'Título sobre a imagem': <TitleOverImage />,
  }[cardType]

  return <>{display && <Card>{layout}</Card>}</>
}

NewsCard.label = 'Notícia – R7 Block'
NewsCard.icon = 'paragraph-image-left'

NewsCard.propTypes = {
  customFields: PropTypes.shape({
    cardType: PropTypes.oneOf([
      'Título',
      'Imagem à direita',
      'Imagem à esquerda',
      'Imagem acima',
      'Título sobre a imagem',
    ]),
    cardTitle: PropTypes.string,
    imageFormat: PropTypes.oneOf(['square', 'landscape', 'portrait']),
    showImageShadow: PropTypes.boolean,
    labelType: PropTypes.oneOf([
      'live',
      'blog',
      'studio',
      'sponsored-by',
      'voting',
      'podcast',
      'aclr',
    ]),
    // por default no hatTYpe
    hatType: PropTypes.oneOf([
      'alert-with-image',
      'alert-without-image',
      'with-image',
      'without-image',
    ]),
    display: PropTypes.boolean,
  }),
}

export default NewsCard
