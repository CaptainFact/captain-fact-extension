import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTv } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Settings from './Settings'

import styles from './Popup.css'
import tabsStyles from './Tabs.css'
import translate from '../lib/translate'
import VideosList from './VideosList'
import ExternalLink from './ExternalLink'
import { BrowserExtension } from '../lib/browser-extension'

export default class Popup extends React.Component {
  render() {
    return (
      <div className={styles.popup}>
        <ExternalLink
          href="https://captainfact.io/videos"
          className={styles.bannerLink}
        >
          <img
            src={BrowserExtension.runtime.getURL('img/banner.jpg')}
            className={styles.banner}
            alt="CaptainFact"
          />
        </ExternalLink>
        <Tabs
          defaultIndex={0}
          selectedTabClassName={tabsStyles.isActive}
          selectedTabPanelClassName={tabsStyles.panelActive}
        >
          <TabList className={tabsStyles.tabsList}>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faTv} />
                <span>{translate('videos')}</span>
              </a>
            </Tab>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faCog} />
                <span>{translate('settings')}</span>
              </a>
            </Tab>
          </TabList>
          <TabPanel>
            <VideosList />
          </TabPanel>
          <TabPanel>
            <div className={styles.content}>
              <Settings />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}
