import React from 'react'

const LocalImage = ({src, ...props}) =>
  <img src={chrome.runtime.getURL(`img/${src}`)} {...props}/>

export default LocalImage