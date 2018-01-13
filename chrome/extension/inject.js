// import React from 'react'
// import ReactDOM from 'react-dom'
import CaptainFactOverlayInjector from '../../../captain-fact-overlay-injector/dist/captainfact-overlay-injector'


let injector = new CaptainFactOverlayInjector({
  injector: {
    videosSelectorFunc: () => console.log(document.getElementById('movie_player')) || [document.getElementById('movie_player')],
    urlExtractor: () => console.log(location.href) || location.href,
    getPlayer: (video, adapters) => console.log(video.querySelector('video')) || new adapters.HTML5(video.querySelector('video')),

    // Optional
    activateToggleBtnClass: undefined,
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

console.log(injector)

// console.log(CaptainFactOverlayInjector)
//
// import InjectedApp from '../../app/InjectVideo/App/InjectedApp'
//
// const DOM_NODE_CLASS = 'captainfact-overlay'
// const CF_BUTTON_NODE_CLASS = 'CFButton'
//
//
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'isReady')
//     sendResponse(true)
//   else if (request.type === 'disable')
//     haraKiri()
//   else if (request.type === 'enable')
//     inject()
//   else if (request.type === 'reload')
//     haraKiri() && inject()
// })
//
// function inject() {
//   console.log(`[CaptainFact] Inject video overlay for url ${location.href}`)
//   const injectDOM = document.createElement('div')
//   injectDOM.className = DOM_NODE_CLASS
//   document.getElementById('movie_player').appendChild(injectDOM)
//   ReactDOM.render(<InjectedApp videoUrl={location.href}/>, injectDOM)
//   return true
// }
//
// function haraKiri() {
//   console.log('[CaptainFact] Disabling...')
//
//   // Delete all DOM elements
//   const injectedElements = [
//     ...document.getElementsByClassName(DOM_NODE_CLASS), ...document.getElementsByClassName(CF_BUTTON_NODE_CLASS)
//   ]
//   injectedElements.map(domNode => {
//     ReactDOM.unmountComponentAtNode(domNode)
//     domNode.parentNode.removeChild(domNode)
//   })
//   return true
// }
//
// // Enabled by default
// inject()