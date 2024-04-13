export const Filter = ({ filterValue, handleFilter }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
    </form>
  )
}
