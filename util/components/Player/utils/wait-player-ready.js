export const waitPlayerReady = async () => {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (window.videojs) {
        clearInterval(timer)
        resolve()
      }
    }, 10)
  })
}
