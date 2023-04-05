import React from 'react'

import styles from './Message.css'

const Message = ({ type, children }) => (
  <div className={styles.message} data-type={type}>
    <div className={styles.body}>{children}</div>
  </div>
)

export default Message
