import React from 'react'
import PropTypes from 'prop-types'
import '@r7/ui-card/style.css'
import { Title } from './Layouts/Title'
import { ImageAbove } from './Layouts/ImageAbove'
import { TitleOverImage } from './Layouts/TitleOverImage'
import { useFusionContext } from 'fusion:context'
import { TitleToTheSides } from './Layouts/TitleToTheSides'

const NewsCard = props => {
  const { isAdmin } = useFusionContext()
  const { cardType, display, cardTitle, labelType, hatType, imageFormat } = props.customFields
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
    hatImage,
    hatImageDescription,
    hatTitle,
  }
  const layout = {
    title: <Title cardTitle={cardTitle} />,
    imageAbove: <ImageAbove {...newsProps} />,
    titleOverImage: <TitleOverImage {...newsProps} />,
    titleToTheSides: <TitleToTheSides {...newsProps} />, // tentar diferenciar a esquerda e a direita via custom field
  }[cardType]

  return (
    <>
      {display
        ? layout
        : isAdmin && <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>}
    </>
  )
}

NewsCard.label = 'Notícia – R7 Block'
NewsCard.icon = 'paragraph-image-left'

NewsCard.propTypes = {
  customFields: PropTypes.shape({
    cardType: PropTypes.oneOf(['title', 'imageAbove', 'titleOverImage', 'titleToTheSides']),
    cardTitle: PropTypes.string,
    imageFormat: PropTypes.oneOf(['square', 'landscape', 'portrait']),
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
