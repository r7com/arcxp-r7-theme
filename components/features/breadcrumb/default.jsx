import React from 'react'
import { Breadcrumb, ConditionalLink } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'
import { breadcrumbProxy } from './utils/utils'

const BreadcrumbBlock = () => {
  const { globalContent, metaValue } = useFusionContext()

  if (!globalContent) return null

  const isArticle = metaValue('page-type') === 'article'
  const breadcrumb = breadcrumbProxy()

  return (
    <Breadcrumb>
      <Breadcrumb.List>
        {breadcrumb?.length &&
          breadcrumb?.map(({ name, url, id }) => {
            const isLastItem = breadcrumb[breadcrumb?.length - 1].id === id
            const propsOptional =
              isArticle && isLastItem
                ? { href: url, title: `Ir para a página de ${name}` }
                : { href: url }
            return (
              <Breadcrumb.Item key={id}>
                <ConditionalLink {...propsOptional} aria-current="page">
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
BreadcrumbBlock.static = true

export default BreadcrumbBlock
