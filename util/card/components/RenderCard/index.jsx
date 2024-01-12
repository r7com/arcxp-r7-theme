import React from 'react'

/** Conditionally renders the card with fallbacks */
export function RenderCard({ display, content, isAdmin, children }) {
  // Returns the wrapped component if has checked "Exibir bloco" and has collection
  if (display && content?.content_elements?.length > 0) {
    return children
  }

  // Admin errors (not showed at the end user delivery)
  if (isAdmin) {
    // Checkbox to display is unchecked and it's on admin
    if (!display) {
      return <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>
    }

    // Is checked to display but got no content from the collection and is admin
    if (!content) {
      return <p>É necessário definir uma fonte de conteúdo para este bloco.</p>
    }

    // Didn't find any item on the collection
    if (content?.content_elements?.length === 0) {
      return (
        <p>
          Nenhum item encontrado na collection, verifique os valores &quot;from&quot; e
          &quot;size&quot;.
        </p>
      )
    }

    return null
  }

  return null
}
