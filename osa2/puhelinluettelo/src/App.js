import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleAdd = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
        ...found,
        number: newNumber
        }
        personService
          .update(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(currentPerson => currentPerson.id !== person.id))
        })
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm 
        handleAdd={handleAdd} 
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchInput={searchInput} removePerson={removePerson}/>
      
    </div>
  )

}

export default App