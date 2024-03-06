import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { Card, ProportionalPhoto } from '@r7/ui-card'

const ProportionalPhotoBlock = props => {
  const { url, imageURL, title, hatURL, hatTitle } = props.customFields

  return (
    <ProportionalPhoto>
      <ProportionalPhoto.Figure>
        <a href={url}>
          <img
            data-tb-thumbnail
            src={imageURL}
            alt={title}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </a>
      </ProportionalPhoto.Figure>

      <ProportionalPhoto.TextWrapper>
        <Card.HatWrapper>
          <a href={hatURL} title={hatTitle}>
            <Card.HatTitle>{hatTitle}</Card.HatTitle>
          </a>
        </Card.HatWrapper>

        <ProportionalPhoto.Title>
          <a href={url} title={title}>
            {title}
          </a>
        </ProportionalPhoto.Title>
      </ProportionalPhoto.TextWrapper>
    </ProportionalPhoto>
  )
}

ProportionalPhotoBlock.label = 'Foto Média Manual - R7 Block'

ProportionalPhotoBlock.propTypes = {
  customFields: PropTypes.shape({
    url: PropTypes.string.tag({
      group: `Chamada`,
      label: 'Link de destino da chamada',
    }),
    imageURL: PropTypes.string.tag({
      group: `Chamada`,
      label: 'Escolha a imagem',
      searchable: 'image',
    }),
    title: PropTypes.string.tag({
      group: `Chamada`,
      label: 'Título da chamada',
    }),
    hatTitle: PropTypes.string.tag({
      group: `Chamada`,
      label: 'Título do chapéu',
    }),
    hatURL: PropTypes.string.tag({
      group: `Chamada`,
      label: 'Link de destino do chapéu',
    }),
  }),
}

export default ProportionalPhotoBlock
