export const PersonForm = ({
  addPerson,
  newName,
  newNmb,
  handleNameChange,
  handleNmbChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNmb} onChange={handleNmbChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
