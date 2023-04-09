import { CF_FRONT_URL } from './constants'

/**
 * Generate an URL for the fact-checking page for given video hash id
 * @param {string} hashID - Video hash ID
 */
export const linkToVerificationsPage = (hashID) => {
  return `${CF_FRONT_URL}/videos/${hashID}`
}
