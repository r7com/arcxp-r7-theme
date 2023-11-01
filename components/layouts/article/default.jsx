import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Stack } from '@wpmedia/arc-themes-components'

const LAYOUT_CLASS_NAME = 'b-right-rail-advanced'

const ArticleLayout = ({ children }) => {
  const [
    navigation,
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

  return (
    <div className={LAYOUT_CLASS_NAME}>
      {navigation ? (
        <Stack as="header" className={`${LAYOUT_CLASS_NAME}__navigation`}>
          {navigation}
        </Stack>
      ) : null}
      {fullwidthWithoutContainer ? <Stack>{fullwidthWithoutContainer}</Stack> : null}
      <section role="main" tabIndex="-1" className={`${LAYOUT_CLASS_NAME}__main`}>
        {fullwidth1 ? (
          <Stack className={`${LAYOUT_CLASS_NAME}__full-width-1`}>{fullwidth1}</Stack>
        ) : null}
        <Grid className={`${LAYOUT_CLASS_NAME}__rail-container`}>
          <Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item`}>
            <Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item-1`}>{main}</Stack>
            <Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item-2`}>{main2}</Stack>
          </Stack>
          <Stack className={`${LAYOUT_CLASS_NAME}__main-right-rail`}>
            <Stack className={`${LAYOUT_CLASS_NAME}__main-right-rail-top`}>{rightRailTop}</Stack>
            <Stack className={`${LAYOUT_CLASS_NAME}__main-right-rail-middle`}>
              {rightRailMiddle}
            </Stack>
            <Stack className={`${LAYOUT_CLASS_NAME}__main-right-rail-bottom`}>
              {rightRailBottom}
            </Stack>
          </Stack>
        </Grid>
        {fullWidth2 ? (
          <Stack className={`${LAYOUT_CLASS_NAME}__full-width-2`}>{fullWidth2}</Stack>
        ) : null}
      </section>
      {footer ? (
        <Stack as="footer" className={`${LAYOUT_CLASS_NAME}__footer`}>
          {footer}
        </Stack>
      ) : null}
    </div>
  )
}

ArticleLayout.propTypes = {
  children: PropTypes.array,
}

ArticleLayout.sections = [
  'navigation',
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
