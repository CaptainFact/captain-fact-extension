import React from 'react';

import Select from './Select.js'
import styles from './Settings.css'
import LocalSettings from '../../Common/lib/localSettings.js'


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
        <div className={styles.control}>
          <label>📺 Videos Overlay</label>
          <Select name="videosOverlay" selected={settings.videosOverlay}
                  onChange={value => this.handleChange("videosOverlay", value)}
                  options={{"On": true, "Off": false}}/>
        </div>
      </div>
    );
  }
}
