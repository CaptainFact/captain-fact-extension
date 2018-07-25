import BrowserIconBadgeCounter, { MAX_VALUE } from './browser_icon_badge_counter'


beforeEach(() => {
  chrome.browserAction.getBadgeText.mockClear()
  chrome.browserAction.setBadgeText.mockClear()
})

test('reset counter', () => {
  return BrowserIconBadgeCounter.reset().then(() => {
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({text: ''})
  })
})

describe('increment', () => {
  it('should set value if empty', () => {
    return BrowserIconBadgeCounter.increment(40).then(() => {
      expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({text: '40'})
    })
  })

  it('should increment existing value if already set', () => {
    const initialValue = '40'
    const incrementValue = 2
    const expectedResult = '42'

    // Mock getBadgeText
    chrome.browserAction.getBadgeText.mockImplementation((_, func) => {
      return func(initialValue)
    })

    // Increment and verify result
    return BrowserIconBadgeCounter.increment(incrementValue).then(() => {
      expect(chrome.browserAction.setBadgeText)
        .toHaveBeenCalledWith({text: expectedResult})
    })
  })

  it('should never go above threshold', () => {
    const expected = {text: `${MAX_VALUE}+`}

    return BrowserIconBadgeCounter.increment(MAX_VALUE + 50).then(() => {
      expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith(expected)
    })
  })
})
