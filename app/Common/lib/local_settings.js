const SETTINGS_KEY = "settings"
const DEFAULT_SETTINGS = {videosOverlay: true}

const storage = chrome.storage.sync


// Params use to be stored as JSON strings. As we now store directly objects, we must
// convert old values to objects. This should be removed in the future.
function legacySettingsLoader(settings) {
  if (typeof(settings) === 'string')
    settings = JSON.parse(settings)
  return settings
}

export default class LocalSettings {
  static load() {
    return new Promise((fulfill, reject) =>
      storage.get(SETTINGS_KEY, obj => fulfill(
        obj.hasOwnProperty(SETTINGS_KEY) ? legacySettingsLoader(obj[SETTINGS_KEY]) : DEFAULT_SETTINGS
      ))
    )
  }

  /**
   * Save given settings object and returns it
   * @param settings object
   */
  static save(settings) {
    return new Promise((fulfill, reject) => {
      storage.set({[SETTINGS_KEY]: settings}, () => fulfill(settings))
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
        callback(oldValue || '{}', newValue || '{}')
      }
    })
  }
}