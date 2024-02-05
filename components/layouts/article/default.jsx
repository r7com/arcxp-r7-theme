import './default.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '@r7/ui-header-delivery'
import { PrivacyBox } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const LAYOUT_CLASS_NAME = 'b-article-layout'
const ArticleLayout = ({ children }) => {
  const [
    headerFixed,
    header,
    fullwidthWithoutContainer,
    fullwidth1,
    main,
    main2,
    rightRailTop,
    rightRailMiddle,
    rightRailBottom,
    fullWidth2,
    footer,
  ] = React.Children.toArray(children)

  const { arcSite, isAdmin } = useFusionContext()
  const { privacyLink } = getProperties(arcSite)
  return (
    <div className={LAYOUT_CLASS_NAME}>
      <Header>
        {headerFixed && <Header.Fixed>{headerFixed}</Header.Fixed>}
        {header && header}
      </Header>
      {fullwidthWithoutContainer ? (
        <div className={`${LAYOUT_CLASS_NAME}__full-width-without-container`}>
          {fullwidthWithoutContainer}
        </div>
      ) : null}
      <section role="main" tabIndex="-1" className={`${LAYOUT_CLASS_NAME}__main`}>
        {fullwidth1 ? (
          <div className={`${LAYOUT_CLASS_NAME}__full-width first`}>{fullwidth1}</div>
        ) : null}
        <div className={`${LAYOUT_CLASS_NAME}__rail-container`}>
          <div className={`${LAYOUT_CLASS_NAME}__main-interior-item`}>
            <div className={`${LAYOUT_CLASS_NAME}__main-interior-item-top`}>{main}</div>
            <div className={`${LAYOUT_CLASS_NAME}__main-interior-item-bottom`}>{main2}</div>
          </div>
          <div className={`${LAYOUT_CLASS_NAME}__main-right-rail`}>
            <div className={`${LAYOUT_CLASS_NAME}__main-right-rail-top`}>{rightRailTop}</div>
            <div className={`${LAYOUT_CLASS_NAME}__main-right-rail-middle`}>{rightRailMiddle}</div>
            <div className={`${LAYOUT_CLASS_NAME}__main-right-rail-bottom`}>{rightRailBottom}</div>
          </div>
        </div>
        {fullWidth2 ? (
          <div className={`${LAYOUT_CLASS_NAME}__full-width second`}>{fullWidth2}</div>
        ) : null}
      </section>
      {footer ? <footer className={`${LAYOUT_CLASS_NAME}__footer`}>{footer}</footer> : null}
      {!isAdmin && <PrivacyBox link={privacyLink} />}
    </div>
  )
}

ArticleLayout.propTypes = {
  children: PropTypes.array,
}

ArticleLayout.sections = [
  'header-fixed',
  'header',
  'fullwidthWithoutContainer',
  'fullwidth1',
  'main-1',
  'main-2',
  'rightrail-top',
  'rightrail-middle',
  'rightrail-bottom',
  'fullwidth2',
  'footer',
]

ArticleLayout.label = 'Article Layout – R7 Layout'

export default ArticleLayout
