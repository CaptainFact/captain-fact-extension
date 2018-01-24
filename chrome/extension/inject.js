import React from 'react'
import ReactDOM from 'react-dom'

import InjectedApp from '../../app/InjectVideo/App/InjectedApp'

const DOM_NODE_CLASS = 'captainfact-overlay'
const CF_BUTTON_NODE_CLASS = 'CFButton'


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'isReady')
    sendResponse(true)
  else if (request.type === 'disable')
    haraKiri()
  else if (request.type === 'enable')
    inject()
  else if (request.type === 'reload')
    haraKiri() && inject()
})

function inject() {
  console.log(`[CaptainFact] Inject video overlay for url ${location.href}`)
  const injectDOM = document.createElement('div')
  injectDOM.className = DOM_NODE_CLASS
  document.getElementById('movie_player').appendChild(injectDOM)
  ReactDOM.render(<InjectedApp videoUrl={location.href}/>, injectDOM)
  return true
}

function haraKiri() {
  console.log('[CaptainFact] Disabling...')

  // Delete all DOM elements
  const injectedElements = [
    ...document.getElementsByClassName(DOM_NODE_CLASS), ...document.getElementsByClassName(CF_BUTTON_NODE_CLASS)
  ]
  injectedElements.map(domNode => {
    ReactDOM.unmountComponentAtNode(domNode)
    domNode.parentNode.removeChild(domNode)
  })
  return true
}

// Enabled by default
inject()