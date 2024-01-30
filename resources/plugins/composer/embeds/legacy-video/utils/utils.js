export function sendMessage(action, data) {
  window.parent.postMessage(
    JSON.stringify({
      source: 'custom_embed',
      action,
      data,
      key: parseQueryString()['k'],
    }),
    '*',
  )
}

export function parseQueryString() {
  const params = location.search.split('?')[1] || ''
  const kv = params.split('&')
  return kv.reduce((result, item) => {
    const [key, value] = item.split('=')
    return Object.assign(result, {
      [key]: value,
    })
  }, {})
}

export function applyChanges() {
  const formElements = document.getElementById('form-embed-legacy-video').elements
  const metadata = {}

  const paramField = ['srcValue', 'posterUrl', 'playerUrl']

  Array.from(formElements).forEach(element => {
    if (!paramField.includes(element.name)) {
      element.type === 'checkbox'
        ? (metadata[element.name] = element.checked)
        : (metadata[element.name] = element.value)
    }
  })

  const srcValue = formElements['srcValue'].value
  const posterUrl = formElements['posterUrl'].value
  const playerUrl = formElements['playerUrl'].value

  const ansCustomEmbed = {
    id: Date.now().toString(),
    url: '/',
    config: {
      url: srcValue,
      poster: posterUrl,
      playerUrl,
      metadata: JSON.stringify(metadata),
    },
  }

  sendMessage('data', ansCustomEmbed)
}
