import React from "react"
import padLeft from 'voca/pad_left'


function formatSeconds(total_seconds) {
  if (!total_seconds)
    return "0:00"
  const hours = Math.trunc(total_seconds / 3600)
  const minutes = Math.trunc((total_seconds / 60) % 60)
  const seconds = padLeft(total_seconds % 60, 2, '0')

  if (hours > 0)
    return `${hours}:${padLeft(minutes, 2, '0')}:${seconds}`
  return `${minutes}:${seconds}`
}

const TimeDisplay = ({ time, handleClick, textBefore="" }) => {
  const formattedTime = formatSeconds(time)
  const content = handleClick ?
    (<a onClick={() => handleClick(time)} style={{textDecoration: 'underline', cursor: 'pointer'}}>
      { formattedTime }
    </a>) :
    formattedTime
  return (
    <span>
      {textBefore}{content}
    </span>
  )
}

export default TimeDisplay