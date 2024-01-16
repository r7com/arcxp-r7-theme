import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { LatestNews } from '@r7/ui-layout'
import { SectionHeading } from '@r7/ui-section-heading'

const LatestNewsChain = ({ children, customFields }) => {
  const { title, color } = customFields
  if (children && children.length === 0) return null

  const [block1, block2, block3, block4] = React.Children.toArray(children)

  return (
    <>
      <SectionHeading color={color || undefined}>
        <SectionHeading.Title>{title}</SectionHeading.Title>
        <SectionHeading.Line />
      </SectionHeading>
      <LatestNews
        renderMain={block1 && block1}
        renderSidebar={
          <LatestNews.Sidebar
            rowOne={block2 && block2}
            rowTwo={block3 && block3}
            rowThree={block4 && block4}
          />
        }
      />
    </>
  )
}

LatestNewsChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: 'Título',
      defaultValue: 'Últimas',
    }),
    color: PropTypes.string.tag({
      label: 'Cor da seção (hexadecimal/rgb)',
      description: 'Cor da editoria (colore o titulo e o separador)',
    }),
  }),
}

LatestNewsChain.label = 'Últimas Notícias - R7'

export default LatestNewsChain
