export const Person = ({ person, remove, personValuesToForm }) => {
  return (
    <li>
      <span
        onClick={() => {
          personValuesToForm(person)
        }}
      >
        {person.name}
      </span>{' '}
      {person.number}
      <button
        onClick={() => {
          remove(person)
        }}
      >
        {'del'}
      </button>
    </li>
  )
}
