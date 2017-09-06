import React from "react"
import { mainAppellation, secondaryAppellation, container } from './UserAppellation.css'
import { CF_FRONT_URL } from '../../Common/lib/constants'


const UserAppellation = ({user: {username, name}}) => {
  const prettyUsername = ` @${username}`
  return (
    <a href={`${CF_FRONT_URL}/u/${username}`} className={container}>
      <strong className={mainAppellation}>{ name || prettyUsername }</strong>
      {name &&
      <small className={secondaryAppellation}>
         { prettyUsername }
      </small>
      }
    </a>
  )
}

export default UserAppellation