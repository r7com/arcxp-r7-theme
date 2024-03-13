import './default.scss'
import '@r7/ui-header-delivery/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '@r7/ui-header-delivery'
import { Container, SectionWrapper } from '@r7/ui-layout'
import { PrivacyBox } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { Refresh } from '../../../util/components/Refresh'

const SectionLayout = ({ children }) => {
  const [headerFixed, header, headerAd, main, footer] = React.Children.toArray(children)
  const { arcSite, isAdmin } = useFusionContext()
  const { privacyLink } = getProperties(arcSite)
  const LAYOUT_CLASS_NAME = 'b-section-layout'

  return (
    <>
      <Refresh />
      <Header>
        {headerFixed && <Header.Fixed>{headerFixed}</Header.Fixed>}
        {header && header}
      </Header>
      {headerAd && (
        <Container>
          <div className={`${LAYOUT_CLASS_NAME}__header-ad`}>{headerAd && headerAd}</div>
        </Container>
      )}
      {main && (
        <main>
          <Container>
            <SectionWrapper>{main}</SectionWrapper>
          </Container>
        </main>
      )}
      {footer && <footer>{footer}</footer>}
      {!isAdmin && <PrivacyBox link={privacyLink} />}
    </>
  )
}

SectionLayout.propTypes = {
  children: PropTypes.array,
}

SectionLayout.sections = ['header-fixed', 'header', 'header-ad', 'main', 'footer']

SectionLayout.label = 'Section Layout – R7 Layout'

export default SectionLayout
