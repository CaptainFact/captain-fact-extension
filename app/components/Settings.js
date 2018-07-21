import React from 'react'

import Select from './Select.js'
import styles from './Settings.css'
import LocalSettings from '../lib/local_settings.js'
import translate from '../lib/translate.js'
import BrowserIconBadgeCounter from '../lib/browser_icon_badge_counter.js'


const SELECT_OPTIONS_ON_OFF = {
  ON: true, 
  OFF: false
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {settings: null}
  }

  componentDidMount() {
    LocalSettings.load().then(settings => this.setState({settings}))
  }

  handleChange(key, value) {
    return LocalSettings
      .setValue(key, value)
      .then(newSettings => this.setState({
        settings: {...this.state.settings, ...newSettings}
      }))
  }

  render() {
    const { settings } = this.state
    if (!settings)
      return null

    return (
      <div>
        <div className={styles.control}>
          <label>{translate("settingYoutubeOverlay")}</label>
          <Select
            name="videosOverlay"
            selected={settings.videosOverlay}
            onChange={value => this.handleChange("videosOverlay", value)}
            options={SELECT_OPTIONS_ON_OFF}
          />
        </div>
        <div className={styles.control}>
          <label>Compteur de nouvelles vidéos</label>
          <Select
            name="newVideosBadge"
            selected={settings.newVideosBadge}
            onChange={value => this.handleChange("newVideosBadge", value).then(() => {
              if (value === false) {
                BrowserIconBadgeCounter.reset()
              }
            })}
            options={SELECT_OPTIONS_ON_OFF}
          />
        </div>
      </div>
    )
  }
}
