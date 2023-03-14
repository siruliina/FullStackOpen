import React from 'react'
import Person from './Person';

const Persons = ({persons, searchInput, removePerson}) => {

  return (
    <div>
      {
        persons.filter(person => {
          if (searchInput === '') {
            return person;
          } else if (person.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return person;
          }
        }).map((person, index) => {
            return <div key={person.name}><Person person={person}/><button onClick={() => removePerson(person)}>delete</button></div>
        })
      }
    </div>
  )
}

export default Persons