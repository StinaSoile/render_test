import { Person } from './Person'

export const Persons = ({ personsToShow, remove, personValuesToForm }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          remove={remove}
          personValuesToForm={personValuesToForm}
        />
      ))}
    </ul>
  )
}
