import React from "react"
import { container } from './UserAppellation.css'
import { CF_FRONT_URL } from '../../Common/lib/constants'


const UserAppellation = ({user: {username, name}}) => {
  const prettyUsername = ` @${username}`
  return (
    <a href={`${CF_FRONT_URL}/u/${username}`} className={container}>
      <strong>{ name || prettyUsername }</strong>
      {name &&
      <small>
         { prettyUsername }
      </small>
      }
    </a>
  )
}

export default UserAppellation