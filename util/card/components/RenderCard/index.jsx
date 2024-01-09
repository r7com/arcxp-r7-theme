import React from 'react'

/** Conditionally renders the card with fallbacks */
export function RenderCard({ display, content, isAdmin, children }) {
  // Checkbox to display is unchecked and it's on admin
  if (!display && isAdmin) {
    return <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>
  }

  // Is checked to display but got no content from the collection and is admin
  if (!content && isAdmin) {
    return <p>É necessário definir uma fonte de conteúdo para este bloco.</p>
  }

  // Is checked to display and has content from collection
  return children
}
