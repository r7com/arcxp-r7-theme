/* eslint-disable react/display-name */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useCard } from './use-card'
import { useManualCard } from './use-manual-card'
import { RenderCard } from '../components/RenderCard'

/**
 * Function withCard adds a card wrapper around a provided component.
 * @typedef {{mode: 'manual' | 'automatic'}} withCardMode Choose 'mode' between 'manual' or 'automatic'
 * @param {React.ComponentType<{cardProps:ReturnType<useCard>}>} Component The component
 * @param {import("./use-card").CardOptions & import("./use-manual-card").ManualCardOptions & withCardMode} options Options for the card
 * @returns {(props: {customFields: Object}) => React.Component} The wrapped component with a card
 */
export function withCard(Component, { defaultFrom, defaultSize, length, mode }) {
  return props => {
    const { display } = props.customFields
    const { isAdmin } = useFusionContext()

    const cardProps =
      mode === 'manual'
        ? useManualCard({ customFields: props.customFields, length })
        : useCard({
            customFields: props.customFields,
            defaultFrom,
            defaultSize,
            length,
          })

    return (
      <RenderCard
        display={display}
        items={mode === 'manual' ? cardProps.content : cardProps.collection}
        isAdmin={isAdmin}
      >
        <Component {...props} cardProps={{ ...cardProps }} />
      </RenderCard>
    )
  }
}
