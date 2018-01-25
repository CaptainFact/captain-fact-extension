import CaptainFactOverlayInjector from 'captain-fact-overlay-injector'
import { CF_API_URL } from "../../app/lib/constants"


console.log('[CaptainFact] Inject into video')

const injector = new CaptainFactOverlayInjector({
  injector: {
    videosSelector: () => [document.getElementById('movie_player') || document.getElementById('player')],
    urlExtractor: () => location.href,
    getPlayer: (video, adapters) => new adapters.HTML5(video.querySelector('video'))
  },

  app: {
    baseSize: '1.4em',
    graphics: {
      logo: {
        neutral: chrome.runtime.getURL('img/icon.png'),
        confirm: chrome.runtime.getURL('img/icon_confirm.png'),
        refute: chrome.runtime.getURL('img/icon_refute.png'),
      },
      newTab: chrome.runtime.getURL('img/new_tab.png'),
      star: chrome.runtime.getURL('img/star.png')
    }
  },

  services: {
    apiURL: CF_API_URL
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'isReady')
    sendResponse(true)
  else if (request.type === 'disable')
    console.log('[CaptainFact] Disable') || injector.disable()
  else if (request.type === 'enable')
    console.log('[CaptainFact] Enable') || injector.enable()
  else if (request.type === 'reload')
    console.log('[CaptainFact] Reload') || injector.reload()
})
