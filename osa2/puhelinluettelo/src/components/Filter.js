import React from 'react'

const Filter = ({searchInput, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input type='search' value={searchInput} onChange={handleSearchChange}/>
    </div>
  )
}

export default Filter