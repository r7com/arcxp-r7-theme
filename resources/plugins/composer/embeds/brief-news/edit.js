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

function render({ textList, textTitle }) {
  const list = document.getElementById('list')
  const title = document.getElementById('title')

  title.textContent = textTitle
  textList.forEach(text => {
    const entry = document.createElement('li')
    entry.textContent = text
    entry.classList.add('list__item')
    list.appendChild(entry)
  })

  list.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const originalText = e.target.textContent
      const input = document.createElement('input')
      input.classList.add('container__list-input')
      input.value = originalText

      e.target.textContent = ''
      e.target.appendChild(input)
      input.focus()

      input.addEventListener('blur', () => {
        const newText = input.value.trim()
        if (newText === '') {
          e.target.remove()
        } else {
          e.target.textContent = newText
        }
      })
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const newItem = document.createElement('li')
          newItem.textContent = ''
          list.appendChild(newItem)
          newItem.click()
        }
      })
    }
  })
  title.addEventListener('click', e => {
    const originalText = e.target.textContent
    const input = document.createElement('input')
    input.classList.add('container__title-input')
    input.value = originalText

    e.target.textContent = ''
    e.target.appendChild(input)
    input.focus()

    input.addEventListener('blur', () => {
      const newText = input.value.trim()
      if (newText === '') {
        e.target.textContent = originalText
      } else {
        e.target.textContent = newText
      }
    })
  })
}
function applyChanges() {
  const title = document.getElementById('title')
  const list = document.getElementById('list')
  const textList = []

  Array.from(list.querySelectorAll('li')).forEach(item => {
    textList.push(item.textContent)
  })

  const ansCustomEmbed = {
    id: Date.now().toString(),
    url: '/',
    config: {
      textTitle: title.textContent,
      textList: textList,
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
