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
  document.getElementById('legacy-video-title').value = metadata.title
  document.getElementById('legacy-video-section-name').value = metadata.sectionName
  document.getElementById('legacy-video-main-section').value = metadata.mainSection
  document.getElementById('legacy-video-sub-section').value = metadata.subSection
  document.getElementById('legacy-video-third-section').value = metadata.thirdSection
  document.getElementById('legacy-video-views').value = metadata.views
  document.getElementById('legacy-video-disable-adv').checked = metadata.disableAdv
  document.getElementById('legacy-video-created-date').value = metadata.createdDate
  document.getElementById('legacy-video-main-section-url').value = metadata.mainSectionUrl
  document.getElementById('legacy-video-section-path').value = metadata.sectionPath
  document.getElementById('legacy-video-age-rating').value = metadata.ageRating
  document.getElementById('legacy-video-age-rating-description').value =
    metadata.ageRatingDescription
  document.getElementById('legacy-video-duration').value = metadata.duration
}
function applyChanges() {
  const srcValue = document.getElementById('legacy-video-src').value
  // const srcValue = 'https://vsh.akamaized.net/i/65971156416eb92c7e000415/BG_0401_QUEDA_RVORE_SION/master.m3u8'
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

function cancelChanges() {
  sendMessage('cancel')
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
