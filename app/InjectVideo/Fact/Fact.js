import React from 'react'
import Source from './Source.js'
import UserAppellation from './UserAppellation'
import { approvingFact, refutingFact, regularFact, userSection, scoreTag, sourceSection } from './Fact.css'


export default class Fact extends React.PureComponent {
  render() {
    const { approve, text, source, user, score } = this.props.comment
    const factType = approve === true ? approvingFact : approve === false ? refutingFact : regularFact
    return (
      <div className={factType}>
        <div className={sourceSection}>
          <span className={scoreTag}>
            👍 {score}
          </span>
          <Source source={source}/>
        </div>
        {text !== null && text.length > 0 &&
          <div className={userSection}>
            <span>{text}</span>
            <span> (By <UserAppellation user={user}/>)</span>
          </div>
        }
      </div>
    )
  }
}