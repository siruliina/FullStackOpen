import React from 'react'

const Total = ({parts}) => {

  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )

  return (
    <b>Total of {total} exercises</b>
  )
}

export default Total