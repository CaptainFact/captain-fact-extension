import React from 'react'
import { BrowserExtension } from '../lib/browser-extension'
import LocalSettings from '../lib/local_settings'
import translate from '../lib/translate'
import buttonStyles from './Button.css'
import classNames from 'classnames'
import { FRONTEND_URL } from 'config'
import { domainToHostWildCard } from '../lib/url_utils'

const EXPECTED_ORIGINS = [
  '*://www.youtube.com/*',
  '*://m.youtube.com/*',
  domainToHostWildCard(FRONTEND_URL),
]

export const checkHasAllDomainsPermissions = async () => {
  return new Promise((resolve) => {
    BrowserExtension.permissions.contains(
      { origins: EXPECTED_ORIGINS },
      (result) => resolve(result)
    )
  })
}

export const GrantPermissions = ({ onClose, canDismiss = true }) => {
  return (
    <div style={{ padding: '16px 32px', fontSize: '18px' }}>
      <p>{translate('requestPermissions')}</p>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '24px',
        }}
      >
        <button
          className={classNames(buttonStyles.button, buttonStyles.primary)}
          onClick={() =>
            BrowserExtension.permissions.request(
              { origins: EXPECTED_ORIGINS },
              (granted) => {
                if (granted) {
                  onClose()
                }
              }
            )
          }
        >
          {translate('btnGrantPermissions')}
        </button>
        {canDismiss && (
          <button
            className={buttonStyles.button}
            onClick={() => {
              LocalSettings.setValue('dismissPermissionWarning', true)
              onClose()
            }}
          >
            {translate('btnNoPermissions')}
          </button>
        )}
      </div>
    </div>
  )
}
