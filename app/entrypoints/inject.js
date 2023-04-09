import CaptainFactOverlayInjector from 'captain-fact-overlay-injector'
import { CF_API_URL } from '../lib/constants'
import { getVideoProvider } from '../lib/url_utils'
import LocalSettings from '../lib/local_settings'
import DataCache from '../lib/data_cache'
import { BrowserExtension } from '../lib/browser-extension'

console.info('[CaptainFact] Inject into video')

const SUPPORTED_LANGUAGES = ['en', 'fr']
const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]
const LANGUAGE = BrowserExtension.i18n.getUILanguage().replace(/-.*/, '')

// TODO: Move to a MutationObserver
const waitForVideoPlayer = async (tries = 15) => {
  if (tries === 0) {
    console.error('[CaptainFact] Failed to find the video player in time')
    return false
  } else if (!document.getElementById('movie_player')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(waitForVideoPlayer(tries - 1)), 200)
    })
  } else {
    return true
  }
}

// Singleton injector. Will be set by `injectVideoOverlay`
let injector

const injectVideoOverlay = () => {
  if (injector) {
    console.warn('[CaptainFact] Already injected')
    return
  }

  // Instantiate the injector with our custom configuration
  injector = new CaptainFactOverlayInjector({
    injector: {
      videosSelector: () => [document.getElementById('movie_player')],
      urlExtractor: () => location.href,
      getPlayer: (video, adapters) =>
        new adapters.HTML5(video.querySelector('video')),
    },
    app: {
      baseSize: '16px',
      language: SUPPORTED_LANGUAGES.includes(LANGUAGE)
        ? LANGUAGE
        : DEFAULT_LANGUAGE,
      graphics: {
        logo: {
          neutral: BrowserExtension.runtime.getURL('img/logo-borderless.svg'),
          confirm: BrowserExtension.runtime.getURL(
            'img/confirm-borderless.svg'
          ),
          refute: BrowserExtension.runtime.getURL('img/refute-borderless.svg'),
        },
        newTab: BrowserExtension.runtime.getURL('img/new_tab.png'),
        star: BrowserExtension.runtime.getURL('img/star.png'),
        next: BrowserExtension.runtime.getURL('img/next.svg'),
        prev: BrowserExtension.runtime.getURL('img/prev.svg'),
        close: BrowserExtension.runtime.getURL('img/close.svg'),
      },
    },
    services: {
      apiURL: CF_API_URL,
    },
  })

  // Watch for the theater mode button to make sure we update the overlay size/position after the resize
  const theaterBtn = document.querySelector('.ytp-size-button')
  if (theaterBtn) {
    theaterBtn.addEventListener('click', () =>
      setTimeout(injector.forceResize, 50)
    )
  }
}

/**
 * Called when a route change is detected (and on first page load)
 */
const onPageLoad = async () => {
  // Whatever happens, we want to disable the current overlay
  injector?.disable()

  // Stop if we're not on a supported URL
  const videoInfo = getVideoProvider(window.location.href)
  if (!videoInfo) {
    return
  }

  // Other
  const { provider, providerId } = videoInfo
  const hasVideo = await DataCache.hasVideo(provider, providerId)
  if (!hasVideo) {
    return
  }

  console.debug('[CaptainFact] Video found, injecting facts 🌷')
  if (await waitForVideoPlayer()) {
    if (injector) {
      injector.enable()
    } else {
      injectVideoOverlay()
    }
  } else {
    console.error('[CaptainFact] Failed to find the video player in time')
  }
}

/**
 * Main entrypoint: inject if enabled in settings, and watch for settings changes
 * to enable/disable overlay.
 */
LocalSettings.load().then((settings) => {
  if (settings.videosOverlay) {
    window.addEventListener('yt-navigate-finish', onPageLoad)
  }

  // Enable or disable overlay based on settings changes
  LocalSettings.addChangeListener((oldParams, newParams) => {
    if (oldParams.videosOverlay && !newParams.videosOverlay) {
      injector?.disable()
      window.removeEventListener('yt-navigate-finish', onPageLoad)
    } else if (!oldParams.videosOverlay && newParams.videosOverlay) {
      if (injector) {
        injector.enable()
      } else {
        onPageLoad()
      }

      // Watch for URL changes to update the overlay
      window.addEventListener('yt-navigate-finish', onPageLoad)
    }
  })
})
