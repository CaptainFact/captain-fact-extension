import { CF_FRONT_URL } from './constants'

/**
 * Generate an URL for the "Add Video" form pre-filled with a provider URL
 * @param {string} providerURL - The YouTube URL
 */
export const linkToAddVideo = (providerURL) => {
  return `${CF_FRONT_URL}/videos/add?url=${encodeURIComponent(providerURL)}`
}

/**
 * Generate an URL for the fact-checking page for given video hash id
 * @param {string} hashID - Video hash ID
 */
export const linkToVerificationsPage = (hashID) => {
  return `${CF_FRONT_URL}/videos/${hashID}`
}
