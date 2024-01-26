import '@r7/ui-header-delivery/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '@r7/ui-header-delivery'
import { Container, SectionWrapper } from '@r7/ui-layout'

const SectionLayout = ({ children }) => {
  const [headerFixed, header, main, footer] = React.Children.toArray(children)

  return (
    <>
      <Header>
        {headerFixed && <Header.Fixed>{headerFixed}</Header.Fixed>}
        {header && header}
      </Header>
      {main && (
        <main>
          <Container>
            <SectionWrapper>{main}</SectionWrapper>
          </Container>
        </main>
      )}
      {footer && <footer>{footer}</footer>}
    </>
  )
}

SectionLayout.propTypes = {
  children: PropTypes.array,
}

SectionLayout.sections = ['header-fixed', 'header', 'main', 'footer']

SectionLayout.label = 'Section Layout – R7 Layout'

export default SectionLayout
