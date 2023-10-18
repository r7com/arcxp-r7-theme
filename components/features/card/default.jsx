import React from 'react'
import PropTypes from 'prop-types'
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
  const imageDescription = 'descrição imagem principal'

  const newsProps = {
    cardTitle,
    labelType,
    hatType,
    imageFormat,
    imageSrc,
    imageDescription,
    showImageShadow,
    hatImage,
    hatImageDescription,
    hatTitle,
  }
  const layout = {
    title: <Title cardTitle={cardTitle} />,
    imageAbove: <ImageAbove {...newsProps} />,
    titleOverImage: <TitleOverImage {...newsProps} />,
  }[cardType]

  return <>{display && layout}</>
}

NewsCard.label = 'Notícia – R7 Block'
NewsCard.icon = 'paragraph-image-left'

NewsCard.propTypes = {
  customFields: PropTypes.shape({
    cardType: PropTypes.oneOf([
      'title',
      'imageAbove',
      'titleOverImage',
      'Imagem à direita',
      'Imagem à esquerda',
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
