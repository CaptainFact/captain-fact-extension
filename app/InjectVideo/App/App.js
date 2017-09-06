import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'

import Sidebar from '../Sidebar/Sidebar'
import { checkIfVideoExists } from '../Video/effects'

import styles from './App.css'


@connect(state => ({video: state.Video.data}))
export default class App extends React.Component {
  componentDidMount() {
    checkIfVideoExists(window.location.href)
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