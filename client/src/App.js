import './App.css';
import React, { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);


  return (
    <div className="App" >
      <div className="information">

        <label>Name</label>
        <input type="text" onChange={(event) => {
          setName(event.target.value);
        }} />

        <label>Age</label>
        <input type="text" onChange={(event) => {
          setAge(event.target.value);
        }} />

        <label>Position</label>
        <input type="text" onChange={(event) => {
          setPosition(event.target.value);
        }} />

        <label>Country</label>
        <input type="text" onChange={(event) => {
          setCountry(event.target.value);
        }} />

        <label>Wage</label>
        <input type="text" onChange={(event) => {
          setWage(event.target.value);
        }} />
        <button>Add Employee</button>
      </div>

    </div>
  );
}

export default App;
