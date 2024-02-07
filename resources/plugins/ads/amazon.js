console.log('amazon.js loaded')

//load the apstag.js library
!(function (a9, a, p, s, t, A, g) {
  if (a[a9]) return
  function q(c, r) {
    a[a9]._Q.push([c, r])
  }
  a[a9] = {
    init: function () {
      q('i', arguments)
    },
    fetchBids: function () {
      q('f', arguments)
    },
    setDisplayBids: function () {},
    targetingKeys: function () {
      return []
    },
    _Q: [],
  }
  A = p.createElement(s)
  A.async = !0
  A.src = t
  g = p.getElementsByTagName(s)[0]
  g.parentNode.insertBefore(A, g)
})('apstag', window, document, 'script', '//c.amazon-adsystem.com/aax2/apstag.js')

apstag.init({
  pubID: '2d3489e5-6204-413c-9ba8-96ff17e7c327',
  adServer: 'googletag',
})
