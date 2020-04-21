import { has } from 'lodash'
import HttpApi from './http_api'
import BrowserIconBadgeCounter from './browser_icon_badge_counter'

export const CACHE_KEY = 'cache'
export const CACHE_VALIDITY = 15 * 60 * 1000 // 15 minutes
export const DEFAULT = {
  version: '0.8.0', // Changing this version will force the cache to do a full update
  lastId: 0, // Last fetched id
  lastUpdate: null, // Timestamp of the last update
  lastUpdateNbAdded: 0, // Number of videos added during the last update
  data: { youtube: [] }, // The goods
}

export default class DataCache {
  /**
   * Load the cache. Returns a promise that get passed the current cache.
   * If cache is too old, this also updates it.
   */
  static load() {
    return new Promise((fulfill) => {
      return chrome.storage.local.get(CACHE_KEY, (obj) => {
        if (has(obj, CACHE_KEY) && DataCache.checkVersion(obj[CACHE_KEY])) {
          return fulfill(obj[CACHE_KEY])
        }
        return fulfill(DEFAULT)
      })
    })
  }

  /**
   * Ensure cache is not outdated
   */
  static checkVersion(cache) {
    return cache && cache.version === DEFAULT.version
  }

  /**
   * Check if video exists in cache. Returns a promise with a boolean as first param
   */
  static hasVideo(provider, id) {
    return DataCache.updatedCache().then(({ data }) => {
      return data[provider] && data[provider].includes(id)
    })
  }

  /**
   * Update the cache by fetching a new version online **only if existing cache
   * is expired**.
   *
   * If update fails, returns current version of the cache
   */
  static updatedCache(force = false) {
    return DataCache.load().then((cache) => {
      // Check if cache is expired
      if (!force && !isCacheExpired(cache)) return cache

      // Fetch new videos
      return HttpApi.post({
        query: `{videos(limit: 100000, filters: {minId: ${cache.lastId}}) { entries { id facebookId youtubeId } }}`,
      })
        .then((result) => {
          const videos = result?.videos?.entries

          // Do not update if there is no new video
          if (!videos || videos.length === 0) return cache

          // Add videos to cache
          const isFirstUpdate = cache.lastId === 0
          addVideosToCache(cache, videos)

          // Save new cache
          chrome.storage.local.set({ [CACHE_KEY]: cache }, () => {
            console.info('[CaptainFact] Cache updated')
            // Notify BrowserIconBadgeCounter that there are new videos.
            // This is bypassed on first run to avoid having the counter
            // displayed on installation.
            if (!isFirstUpdate) {
              BrowserIconBadgeCounter.increment(cache.lastUpdateNbAdded)
            }
          })
          return cache
        })
        .catch((e) => {
          console.error('[CaptainFact] Cache update failed')
          console.error(JSON.stringify(e))
          return cache
        })
    })
  }
}

/**
 * Add given `videos` to `cache` and update corresponding fields (lastId,
 * lastUpdate...etc).
 *
 * @param {Object} cache
 * @param {Array<Object>} videos
 */
function addVideosToCache(cache, videos) {
  let maxId = 0
  let nbAdded = 0
  for (const video of videos) {
    // Only support YouTube at the moment. Ignore other providers.
    if (video.youtubeId) {
      cache.data.youtube.push(video.youtubeId)
      nbAdded += 1
    }
    // Store last id
    const videoId = parseInt(video.id)
    if (videoId > maxId) maxId = videoId
  }
  cache.lastId = maxId
  cache.lastUpdate = Date.now()
  cache.lastUpdateNbAdded = nbAdded
  return cache
}

/**
 * Check if cache need to be updated
 *
 * @param {Object} cache
 */
function isCacheExpired(cache) {
  return !cache.lastUpdate || Date.now() - cache.lastUpdate > CACHE_VALIDITY
}
