import React from 'react'

import { linkToVerificationsPage } from '../lib/cf_urls'
import ExternalLink from './ExternalLink'

import styles from './VideosList.css'


export default class VideosList extends React.Component {
  componentDidMount() {

  }

  render() {
    const videos = [
      {
        "title": "Est-ce une bonne chose de rendre les transports gratuits ?",
        "providerId": "BamnWylJnVg",
        "provider": "youtube",
        "hashId": "gmXa"
      },
      {
        "title": "Macron, un an après : le grand entretien en intégralité",
        "providerId": "mt0as7x-kfs",
        "provider": "youtube",
        "hashId": "grn7"
      },
      {
        "title": "Le replay du grand débat de la présidentielle",
        "providerId": "OhWRT3PhMJs",
        "provider": "youtube",
        "hashId": "GBjk"
      },
      {
        "title": "Survivre au système éducatif, Hackers et Crapauds fous [EN DIRECT]",
        "providerId": "Gun2ez6kzIk",
        "provider": "youtube",
        "hashId": "gLxg"
      },
    ]

    return (
      <div className={styles.videosList}>
        {videos.map(({title, hashId, provider, providerId}) => (
          <div key={hashId} className={styles.videoCard}>
            <ExternalLink href={linkToVerificationsPage(hashId)}>
              <img src={this.videoThumb(provider, providerId)} alt=""/>
              <div className={styles.title}>{title}</div>
            </ExternalLink>
          </div>
        ))}
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
