const providers = {
  youtube:
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i,
}

/**
 * Analyse an url to extract its provider / provider ID
 * @returns Object `{provider, provider_id}`. If url is not recognized, returns `null`
 * @param url
 */
export const getVideoProvider = (url) => {
  for (const provider in providers) {
    const execResult = providers[provider].exec(url)
    if (execResult !== null) return { provider, providerId: execResult[1] }
  }
  return null
}

/**
 * From a domain like `https://captainfact.io`, returns a pattern like `*://*.captainfact.io/*`
 * that can be used in extension manifest/permissions.
 */
export const domainToHostWildCard = (domain) => {
  return domain.replace(/^https:\/\//, '*://*.') + '/*'
}
