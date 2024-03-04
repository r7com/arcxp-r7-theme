import './default.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '@r7/ui-header-delivery'
import { PrivacyBox } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { Container, Article } from '@r7/ui-layout'
import { ArticleProvider } from '@r7/ui-article-delivery'

const ArticleLayout = ({ children }) => {
  if (children && children.length === 0) return null

  const [headerFixed, header, headerAd, main, aside, footer] = React.Children.toArray(children)
  const { arcSite, isAdmin } = useFusionContext()
  const { privacyLink } = getProperties(arcSite)

  return (
    <ArticleProvider>
      <Article>
        <Header>
          {headerFixed && <Header.Fixed>{headerFixed}</Header.Fixed>}
          {header && header}
        </Header>
        <Container>{headerAd && headerAd}</Container>
        <Container>
          <Article.Grid>
            {main && <Article.Main>{main}</Article.Main>}
            {aside && <Article.Aside>{aside}</Article.Aside>}
          </Article.Grid>
        </Container>
        {footer && <footer>{footer}</footer>}
        {!isAdmin && <PrivacyBox link={privacyLink} />}
      </Article>
    </ArticleProvider>
  )
}

ArticleLayout.propTypes = {
  children: PropTypes.array,
}

ArticleLayout.sections = ['header-fixed', 'header', 'header-ad', 'main', 'aside', 'footer']

ArticleLayout.label = 'Article Layout – R7 Layout'

export default ArticleLayout
