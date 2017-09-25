import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { cfbutton, pulse } from './CFButton.css'
import { InterfaceState } from '../App/interface_reducer'
import { getFocusedStatement } from '../Statement/selectors'


const icons = {
  neutral: chrome.runtime.getURL('img/icon.png'),
  confirm: chrome.runtime.getURL('img/icon_confirm.png'),
  refute: chrome.runtime.getURL('img/icon_refute.png')
}

@connect(state => ({
  statements: state.Statements.data,
  displayed: state.Interface.sidebarCollapsed,
  video: state.Video.data,
  statement: getFocusedStatement(state)
}))
export default class CFButton extends React.Component {
  getIcon() {
    if (!this.props.statement)
      return icons.neutral

    const globalScore = this.props.statement.comments.reduce((score, comment) =>
      score + (comment.approve ? comment.score : -comment.score)
    , 0)
    if (globalScore > 0)
      return icons.confirm
    else if (globalScore < 0)
      return icons.refute
    else
      return icons.neutral
  }

  render() {
    if (!this.props.video || this.props.statements.size === 0)
      return null
    return (
      <img src={this.getIcon()}
        className={classnames(cfbutton, {[pulse]: !!this.props.statement})}
        title="CaptainFact"
        onClick={InterfaceState.openSidebar}
        style={{
          display: this.props.displayed ? "block" : "none"
        }}
      />
    )
  }
}