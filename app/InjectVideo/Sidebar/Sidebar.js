import React, { Component } from 'react'
import { Actions } from 'jumpstate'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { fetchStatements } from '../Statement/effects'
import Statement from '../Statement/Statement.js'
import FactsContainer from '../Fact/FactsContainer.js'
import { icon } from "../Utils/Icon.css"
import { InterfaceState } from '../App/interface_reducer'
import { CF_FRONT_URL, STATEMENT_FOCUS_TIME } from '../../Common/lib/constants'

import {
  sidebar, sidebarHeader, title, sidebarContent, jumpLink, actionsLinks, disabled , collapsed,
  slideIn, slideOut, statementsList
} from './Sidebar.css'
import { PlaybackState } from '../App/playback_reducer'
import LocalImage from '../Utils/LocalImage'


@connect(state => ({
  statements: state.Statements.data,
  isLoading: state.Statements.isLoading,
  isCollapsed: state.Interface.sidebarCollapsed,
  videoId: state.Video.data.id
}))
export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: null,
      currentView: "facts"
    }
    this.player = null
    this.collapseAnimation = null
    this.handleTimeClick = this.handleTimeClick.bind(this)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (this.props.isCollapsed && !nextProps.isCollapsed)
      this.collapseAnimation = slideIn
    else if (!this.props.isCollapsed && nextProps.isCollapsed)
      this.collapseAnimation = slideOut
    else
      this.collapseAnimation = null
  }

  componentDidMount() {
    fetchStatements(this.props.video.id)

    // TODO: Move to redux Plug onto youtube player
    this.player = document.getElementsByClassName('video-stream')[0]
    this.player.addEventListener('timeupdate', this.onTimeUpdate)
  }

  componentWillUnmount() {
    // TODO move to effect
    if (this.player)
      this.player.removeEventListener('timeupdate', this.onTimeUpdate)
  }

  onTimeUpdate() {
    // TODO move to effect
    const currentTime = Math.trunc(this.player.currentTime)
    if (this.state.currentTime !== currentTime) {
      this.setState({ currentTime: currentTime + 1 })
      PlaybackState.setPosition(currentTime + 1)
    }
  }

  getFocusedStatementIndex() {
    // TODO Move to redux selector
    const { currentTime } = this.state
    if (currentTime === null)
      return -1
    return this.props.statements.findLastIndex(st =>
      currentTime >= st.time && currentTime <= st.time + STATEMENT_FOCUS_TIME
    )
  }

  handleTimeClick(time) {
    // TODO move to effect
    this.player.currentTime = time
  }

  renderStatementJumpLink(jumpType, statement, textBefore='', textAfter='') {
    return (
      <a className={classnames(jumpLink, {[disabled]: !statement})}
         onClick={() => statement ? this.handleTimeClick(statement.time) : true}>
        {textBefore}{jumpType} {textAfter}
      </a>
    )
  }

  toggleView() {
    this.setState({currentView: (this.state.currentView === "facts" ? "statements" : "facts")})
  }

  renderStatementNavigateLinks(currentStatementIdx) {
    const { currentTime } = this.state
    const { statements } = this.props
    const prevStatement = statements.findLast((s, idx) => s.time < currentTime && idx !== currentStatementIdx)
    const nextStatement = statements.find((s, idx) => s.time > currentTime && idx !== currentStatementIdx)
    return (
      <div className={actionsLinks}>
        {this.renderStatementJumpLink('Previous', prevStatement, '⏮️ ')}
        {statements.size > 1 &&
          <a className={jumpLink} onClick={this.toggleView.bind(this)}>
            Show {this.state.currentView === "facts" ? "Statements" : "Facts"}
          </a>
        }
        {this.renderStatementJumpLink('Next', nextStatement, '', ' ⏭️')}
      </div>
    )
  }

  render() {
    const currentStatementIdx = this.getFocusedStatementIndex()
    const currentStatement = currentStatementIdx === -1 ? null : this.props.statements.get(currentStatementIdx)
    return (
      <div className={classnames(sidebar, this.collapseAnimation, {[collapsed]: this.props.isCollapsed})}>
        <div className={sidebarHeader}>
          <a href={`${CF_FRONT_URL}/videos/${this.props.videoId}`} target="_BLANK"
             title="Open discussion on CaptainFact">
            <h1 className={title}>CaptainFact</h1>&nbsp;
            <LocalImage src="new_tab.png" height="17"/>
          </a>
          <a title="Close sidebar" style={{float: 'right', cursor: 'pointer'}} onClick={InterfaceState.closeSidebar}>
            ❌
          </a>
        </div>
        {this.renderStatementNavigateLinks(currentStatementIdx)}
        <div className={sidebarContent}>
          {this.state.currentView === "facts" && currentStatementIdx !== -1 &&
            <div>
              <Statement statement={currentStatement} isFocused={true}
                         onTimeClick={this.handleTimeClick}/>
              <FactsContainer comments={currentStatement.comments}/>
            </div>
          }
          {this.state.currentView === "statements" &&
            <div className={statementsList}>
              {this.props.statements.map(s =>
                <Statement  key={s.id} statement={s} onTimeClick={this.handleTimeClick}
                            textPrefix={s === currentStatement ? '➡️ ' : ''}/>
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}
