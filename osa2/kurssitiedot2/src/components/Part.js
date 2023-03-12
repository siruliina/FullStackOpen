import React from 'react'

const Part = (props) => {
  return (
    <div>
      <p>{props.partName} {props.exercises}</p>
    </div>
  )
}

export default Part