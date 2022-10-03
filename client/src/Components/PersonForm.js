const PersonForm = ({
  onSubmit,
  newName,
  addPersonHandler,
  newNumber,
  newNumberHandler,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={addPersonHandler} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={newNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
