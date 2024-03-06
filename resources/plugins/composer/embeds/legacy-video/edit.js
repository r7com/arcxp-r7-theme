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
  const data = JSON.parse(decodeURIComponent(parameters.p))
  render(data.config)

  document.getElementById('apply-btn').onclick = applyChanges
  document.getElementById('cancel-btn').onclick = cancelChanges
}

function render({ urlHls, urlMp4, poster, metadata }) {
  document.getElementById('legacy-video-src-hls').value = urlHls
  document.getElementById('legacy-video-src-mp4').value = urlMp4
  document.getElementById('legacy-video-poster').value = poster

  const formElements = document.getElementById('form-embed-legacy-video').elements

  const parsedMetadata = metadata

  Array.from(formElements).forEach(element => {
    if (parsedMetadata[element.name] && element.name !== 'ageRatingDescription') {
      element.type === 'checkbox'
        ? (element.checked = parsedMetadata[element.name])
        : (element.value = parsedMetadata[element.name])
    }
  })

  for (const key in parsedMetadata['ageRatingDescription']) {
    const element = document.getElementById(key)

    if (element) {
      element.checked = parsedMetadata['ageRatingDescription'][key]
    }
  }
}

function cancelChanges() {
  sendMessage('cancel')
}

function applyChanges() {
  const formElements = document.getElementById('form-embed-legacy-video').elements
  const metadata = {}
  const ageRatingDesc = {}

  const paramField = ['srcHlsValue', 'srcMp4Value', 'posterUrl', 'ageRatingDescription', '']

  Array.from(formElements).forEach(element => {
    if (!paramField.includes(element.name)) {
      element.type === 'checkbox'
        ? (metadata[element.name] = element.checked)
        : (metadata[element.name] = element.value)
    } else if (element.name === 'ageRatingDescription' && element.checked) {
      ageRatingDesc[element.id] = element.checked
    }
  })

  metadata['ageRatingDescription'] = ageRatingDesc

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
