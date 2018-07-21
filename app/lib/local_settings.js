const SETTINGS_KEY = "settings"
const CURRENT_VERSION = 20180721
const DEFAULT_SETTINGS = {
  __SETTINGS_VERSION: CURRENT_VERSION,
  videosOverlay: true,
  newVideosBadge: true
}

const STORAGE = chrome.storage.local


/**
 * Run migrations on settings object
 * @param {Object} settings object
 */
function settingsLoader(settings) {
  // A legacy version used to store settings as a JSON string
  if (typeof settings === 'string')
    settings = JSON.parse(settings)

  // Version changed, see if we have migrations to run
  if (CURRENT_VERSION !== settings.__SETTINGS_VERSION) {
    // Badge settings was included in `20180721`
    if (!settings.__SETTINGS_VERSION && CURRENT_VERSION >= 20180721)
      settings = {
        ...settings,
        __SETTINGS_VERSION: DEFAULT_SETTINGS.__SETTINGS_VERSION,
        newVideosBadge: DEFAULT_SETTINGS.newVideosBadge,
      }
  }
  return settings
}

export default class LocalSettings {
  static load() {
    return new Promise((fulfill) => {
      return STORAGE.get(SETTINGS_KEY, obj => {
        if (obj && obj.hasOwnProperty(SETTINGS_KEY))
          return fulfill(settingsLoader(obj[SETTINGS_KEY]))
        return fulfill(DEFAULT_SETTINGS)
      })
    })
  }

  /**
   * Save given settings object and returns it.
   * (!) Prefer using `setValue` for setting a single value.
   * @param settings object
   */
  static save(settings) {
    return new Promise((fulfill) => {
      STORAGE.set({[SETTINGS_KEY]: settings}, () => fulfill(settings))
    })
  }

  /**
   * Set a value for `key` in settings. Then return the new state.
   * @param {string} key 
   * @param {string} value 
   */
  static setValue(key, value) {
    return LocalSettings.load().then(state => {
      state[key] = value
      return LocalSettings.save(state)
    })
  }

  /**
   * Save given settings object and returns it
   * @param callback function(oldParams, newParams)
   */
  static addChangeListener(callback) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.hasOwnProperty(SETTINGS_KEY)) {
        const { oldValue, newValue } = changes[SETTINGS_KEY]
        callback(oldValue || {}, newValue || {})
      }
    })
  }
}
