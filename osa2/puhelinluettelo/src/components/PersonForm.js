import React from 'react'

const PersonForm = (props) => {
  const handleAdd = props.handleAdd
  const newName = props.newName
  const handlePersonChange = props.handlePersonChange
  const newNumber = props.newNumber
  const handleNumberChange = props.handleNumberChange
  
  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input value={newName} onChange={handlePersonChange}/>
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm