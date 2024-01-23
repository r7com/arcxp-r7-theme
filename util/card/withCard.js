/* eslint-disable react/display-name */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useCard } from './useCard'
import { RenderCard } from './components/RenderCard'

/**
 * Function withCard adds a card wrapper around a provided component.
 * @param {React.ComponentType<{cardProps:ReturnType<useCard>}>} Component - The component
 * @param {Object} options - Options for the card.
 * @param {string} options.defaultFrom - The default "from" value.
 * @param {string} options.defaultSize - The default size of the collection.
 * @param {number} options.length - How many cards/items from the collection.
 * @returns {(props: {customFields: Object}) => React.Component} The wrapped component with a card.
 */
export function withCard(Component, { defaultFrom, defaultSize, length }) {
  return props => {
    const { display } = props.customFields
    const { isAdmin } = useFusionContext()
    const cardProps = useCard({
      customFields: props.customFields,
      defaultFrom,
      defaultSize,
      length,
    })

    return (
      <RenderCard display={display} items={cardProps.collection} isAdmin={isAdmin}>
        <Component {...props} cardProps={{ ...cardProps }} />
      </RenderCard>
    )
  }
}
