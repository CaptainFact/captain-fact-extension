import CaptainFactOverlayInjector from 'captain-fact-overlay-injector'


const injector = new CaptainFactOverlayInjector({
  injector: {
    videosSelector: () => [document.getElementById('movie_player')],
    urlExtractor: () => location.href,
    getPlayer: (video, adapters) => new adapters.HTML5(video.querySelector('video'))
  },

  app: {
    baseSize: '1.5em',
    graphics: {
      logo: {
        neutral: chrome.runtime.getURL('img/icon.png'),
        confirm: chrome.runtime.getURL('img/icon_confirm.png'),
        refute: chrome.runtime.getURL('img/icon_refute.png'),
      },
      newTab: chrome.runtime.getURL('img/new_tab.png'),
      star: chrome.runtime.getURL('img/star.png')
    }
  }
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'isReady')
    console.log('IS_READY') || sendResponse(true)
  else if (request.type === 'disable')
    console.log('DISABLE') || injector.disable()
  else if (request.type === 'enable')
    console.log('ENABLE') || injector.enable()
  else if (request.type === 'reload')
    console.log('RELOAD') || injector.reload()
})
