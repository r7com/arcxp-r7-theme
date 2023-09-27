import './styles.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'

const Footer = props => {
  const { customFields } = props
  const { arcSite } = useFusionContext()
  let content = {}
  const { primaryLogo, websiteName, copyrightText } = getProperties(arcSite)
  if (customFields.sectionId) {
    content = useContent({
      source: 'site-service-hierarchy',
      query: { sectionId: customFields.sectionId },
    })
  }

  return (
    <div style={{ backgroundColor: '' }} className="footer-wrapper">
      <div className="footer">
        <div className="footer__site">
          <img className="footer__site-logo" src={primaryLogo} alt="" />
          <p className="footer__site-name">{content?.name ?? websiteName}</p>
        </div>
        <div className="footer__copyright">{copyrightText}</div>
      </div>
      <ul className="footer__nav">
        {customFields.navigationLabelsList.length &&
          customFields.navigationLinksList.length &&
          customFields.navigationLabelsList.map((label, index) => {
            if (customFields.navigationLinksList[index]) {
              return (
                <li className="footer__nav-link" key={label}>
                  <a href={customFields.navigationLinksList[index]}>{label}</a>
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
    sectionId: PropTypes.string.tag({
      group: 'Configure Content',
      label: 'Section ID',
    }),
    navigationConfig: PropTypes.contentConfig('site-service-hierarchy').tag({
      group: 'Configure Content',
      label: 'Navigation',
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
