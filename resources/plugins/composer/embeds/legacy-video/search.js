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
  document.getElementById('apply-btn').onclick = applyChanges
}
