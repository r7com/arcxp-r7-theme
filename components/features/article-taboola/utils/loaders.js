/* eslint-disable no-undef */

function taboolaLoader(publisherId, pageType) {
  return `
    window._taboola = window._taboola || [];
    _taboola.push({${pageType}:'auto'});

    !function (e, f, u, i) {
      if (!document.getElementById(i)){
        e.async = 1;
        e.src = u;
        e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'), document.getElementsByTagName('script')[0], '//cdn.taboola.com/libtrc/${publisherId}/loader.js', 'tb_loader_script');

    if(window.performance && typeof window.performance.mark == 'function') {
      window.performance.mark('tbl_ic');
    }
  `
}

function taboolaFlusher() {
  return `
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});
  `
}

function appendScript(name, container, sourceResolver) {
  const script = document.createElement('script')
  script.id = name
  script.async = true
  script.type = 'text/javascript'
  script.innerHTML = sourceResolver()

  container.appendChild(script)
}

export function insertFlusher() {
  const flusherId = 'tbl-flusher'

  const flusher = document.getElementById(flusherId)
  if (flusher) return

  const body = document.getElementsByTagName('body')[0]
  if (!body) return

  appendScript(flusherId, body, taboolaFlusher)
}

export function insertLoader(publisherId, pageType) {
  const loaderId = 'tbl-loader'

  const loader = document.getElementById(loaderId)
  if (loader) return

  const head = document.getElementsByTagName('head')[0]
  if (!head) return

  if (pageType) {
    appendScript(loaderId, head, () => taboolaLoader(publisherId, pageType))
  }
}
