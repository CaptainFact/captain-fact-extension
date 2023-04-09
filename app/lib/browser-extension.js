/**
 * We don't want to hardcode "chrome" everywhere in the codebase, so we export this alias instead
 * See https://bugs.chromium.org/p/chromium/issues/detail?id=798169
 */

export const BrowserExtension =
  // eslint-disable-next-line no-undef
  typeof browser !== 'undefined' ? browser : chrome
