import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { linkToVerificationsPage } from '../lib/cf_urls'
import BrowserIconBadgeCounter from '../lib/browser_icon_badge_counter'
import translate from '../lib/translate'
import ExternalLink from './ExternalLink'
import Message from './Message'

import styles from './VideosList.css'

const GET_FOUR_VIDEOS = gql`
  {
    videos(filters: { isFeatured: true }, limit: 8) {
      entries {
        hashId
        title
        thumbnail
      }
    }
  }
`

const AUTO_REFRESH_INTERVAL = 1000 * 60 * 30 // 30 minutes

export default class VideosList extends React.Component {
  componentDidMount() {
    // Reset unseen videos counter when videos list is displayed
    BrowserIconBadgeCounter.reset()
  }

  render() {
    return (
      <Query query={GET_FOUR_VIDEOS} pollInterval={AUTO_REFRESH_INTERVAL}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className={styles.videosList}>...</div>
          } else if (error) {
            console.error(error)
            return this.renderNoVideo()
          }

          const videos = data?.videos?.entries
          if (!videos || videos.length === 0) {
            return this.renderNoVideo()
          }

          return (
            <div className={styles.videosList}>
              {videos.map(({ title, hashId, thumbnail }) => (
                <div key={hashId} className={styles.videoCard}>
                  <ExternalLink href={linkToVerificationsPage(hashId)}>
                    <img src={thumbnail} alt="" />
                    <div className={styles.title}>{title}</div>
                  </ExternalLink>
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }

  renderNoVideo() {
    return (
      <div className={styles.videosList}>
        <Message type="info">
          {translate('noVideoAvailable')}&nbsp;
          <ExternalLink href="https://captainfact.io/videos/">
            CaptainFact.io
          </ExternalLink>
        </Message>
      </div>
    )
  }
}
