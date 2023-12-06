import React from 'react'
import { Breadcrumb, ConditionalLink } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { breadcrumbProxy } from './utils/utils'

const BreadcrumbBlock = () => {
  const { globalContent, arcSite } = useFusionContext()

  if (!globalContent) return null

  const { subtype } = globalContent
  const isArticle = subtype === 'Article'
  const { websiteDomain } = getProperties(arcSite)
  const breadcrumb = breadcrumbProxy(globalContent, websiteDomain)

  return (
    <Breadcrumb>
      <Breadcrumb.List>
        {breadcrumb?.length &&
          breadcrumb?.map(({ name, url }, i) => {
            const lastItem = breadcrumb[breadcrumb?.length - 1].name === name
            const propsOptional =
              isArticle && lastItem ? { href: url, title: `Ir para a página de ${name}` } : {}
            return (
              <Breadcrumb.Item key={i}>
                <ConditionalLink {...propsOptional} aria-current={lastItem ? 'page' : 'false'}>
                  {name}
                </ConditionalLink>
              </Breadcrumb.Item>
            )
          })}
      </Breadcrumb.List>
    </Breadcrumb>
  )
}

BreadcrumbBlock.label = 'Breadcrumb - R7 Block'

export default BreadcrumbBlock
