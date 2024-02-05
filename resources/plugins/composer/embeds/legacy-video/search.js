window.onload = function () {
  const parameters = Object.assign(
    {
      wait: 0,
    },
    parseQueryString(),
  )
  setTimeout(function () {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
  }, Number.parseInt(parameters.wait))
  document.getElementById('apply-btn').onclick = applyChanges
}

function applyChanges() {
  const formElements = document.getElementById('form-embed-legacy-video').elements
  const metadata = {}

  const paramField = ['srcHlsValue', 'srcMp4Value', 'posterUrl', '']

  Array.from(formElements).forEach(element => {
    if (!paramField.includes(element.name)) {
      element.type === 'checkbox'
        ? (metadata[element.name] = element.checked)
        : (metadata[element.name] = element.value)
    }
  })

  const srcHlsValue = formElements['srcHlsValue'].value
  const srcMp4Value = formElements['srcMp4Value'].value
  const posterUrl = formElements['posterUrl'].value

  const ansCustomEmbed = {
    id: Date.now().toString(),
    url: '/',
    config: {
      urlHls: srcHlsValue,
      urlMp4: srcMp4Value,
      poster: posterUrl,
      metadata: metadata,
    },
  }

  sendMessage('data', ansCustomEmbed)
}

function parseQueryString() {
  const params = location.search.split('?')[1] || ''
  const kv = params.split('&')
  return kv.reduce((result, item) => {
    const [key, value] = item.split('=')
    return Object.assign(result, {
      [key]: value,
    })
  }, {})
}

function sendMessage(action, data) {
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
