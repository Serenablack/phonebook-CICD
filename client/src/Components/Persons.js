import persons from "../service/persons";
import axios from "axios";

const Persons = ({ person, delPerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => delPerson(person.id)}>delete</button>
    </div>
  );
};
export default Persons;
