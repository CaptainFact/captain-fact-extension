import React from 'react';

import Select from './Select.js'
import styles from './Settings.css'
import LocalSettings from '../lib/local_settings.js'
import translate from '../lib/translate.js'


const SELECT_OPTIONS = {
  "ON": true, 
  "OFF": false
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
    LocalSettings.save({[key]: value}).then(settings => this.setState({settings}))
  }

  render() {
    const { settings } = this.state
    if (!settings)
      return <div/>
    return (
      <div>
        <h3 className={styles.title}>{translate('settings')}</h3>
        <div className={styles.control}>
          <label>{translate("settingYoutubeOverlay")}</label>
          <Select name="videosOverlay" selected={settings.videosOverlay}
                  onChange={value => this.handleChange("videosOverlay", value)}
                  options={SELECT_OPTIONS}/>
        </div>
      </div>
    );
  }
}
