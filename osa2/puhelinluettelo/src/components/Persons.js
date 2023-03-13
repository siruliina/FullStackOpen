import React from 'react'
import Person from './Person';

const Persons = ({persons, searchInput}) => {
  return (
    <div>
      {
        persons.filter(person => {
          if (searchInput === '') {
            return person;
          } else if (person.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return person;
          }
        }).map(person => {
            return <Person key={person.name} person={person}/>
        })
      }
    </div>
  )
}

export default Persons