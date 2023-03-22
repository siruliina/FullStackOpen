import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null)

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
            setMessage(`The number of ${newName} has been updated`)
            setMessageType('success')
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setMessageType('fail')
          })
        
        setTimeout(() => {setMessage(null)}, 5000)
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
      setMessage(`${newName} has been added`)
      setMessageType('success')
      setTimeout(() => {setMessage(null)}, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(currentPerson => currentPerson.id !== person.id))
        })
      setMessage(`${person.name} has been deleted`)
      setMessageType('success')
      setTimeout(() => {setMessage(null)}, 5000)
    }
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

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => setPersons(response.data))
  }, [])
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
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