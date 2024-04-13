import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNmb, setNewNmb] = useState('')
  const [filterValue, setNewFilter] = useState('')
  const [notificationMessage, setNewMessage] = useState({
    msg: null,
    err: false,
  })
  // const [removablePerson, setNewRemovable] =useState('')

  useEffect(() => {
    personService.getAll().then((initData) => setPersons(initData))
  }, [])

  const isPerson = (props) => {
    return props.name === newName
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNmb,
    }

    if (persons.find(isPerson)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const origPerson = persons.find(isPerson)
        const newPerson = { ...personObject, id: origPerson.id }
        personService
          .change(newPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson)
            setPersons(
              persons.map((person) =>
                person === origPerson ? newPerson : person
              )
            )
            setNewMessage({
              msg: `Changed ${returnedPerson.name}'s number from ${origPerson.number} to ${newPerson.number}`,
              err: false,
            })
            setNewName('')
            setNewNmb('')
            return
          })
          .catch((error) => {
            setNewMessage({
              msg: `${newPerson.name} is already removed from server`,
              err: true,
            })
          })
      }
      return
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNmb('')
      setNewMessage({ msg: `Added ${returnedPerson.name}`, err: false })
    })
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNmbChange = (event) => {
    setNewNmb(event.target.value)
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  )

  const remove = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then((deletedPerson) => {
          // console.log(deletedPerson)
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
          setNewMessage({ msg: `${deletedPerson.name} removed`, err: false })
        })
        .catch((error) => {
          setNewMessage({
            msg: `${person.name} is already removed from server`,
            err: true,
          })
        })
    }
  }

  const personValuesToForm = (person) => {
    console.log(person)
    setNewName(person.name)
    setNewNmb(person.number)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        setNewMessage={setNewMessage}
      />
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNmb={newNmb}
        handleNameChange={handleNameChange}
        handleNmbChange={handleNmbChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        remove={remove}
        personValuesToForm={personValuesToForm}
      />
    </div>
  )
}

export default App
