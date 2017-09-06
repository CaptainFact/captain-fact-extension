import React from 'react'
import ReactDOM from 'react-dom'
import InjectedApp from '../../app/InjectVideo/App/InjectedApp'
import LocalSettings from '../../app/Common/lib/localSettings'


const DOM_NODE_CLASS = 'captainfact-overlay'

function inject() {
  const injectDOM = document.createElement('div')
  injectDOM.className = DOM_NODE_CLASS
  document.getElementById('movie_player').appendChild(injectDOM)
  ReactDOM.render(<InjectedApp/>, injectDOM)
}

function removeAll() {
  const injectedElements = Array.from(document.getElementsByClassName(DOM_NODE_CLASS))
  injectedElements.map(domNode => {
    ReactDOM.unmountComponentAtNode(domNode)
    domNode.parentNode.removeChild(domNode)
  })
}

window.addEventListener('load', () => {
  LocalSettings.load().then(({videosOverlay}) => {
    if (videosOverlay)
      inject()
  })
  LocalSettings.addChangeListener((oldParams, newParams) => {
    if (!oldParams.videosOverlay && newParams.videosOverlay)
      inject()
    if (oldParams.videosOverlay && !newParams.videosOverlay)
      removeAll()
  })
});
