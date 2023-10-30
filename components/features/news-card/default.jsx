import React from 'react'
import PropTypes from 'prop-types'
import { useContent, useEditableContent } from 'fusion:content'
import '@r7/ui-card/style.css'
import { Title } from './Layouts/Title'
import { ImageAbove } from './Layouts/ImageAbove'
import { TitleOverImage } from './Layouts/TitleOverImage'
import { useFusionContext } from 'fusion:context'
import { TitleToTheSides } from './Layouts/TitleToTheSides'

const NewsCard = props => {
  const { isAdmin } = useFusionContext()
  const {
    cardType,
    display,
    labelType,
    hatType,
    imageFormat,
    sponsoredByUrl,
    sponsoredByImage,
    sponsoredByImageDesc,
    sponsoredByTitle,
  } = props.customFields
  const { searchableField } = useEditableContent()

  const content =
    useContent({
      source: props.customFields?.itemContentConfig?.contentService ?? null,
      query: {
        ...props.customFields?.itemContentConfig?.contentConfigValues,
      },
    }) || null

  const defaultImage = 'https://img.r7.com/images/r7-30072019142631584?crop_position=c'

  function imageToUse(content) {
    if (content?.promo_items?.lead_art) {
      return {
        url: content.promo_items.lead_art.url,
        description: content?.promo_items?.lead_art?.alt_text,
      }
    }
    if (findFirstImage(content.content_elements)) {
      const image = findFirstImage(content.content_elements)
      return { url: image.url, description: image.alt_Text }
    }
    return {
      url: 'https://img.r7.com/images/r7-30072019142631584?crop_position=c',
      description: 'descrição imagem principal',
    }
  }
  function findFirstImage(contentElements) {
    return contentElements.find(contentElement => contentElement?.type === 'image')
  }

  const hatTitle =
    content?.taxonomy?.primary_section?._website ||
    content?.taxonomy?.primary_section?.referent.website ||
    ''
  const cardTitle = content?.headlines?.basic || ''
  const imageSrc = imageToUse(content).url
  const hatImage = defaultImage
  const hatImageDescription = 'descrição chapéu'
  const imageDescription = imageToUse(content).description

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
    sponsoredByUrl,
    sponsoredByImage,
    sponsoredByImageDesc,
    sponsoredByTitle,
  }
  const layout = {
    title: <Title {...newsProps} />,
    imageAbove: <ImageAbove {...newsProps} />,
    titleOverImage: <TitleOverImage {...newsProps} />,
    titleToTheLeft: <TitleToTheSides {...newsProps} inverted />,
    titleToTheRight: <TitleToTheSides {...newsProps} />,
  }[cardType]

  console.log('aa', content)
  return (
    <>
      <div style={{ position: 'relative' }}>
        {display
          ? layout
          : isAdmin && <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>}
        <div
          {...searchableField('itemContentConfig', 'story', { contentSource: 'story-search' })}
        ></div>
      </div>
    </>
  )
}

NewsCard.label = 'Notícia – R7 Block'
NewsCard.icon = 'paragraph-image-left'

NewsCard.propTypes = {
  customFields: PropTypes.shape({
    itemContentConfig: PropTypes.contentConfig('ans-item').tag({
      group: 'Configurar conteúdo',
      label: 'Infomações do conteúdo exibido',
    }),
    cardType: PropTypes.oneOf([
      'title',
      'imageAbove',
      'titleOverImage',
      'titleToTheLeft',
      'titleToTheRight',
    ]).tag({
      label: 'Formato da notícia',
      defaultValue: 'title',
      labels: {
        title: 'Título',
        imageAbove: 'Imagem acima',
        titleOverImage: 'Título sobre a imagem',
        titleToTheLeft: 'Título na esquerda',
        titleToTheRight: 'Título na direita',
      },
    }),
    imageFormat: PropTypes.oneOf(['square', 'landscape', 'portrait']).tag({
      label: 'Formato da imagem',
      group: 'Configurações da imagem',
      labels: {
        square: 'Quadrada',
        landscape: 'Retangular',
        portrait: 'Retrato',
      },
      defaultValue: 'square',
    }),
    labelType: PropTypes.oneOf([
      'live',
      'blog',
      'studio',
      'sponsored-by',
      'voting',
      'podcast',
      'aclr',
    ]).tag({
      label: 'Etiqueta da imagem',
      group: 'Configurações da imagem',
      labels: {
        live: 'Ao vivo',
        blog: 'Blog',
        studio: 'R7 Estúdio',
        'sponsored-by': 'Oferecido por',
        voting: 'Votação',
        podcast: 'Podcast',
        aclr: 'ACRL',
      },
    }),
    sponsoredByUrl: PropTypes.string.tag({
      label: 'Link de destino',
      group: 'Configurações do "Oferecido por"',
    }),
    sponsoredByImage: PropTypes.string.tag({
      label: 'Imagem',
      group: 'Configurações do "Oferecido por"',
    }),
    sponsoredByImageDesc: PropTypes.string.tag({
      label: 'Descrição da imagem',
      group: 'Configurações do "Oferecido por"',
    }),
    sponsoredByTitle: PropTypes.string.tag({
      label: 'Título do link',
      group: 'Configurações do "Oferecido por"',
    }),
    // revisar nomenclaturas
    hatType: PropTypes.oneOf([
      'alert-with-image',
      'breaking-news',
      'with-image',
      'without-image',
    ]).tag({
      label: 'Tipo de chapéu',
      labels: {
        'alert-with-image': 'Breaking news com imagem',
        'breaking-news': 'Breaking news',
        'with-image': 'Padrão com imagem',
        'without-image': 'Padrão',
      },
      defaultValue: 'without-image',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir notícia',
    }),
  }),
}

export default NewsCard
