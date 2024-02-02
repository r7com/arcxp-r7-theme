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

function render({ urlHls, urlMp4, poster, metadata }) {
  const videosSrcHls = document.querySelectorAll('[data-legacy-video-src-hls]')
  videosSrcHls.forEach(videoSource => {
    videoSource.src = urlHls
  })

  const videosSrcMp4 = document.querySelector('[data-legacy-video-src-mp4]')
  videosSrcMp4.src = urlMp4

  const videoElement = document.getElementById('r7-video')
  videoElement.poster = poster
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
