import './App.css';
import React, { useState } from 'react';
import Axios from 'axios'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeelist, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);


  const addEmployee = () => {

    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log("success");
      // setEmployeeList([...employeelist,{
      //     name: name,
      //     age: age,   
      //     country: country,
      //     position: position,
      //     wage: wage
      //   },
      // ]); //This wont work bcz Id is not unique
     // if(employeelist.length !== 0)
        getEmployees(); // so i call getEmployees() to get all the employees
    });
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      //console.log(response.data);
      console.log("Successlly got");
      setEmployeeList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeelist.filter((val) => {
        return val.id !== id;
      }));
      altert("Employee Deleted");
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', { wage: newWage, id: id }).then((response) => {
      setEmployeeList(employeelist.map((val) => {
        return val.id === id ? {
          id: val.id,
          name: val.name,
          country: val.country,
          age: val.age,
          position: val.position, 
          wage: newWage
        } : val;
      }))
    });
  };
       


  return (
    <div className="App" >
      <div className="information">

        <label>Name</label>
        <input type="text" onChange={(event) => {
          setName(event.target.value);
        }} />

        <label>Age</label>
        <input type="number" onChange={(event) => {
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
        <input type="number" onChange={(event) => {
          setWage(event.target.value);
        }} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>


      <div className='employees'>
        <button onClick={getEmployees}>Show Employees</button>
        {employeelist.map((val) => {
          return <div className='employee' key={val.id}>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>

            <div>

              <input type="text" placeholder='Change Wage' style={{ height: 30, width: 120, marginLeft: 10, }} 
              onChange={(event) => {
                setNewWage(event.target.value);
              }}></input>

              <button style={{height: 30, width: 100, marginLeft: 10,backgroundColor: '#4c7daf'}}
                onClick={() => { updateEmployeeWage(val.id) }}>Update</button>

              <button style={{height: 30, width: 100, marginLeft: 10,backgroundColor: 'rgb(209 30 30)'}}
                onClick={() => { deleteEmployee(val.id) }}>Delete</button>

            </div>

          </div>
        })};


      </div>
    </div>

  );
}

export default App;
