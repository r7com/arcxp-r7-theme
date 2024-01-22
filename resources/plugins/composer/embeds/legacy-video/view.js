window.onload = function () {
  const parameters = Object.assign(
    {
      wait: 0,
    },
    parseQueryString(),
  )
  setTimeout(function () {
    sendMessage('ready', {
      height: 440,
    })
  }, Number.parseInt(parameters.wait))

  const data = JSON.parse(decodeURIComponent(parameters.p))
  render(data.config)
}

function render({ url, poster, playerUrl, metadata }) {
  const videosSrc = document.querySelectorAll('[data-legacy-video-src]')
  videosSrc.forEach(videoSource => {
    videoSource.src = url
  })

  const videoElement = document.getElementById('r7-video')
  videoElement.poster = poster
  videoElement.dataset.playerUrl = playerUrl
  videoElement.dataset.metadata = JSON.stringify(metadata)

  videoElement.load()
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
