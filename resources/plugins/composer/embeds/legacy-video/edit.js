import { applyChanges, parseQueryString, sendMessage } from './utils/utils'

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

function render({ url, poster, playerUrl, metadata }) {
  document.getElementById('legacy-video-src').value = url
  document.getElementById('legacy-video-poster').value = poster
  document.getElementById('legacy-video-player-url').value = playerUrl

  const formElements = document.getElementById('form-embed-legacy-video').elements

  const parsedMetadata = JSON.parse(metadata)

  Array.from(formElements).forEach(element => {
    if (parsedMetadata[element.name]) {
      element.type === 'checkbox'
        ? (element.checked = parsedMetadata[element.name])
        : (element.value = parsedMetadata[element.name])
    }
  })
}

function cancelChanges() {
  sendMessage('cancel')
}
