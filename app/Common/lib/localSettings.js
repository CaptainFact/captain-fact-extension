const SETTINGS_KEY = "settings"
const DEFAULT_SETTINGS = {
  videosOverlay: true
}

const storage = chrome.storage.sync

export default class LocalSettings {
  static load() {
    return new Promise((fulfill, reject) => {
      storage.get(SETTINGS_KEY, obj => fulfill(
        obj.hasOwnProperty(SETTINGS_KEY) ?
          JSON.parse(obj[SETTINGS_KEY]) :
          DEFAULT_SETTINGS
      ))
    })
  }

  /**
   * Save given settings object and returns it
   * @param settings object
   */
  static save(settings) {
    return new Promise((fulfill, reject) => {
      storage.set({[SETTINGS_KEY]: JSON.stringify(settings)}, () => fulfill(settings))
    })
  }

  /**
   * Save given settings object and returns it
   * @param callback function(oldParams, newParams)
   */
  static addChangeListener(callback) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes.hasOwnProperty(SETTINGS_KEY)) {
        const { oldValue, newValue } = changes[SETTINGS_KEY]
        callback(JSON.parse(oldValue || '{}'), JSON.parse(newValue || '{}'))
      }
    })
  }
}