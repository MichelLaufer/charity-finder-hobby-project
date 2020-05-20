import React from 'react'


export const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <div className="filler" style={ {width: `${props.percentage}%`, maxWidth:`100%`}}></div>
    </div>
  )
}