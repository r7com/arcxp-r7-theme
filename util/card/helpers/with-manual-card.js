/* eslint-disable react/display-name */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useManualCard } from './use-manual-card'
import { RenderCard } from '../components/RenderCard'

/**
 * Function withCard adds a card wrapper around a provided component.
 * @param {React.ComponentType<{cardProps:ReturnType<useManualCard>}>} Component The component
 * @param {import("./use-manual-card").CardOptions} options Options for the card
 * @returns {(props: {customFields: Object}) => React.Component} The wrapped component with a card
 */
export function withManualCard(Component, { contentLength }) {
  return props => {
    const { display } = props.customFields
    const { isAdmin } = useFusionContext()

    const cardProps = useManualCard({ contentLength, customFields: props.customFields })

    return (
      <RenderCard display={display} isAdmin={isAdmin} items={cardProps.content}>
        <Component {...props} cardProps={{ ...cardProps }} />
      </RenderCard>
    )
  }
}
