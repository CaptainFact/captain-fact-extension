import React from 'react'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import { linkToVerificationsPage } from '../lib/cf_urls'
import ExternalLink from './ExternalLink'
import Message from './Message'

import styles from './VideosList.css'


export default class VideosList extends React.Component {
  render() {
    return (
      <Query
        query={gql`{
          allVideos(limit: 4) {
            hashId
            title
            provider
            providerId
          }
        }`}
      >
        {({ loading, error, data}) => {
          if (loading) {
            return <div className={styles.videosList}>...</div>
          } else if (error) {
            console.error(error)
            return this.renderNoVideo()
          }

          if (data.allVideos.length === 0) {
            return this.renderNoVideo()
          }

          return (
            <div className={styles.videosList}>
              {data.allVideos.map(({title, hashId, provider, providerId}) => (
                <div key={hashId} className={styles.videoCard}>
                  <ExternalLink href={linkToVerificationsPage(hashId)}>
                    <img src={this.videoThumb(provider, providerId)} alt=""/>
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
    // TODO Translate this
    return (
      <div className={styles.videosList}>
        <Message type="info">
          Il n'y a aucune vidéo par ici. Essayez de jeter un coup d'oeuil sur
          le site : <ExternalLink href="https://captainfact.io/videos/">CaptainFact.io</ExternalLink>
        </Message>
      </div>
    )
  }

  // TODO Replace this function by a GraphQL API field
  videoThumb(provider, provider_id) {
    if (provider === 'youtube') {
      return `https://img.youtube.com/vi/${provider_id}/mqdefault.jpg`
    }
    return ''
  }
}
