import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'

import LocalSettings from '../../app/Common/lib/local_settings'
import DataCache from '../../app/Common/lib/data_cache'
import InjectedApp from '../../app/InjectVideo/App/InjectedApp'
import {getVideoProvider} from '../../app/Common/lib/url_utils'


const DOM_NODE_CLASS = 'captainfact-overlay'


function inject() {
  const video = getVideoProvider(location.href)
  if (video === null)
    return

  DataCache.hasVideo(video.provider, video.provider_id).then(hasVideo => {
    if (hasVideo) {
      const injectDOM = document.createElement('div')
      injectDOM.className = DOM_NODE_CLASS
      document.getElementById('movie_player').appendChild(injectDOM)
      ReactDOM.render(<InjectedApp/>, injectDOM)
    }
    else
      console.log('[CaptainFact] This video do not exist on CaptainFact')
  })
}

function removeAll() {
  const injectedElements = Array.from(document.getElementsByClassName(DOM_NODE_CLASS))
  injectedElements.map(domNode => {
    ReactDOM.unmountComponentAtNode(domNode)
    domNode.parentNode.removeChild(domNode)
  })
}

window.addEventListener('load', () => {
  console.log("[CaptainFact] Loaded")
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
