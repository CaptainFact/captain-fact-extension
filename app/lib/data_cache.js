import HttpApi from './http_api'

const CACHE_KEY = "cache"
const CACHE_VALIDITY = 15 * 60 * 1000 // 15 minutes
const DEFAULT = {
  version: '0.8.0',   // Changing this version will force the cache to do a full update
  lastId: 0,          // Last fetched id
  lastUpdate: null,   // Timestamp of the last update
  data: {youtube: []} // The goods
}


export default class DataCache {
  /**
   * Load the cache. Returns a promise that get passed the current cache. If cache is too old, this also updates
   * it.
   */
  static load() {
    return new Promise((fulfill, reject) =>
      chrome.storage.local.get(CACHE_KEY, obj => fulfill(
        obj && obj.hasOwnProperty(CACHE_KEY) && DataCache.checkVersion(obj[CACHE_KEY]) ? obj[CACHE_KEY] : DEFAULT
      ))
    )
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
      // Check if cache is expired
      if (cache.lastUpdate && Date.now() - cache.lastUpdate <= CACHE_VALIDITY)
        return cache

      // Fetch new videos
      return HttpApi.post({query: `{allVideos(filters: {minId: ${cache.lastId}}) {id provider providerId}}`})
        .then(({allVideos}) => {
          if (allVideos.length === 0)
            return cache

          // Add videos to cache
          let maxId = 0
          for (const video of allVideos) {
            if (video.provider === 'youtube')
              cache.data.youtube.push(video.providerId)
            // Store last id
            const videoId = parseInt(video.id)
            if (videoId > maxId)
              maxId = videoId
          }
          cache.lastId = maxId
          cache.lastUpdate = Date.now()

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