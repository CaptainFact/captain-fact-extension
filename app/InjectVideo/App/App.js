import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'

import Sidebar from '../Sidebar/Sidebar'
import { fetchVideo } from '../Video/effects'

import styles from './App.css'


@connect(state => ({video: state.Video.data}))
export default class App extends React.Component {
  componentDidMount() {
    fetchVideo(this.props.videoUrl)
  }

  render() {
    if (!this.props.video)
      return <div style={{display: "none"}}/>
    else
      return (
        <div className={styles.app}>
          <Sidebar video={this.props.video}/>
        </div>
      )
  }
}