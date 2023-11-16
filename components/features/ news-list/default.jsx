import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { TitleWithBullets } from './components/title-with-bullets'
import { TwoImages } from './components/two-images'
import { ThreeImages } from './components/three-images'
import { FourImages } from './components/four-images'
import { EightImages } from './components/eight-images'
import '@r7/ui-card/style.css'
import '@r7/ui-base-components/style.css'

const NewsList = props => {
  const { blockLayout, config, display } = props.customFields
  const { isAdmin } = useFusionContext()
  const content =
    useContent({
      source: config?.contentService ?? null,
      query: {
        ...config?.contentConfigValues,
      },
    }) || null

  console.log('asd', content)
  const layout = {
    titleWithBullets: <TitleWithBullets content={content?.content_elements} />,
    double: <TwoImages content={content?.content_elements} />,
    triple: <ThreeImages content={content?.content_elements} />,
    quadruple: <FourImages content={content?.content_elements} />,
    octuple: <EightImages content={content?.content_elements} />,
  }[blockLayout]

  return (
    <>
      {display
        ? content
          ? layout
          : isAdmin && <p>É necessário definir uma fonte de conteúdo para este bloco.</p>
        : isAdmin && <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>}
    </>
  )
}

NewsList.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configurar conteúdo',
      label: 'Fonte de conteúdo',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
    }),
    blockLayout: PropTypes.oneOf([
      'titleWithBullets',
      'double',
      'triple',
      'quadruple',
      'octuple',
    ]).tag({
      label: 'Formato do bloco',
      defaultValue: 'titleWithBullets',
      labels: {
        titleWithBullets: 'Título com bullets',
        double: 'Duas notícias com foto',
        triple: 'Três notícias com foto',
        quadruple: 'Quatro notícias com foto',
        octuple: 'Oito notícias com foto',
      },
    }),
  }),
}

export default NewsList
