import React from 'react'
import Source from './Source.js'
import UserAppellation from './UserAppellation'
import { fact, approvingFact, refutingFact, regularFact, userSection, right, scoreTag, sourceSection, userCommentText } from './Fact.css'
import { staticResource } from '../../Common/lib/static_resource'
import LocalImage from '../Utils/LocalImage'


const getUserPicture = (userId, url, url_mini, size) => {
  if (!url || !url_mini)
    return `https://api.adorable.io/avatars/${size}/${userId}.png`
  return size <= 48 ? staticResource(url_mini) : staticResource(url)
}

export default class Fact extends React.PureComponent {
  render() {
    const { approve, text, source, user, score } = this.props.comment
    const factType = approve === true ? approvingFact : approve === false ? refutingFact : regularFact
    return (
      <div className={`${fact} ${factType}`}>
        <div className={sourceSection}>
          <span className={scoreTag}>
            {score} <LocalImage src="star.png" height="10"/>
          </span>
          <Source source={source}/>
        </div>
        {text !== null && text.length > 0 &&
          <div className={userSection}>
            <img src={getUserPicture(user.id, user.picture_url, user.mini_picture_url, 32)} height="28"/>
            <div className={right}>
              <UserAppellation user={user}/>&nbsp;
              <span className={userCommentText}>{text}</span>
            </div>
          </div>
        }
      </div>
    )
  }
}

