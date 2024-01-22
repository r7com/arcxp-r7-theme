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
  const srcValue = document.getElementById('legacy-video-src').value
  // const srcValue = 'https://vsh.akamaized.net/i/65971156416eb92c7e000415/BG_0401_QUEDA_RVORE_SION/master.m3u8'
  // const srcValue = 'https://lamberta.github.io/html5-animation/examples/ch04/assets/movieclip.mp4'
  const posterUrl = document.getElementById('legacy-video-poster').value
  const playerUrl = document.getElementById('legacy-video-player-url').value
  const metadata = {
    title: document.getElementById('legacy-video-title').value,
    sectionName: document.getElementById('legacy-video-section-name').value,
    mainSection: document.getElementById('legacy-video-main-section').value,
    subSection: document.getElementById('legacy-video-sub-section').value,
    thirdSection: document.getElementById('legacy-video-third-section').value,
    views: document.getElementById('legacy-video-views').value,
    disableAdv: document.getElementById('legacy-video-disable-adv').checked,
    createdDate: document.getElementById('legacy-video-created-date').value,
    mainSectionUrl: document.getElementById('legacy-video-main-section-url').value,
    sectionPath: document.getElementById('legacy-video-section-path').value,
    ageRating: document.getElementById('legacy-video-age-rating').value,
    ageRatingDescription: document.getElementById('legacy-video-age-rating-description').value,
    duration: document.getElementById('legacy-video-duration').value,
  }

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
