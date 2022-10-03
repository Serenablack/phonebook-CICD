import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
// import axios from "axios";
import phonebookService from "./service/persons.js";
import Notification from "./Components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNum] = useState("");
  const [Namefilter, setNamefilter] = useState("");
  const [alertMessage, setNotification] = useState(null);
  const [alertStat, setStat] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const addPerson = (event) => {
    setNewName(event.target.value);
    persons.forEach((NameObj) => {
      if (NameObj.name.toLowerCase() === event.target.value.toLowerCase()) {
        const confirm = window.confirm(
          `${newName} has already been entered.Do you want to replace it?`
        );
        if (confirm) {
          setNewName(NameObj.name);
        } else setNewName("");
      }
    });
  };

  const addName = (event) => {
    event.preventDefault();
    const persontoUpdate = persons.filter((person) => person.name === newName);

    if (persontoUpdate.length !== 0) {
      phonebookService
        .update(persontoUpdate[0].id, {
          ...persontoUpdate[0],
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPersons(
            persons.map((x) =>
              x.id === returnedPerson.id ? returnedPerson : x
            )
          );
          setNotification(`${newName}'s number has been updated successfully!`);
          setStat("success");
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch(() => {
          setNotification(
            `${persontoUpdate[0].name} has been deleted already!`
          );
          setStat("error");
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        });
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      phonebookService.create(personObj).then((returnedPersons) => {
        console.log(returnedPersons);
        setPersons([...persons, returnedPersons]);
        setNewName("");
        setNewNum("");
        setNotification(`${newName} has been added successfully!`);
        setStat("success");
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      });
    }
  };

  const addNum = (event) => {
    setNewNum(event.target.value);
  };

  const delPerson = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);

    if (window.confirm(`Do you want to delete ${filteredPerson[0].name}?`)) {
      phonebookService.del(filteredPerson[0].id).catch(() => {
        setNotification(`${filteredPerson[0].name} has been deleted already!`);
        setStat("error");
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      });
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const persFiltered =
    Namefilter === ""
      ? persons
      : persons.filter((NameObj) =>
          NameObj.name.toLowerCase().includes(Namefilter.toLowerCase())
        );

  const namefilter = (event) => {
    setNamefilter(event.target.value);
    // let searchResult = () =>
    //   persons.filter((person) => {
    //     person.name.includes(event.target.value);
    //   });
    // console.log(searchResult());
    // setPersons(searchResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification alert={alertMessage} stat={alertStat} />
      <Filter Namefilter={Namefilter} namefilter={namefilter} />

      <h3>Add contact</h3>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        addPersonHandler={addPerson}
        newNumber={newNumber}
        newNumberHandler={addNum}
      />

      <h2>Numbers</h2>

      {persFiltered.map((perso) => {
        return <Persons key={perso.id} person={perso} delPerson={delPerson} />;
      })}
    </div>
  );
};

export default App;
