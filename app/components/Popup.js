import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTv } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Settings from './Settings'

import styles from './Popup.css'
import tabsStyles from './Tabs.css'
import translate from '../lib/translate'
import { linkToAddVideo } from '../lib/cf_urls'
import VideosList from './VideosList';
import ExternalLink from './ExternalLink'



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
        <img src={chrome.runtime.getURL('img/banner.jpg')} className={styles.banner} alt=""/> 
        {this.renderActions()}
        <Tabs 
          defaultIndex={0}
          selectedTabClassName={tabsStyles.isActive}
          selectedTabPanelClassName={tabsStyles.panelActive}
        >
          <TabList className={tabsStyles.tabsList}>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faTv}/>
                <span>{translate('videos')}</span>
              </a>
            </Tab>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faCog}/>
                <span>{translate('settings')}</span>
              </a>
            </Tab>
          </TabList>
          <TabPanel>
            <VideosList/>
          </TabPanel>
          <TabPanel>
            <div className={styles.content}>
              <Settings/>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  renderActions() {
    const { url } = this.state
    if (!url || !url.match(/^(http:\/\/|https:\/\/)?(www\.)?youtube\.com\/watch\?*/))
      return null

    return (
      <div className={styles.actionsBlockContainer}>
        <ExternalLink
          className={styles.actionsBlock}
          href={linkToAddVideo(url)}
        >
          <img src={chrome.runtime.getURL('img/new_tab.png')} alt=""/>
          {translate('openOnCF')}
        </ExternalLink>
      </div>
    )
  }
}
