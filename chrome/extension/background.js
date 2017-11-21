import "babel-polyfill"

/**
 * Check if script is already injected
 */
function isActivated(tabId, callback) {
  return chrome.tabs.executeScript(tabId, {
    code: `var isActivated = window.CaptainFactActivated || false;
    window.CaptainFactActivated = true;
    isActivated;`,
    runAt: 'document_start'
  }, result => {
    // On firefox, executeScript returns a list
    if (typeof(result) !== 'boolean')
      return callback(result[0])
    return callback(result)
  });
}

/**
 * Load `name` script, fetching it from localhost:3000 if running in dev
 */
function loadScript(name, tabId, callback) {
  if (process.env.NODE_ENV !== 'dev') {
    console.log(`[CaptainFact] Load /js/${name}.bundle.js`)
    return chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_start' }, callback);
  } else {
    // dev: async fetch bundle
    fetch(`http://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_start' }, callback))
  }
}

const arrowURLs = ['^https://www.youtube\\.com'];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.match(arrowURLs.join('|')))
    return;
  return isActivated(tabId, activated => {
    if (activated === true) // || chrome.runtime.lastError
      return;
    return loadScript('inject', tabId, () => console.log('[CaptainFact] Load inject bundle success!'));
  })
});
