import './styles.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'

const Footer = props => {
  const { config, navigationLabelsList, navigationLinksList } = props.customFields
  const { arcSite } = useFusionContext()

  const { primaryLogo, primaryLogoAlt, primaryColor, websiteName, copyrightText } =
    getProperties(arcSite)
  const content = useContent({
    source: config?.contentService,
    query: config?.contentConfigValues,
  })

  return (
    <div style={{ backgroundColor: primaryColor }} className="footer-wrapper">
      <div className="footer">
        <div className="footer__site">
          <img className="footer__site-logo" src={primaryLogo} alt={primaryLogoAlt} />
          <p className="footer__site-name">{content?.name ?? websiteName}</p>
        </div>
        <div className="footer__copyright">{copyrightText}</div>
      </div>
      <ul className="footer__nav">
        {navigationLabelsList?.length &&
          navigationLinksList?.length &&
          navigationLabelsList.map((label, index) => {
            if (navigationLinksList[index]) {
              return (
                <li className="footer__nav-link" key={label}>
                  <a href={navigationLinksList[index]}>{label}</a>
                </li>
              )
            }
          })}
      </ul>
    </div>
  )
}

Footer.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Content Source',
    }),
    navigationLabelsList: PropTypes.list.tag({
      group: 'Navigation Links',
      label: 'Navigation Labels',
    }),
    navigationLinksList: PropTypes.list.tag({
      group: 'Navigation Links',
      label: 'Navigation Links',
    }),
  }),
}

Footer.label = 'Footer - R7 Block'

Footer.icon = 'arc-footer'

export default Footer
