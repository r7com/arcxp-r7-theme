/* eslint-disable react/display-name */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useCard } from './use-card'
import { RenderCard } from '../components/RenderCard'

/**
 * Function withCard adds a card wrapper around a provided component.
 * @param {React.ComponentType<{cardProps:ReturnType<useCard>}>} Component The component
 * @param {import("./use-card").CardOptions} options Options for the card
 * @returns {(props: {customFields: Object}) => React.Component} The wrapped component with a card
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
