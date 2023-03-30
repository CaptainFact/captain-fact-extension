import LocalSettings from './local_settings'

export const MAX_VALUE = 99

export default class BrowserIconBadgeCounter {
  /**
   * Reset / remove badge text
   * @param {function() {...}} callback
   */
  static reset() {
    return new Promise((fulfill) => {
      fulfill(setBadgeText(''))
    })
  }

  /**
   * Increment current counter by `value`. If badge is disabled in settings,
   * do nothing.
   *
   * @param {integer} increment value as a positive integer
   */
  static increment(value) {
    return LocalSettings.getValue('newVideosBadge').then((isActivated) => {
      if (!isActivated) return null

      return chrome.browserAction.getBadgeText({}, (currentValueStr) => {
        const intValue = decodeValue(currentValueStr)
        const newValueStr = encodeValue(intValue + value)
        return setBadgeText(newValueStr)
      })
    })
  }
}

// Private functions

/**
 * Set the given `text` as extension's icon badge. To remove the badge, send an
 * empty string here.
 *
 * @param {string} text : a 0-4 characters string of the text to display
 */
function setBadgeText(text) {
  return chrome.browserAction.setBadgeText({ text })
}

/**
 * @param {string} value : Encoded value
 * @returns {integer} parsed value or 0 if empty / bad format
 */
function decodeValue(valueStr) {
  const parsedValue = /(\d+)(\+)?/.exec(valueStr)

  // Value doesn't match the expected format. It may be empty or deprecated.
  if (!parsedValue) return 0

  // Return the number captured by (\d+)
  return parseInt(parsedValue[1])
}

/**
 * Encode the given value to be displayed on the badge.
 * If value is 0, an empty string will be returned to hide the badge.
 * If value is above `MAX_VALUE`, the string `${MAX_VALUE}+` is returned.
 *
 * @param {integer} valueInt
 * @returns {string} the resulting string ready to be used in badge
 */
function encodeValue(valueInt) {
  if (valueInt === 0) {
    return ''
  } else if (valueInt >= MAX_VALUE) {
    return `${MAX_VALUE}+`
  }
  return `${valueInt}`
}
