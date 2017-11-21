import React from 'react';

import Settings from './Settings'
import styles from './Popup.css'
import { CF_FRONT_URL } from '../../Common/lib/constants'


export default class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: null}
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, arrayOfTabs => {
      this.setState({url: arrayOfTabs[0].url})
    })
  }

  render() {
    return (
      <div className={styles.popup}>
        {this.renderActions()}
        <Settings/>
      </div>
    );
  }

  renderActions() {
    const { url } = this.state
    if (!url || !url.match(/^(http:\/\/|https:\/\/)?(www\.)?youtube\.com\/watch\?*/))
      return null

    const cfUrl = `${CF_FRONT_URL}/videos/add/${encodeURIComponent(url)}`
    return (
      <div>
        <a target="_BLANK" href={cfUrl}>Open this video on CaptainFact</a>
        <hr/>
      </div>
    )
  }
}
