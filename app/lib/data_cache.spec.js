import { BrowserExtension } from './browser-extension'
import DataCache, { DEFAULT, CACHE_KEY } from './data_cache'

describe('load', () => {
  it('returns default cache if no cache exist', () => {
    return DataCache.load().then((cache) => {
      expect(cache).toBe(DEFAULT)
    })
  })

  it('returns cache from browser.storage.local if any', () => {
    const cache = mockStorageGetCache({
      ...DEFAULT,
      lastId: 42,
      lastUpdate: Date.now(),
      data: { youtube: ['xxxxxxx', 'yyyyyyy'] },
    })
    return DataCache.load().then((loadedCache) => {
      expect(loadedCache).toBe(cache)
    })
  })
})

describe('hasVideo', () => {
  const existingYoutubeId = 'BestIdEver'

  beforeEach(() => {
    return mockStorageGetCache({
      ...DEFAULT,
      lastId: 42,
      lastUpdate: Date.now(),
      data: { youtube: [existingYoutubeId] },
    })
  })

  it('returns true when provider and ID exists', () => {
    return DataCache.hasVideo('youtube', existingYoutubeId).then((exist) => {
      return expect(exist).toBeTruthy()
    })
  })

  it('returns false when ID is invalid', () => {
    return DataCache.hasVideo('youtube', 'BadYoutubeID').then((exist) => {
      return expect(exist).toBeFalsy()
    })
  })

  it('returns false when provider is invalid', () => {
    return DataCache.hasVideo('BadProvider', existingYoutubeId).then(
      (exist) => {
        return expect(exist).toBeFalsy()
      }
    )
  })
})

describe('updatedCache', () => {
  // TODO
})

test('checkVersion', () => {
  const outDatedCache = mockStorageGetCache({
    ...DEFAULT,
    version: 'NewVersion',
  })

  expect(DataCache.checkVersion(DEFAULT)).toBeTruthy()
  expect(DataCache.checkVersion(outDatedCache)).toBeFalsy()
})

function mockStorageGetCache(value) {
  BrowserExtension.storage.local.get.mockImplementation((key, callback) => {
    if (key === CACHE_KEY) return callback({ [CACHE_KEY]: value })
    return null
  })
  return value
}
