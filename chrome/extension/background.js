import "babel-polyfill"
import LocalSettings from '../../app/lib/local_settings'
import DataCache from '../../app/lib/data_cache'
import { getVideoProvider } from '../../app/lib/url_utils'


/*
  Content API
*/
class ContentApi {
  static isReady = (tabId, callback) => chrome.tabs.sendMessage(tabId, {type: 'isReady'}, callback)
  static disable = (tabId) => chrome.tabs.sendMessage(tabId, {type: 'disable'})
  static enable = (tabId) => chrome.tabs.sendMessage(tabId, {type: 'enable'})
  static reload = (tabId) => chrome.tabs.sendMessage(tabId, {type: 'reload'})
}

/**
 * Load `name` script, fetching it from localhost:3000 if running in dev
 */
function loadScript(name, tabId, callback) {
  if (process.env.NODE_ENV !== 'development') {
    console.log(`[CaptainFact] Load /js/${name}.bundle.js`)
    return chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_end' }, callback);
  } else {
    // dev: async fetch bundle
    fetch(`http://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, callback))
  }
}

/**
 * Check if video exist using DataCache and inject bundle script if it does
 */
function injectIfVideoExist(tabId, url) {
  const video = getVideoProvider(url)
  if (video === null)
    return

  DataCache.hasVideo(video.provider, video.provider_id).then(hasVideo => {
    if (hasVideo) {
      console.log('[CaptainFact] Video found, injecting facts 🌷')
      ContentApi.isReady(tabId, isReady => {
        if (isReady)
          ContentApi.reload(tabId)
        else
          loadScript('inject', tabId, () => console.log('[CaptainFact] Load inject bundle success!'));
      })
    } else {
      console.log('[CaptainFact] Unknown video')
      ContentApi.disable(tabId)
    }
  })
}

/*
  Actual script
*/

const allowedUrls = ['https://www.youtube.com/watch*'];
let isEnabled = false

// Enable or disable overlay based on settings changes
LocalSettings.load().then(({videosOverlay}) => {
  isEnabled = videosOverlay
  LocalSettings.addChangeListener((oldParams, newParams) => {
    isEnabled = newParams.videosOverlay
    if (oldParams.videosOverlay && !newParams.videosOverlay)
      chrome.tabs.query({url: allowedUrls}, tabs => tabs.map(t => ContentApi.disable(t.id)))
    else if (!oldParams.videosOverlay && newParams.videosOverlay)
      chrome.tabs.query({url: allowedUrls, active: true}, tabs => tabs.map(t => injectIfVideoExist(t.id, t.url)))
  })
})

// Watch for new tabs to inject into
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!isEnabled || !changeInfo.url)
    return;
  else if (!tab.url.match(allowedUrls.join('|')))
    ContentApi.disable(tabId)
  else
    injectIfVideoExist(tabId, changeInfo.url)
})
