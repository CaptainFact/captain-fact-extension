import HttpApi from './http_api'

const CACHE_KEY = "cache"
const CACHE_VALIDITY = 5 * 60 * 1000 // 5 minutes
const DEFAULT = {last_id: 0, last_update: null, data: {youtube: []}}


export default class DataCache {
  /**
   * Load the cache. Returns a promise that get passed the current cache. If cache is too old, this also updates
   * it.
   */
  static load() {
    return new Promise((fulfill, reject) =>
      chrome.storage.local.get(CACHE_KEY, obj => fulfill(
        obj && obj.hasOwnProperty(CACHE_KEY) ? obj[CACHE_KEY] : DEFAULT
      ))
    )
  }

  /**
   * Check if video exists in cache. Returns a promise with a boolean as first param
   */
  static hasVideo(provider, id) {
    return DataCache.updatedCache().then(({data}) =>
      data[provider].includes(id)
    )
  }

  /**
   * Update the cache by fetching a new version online **only if existing cache is expired**. If update fails,
   * returns current version of the cache
   */
  static updatedCache() {
    return DataCache.load().then(cache => {
      if (cache.last_update && Date.now() - cache.last_update <= CACHE_VALIDITY)
        return cache

      return HttpApi.get(`/videos/index?min_id=${cache.last_id}`).then(videos => {
        if (videos.length === 0)
          return cache

        // Add videos to cache
        let maxId = 0
        for (const video of videos) {
          if (video.provider === 'youtube')
            cache.data.youtube.push(video.provider_id)
          // Store last id
          if (video.id > maxId)
            maxId = video.id
        }
        cache.last_id = maxId
        cache.last_update = Date.now()

        // Save cache
        chrome.storage.local.set({[CACHE_KEY]: cache}, () => console.log("[CaptainFact] Cache updated"))
        return cache
      }).catch(e => {
        console.error("[CaptainFact] Cache update failed", e)
        return cache
      })
    })
  }
}