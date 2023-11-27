import React, { useState, useEffect } from 'react';
import './ViewStudents.css';
import NavBar from './components/NavBar';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  const baseUrl = 'http://localhost:80';

  useEffect(() => {
    fetchAllNutritionUsers();
  }, []);

  const fetchAllNutritionUsers = () => {
    fetch(baseUrl + "/nutrition-user")
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
            setStudents(data.data);
        } else {
          console.error('Data received does not contain an array:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const renderTableData = () => {
    return studnets.map((recipe, index) => {
      const { nutritionUserId, firstName, lastName, email, adminLevel } = studnets;
      return (
        <tr key={nutritionUserId}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{adminLevel}</td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    if (studnets.length === 0) {
      return null;
    }
    return (
      <tr>
        <th>First Name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Admin Level</th>
      </tr>
    );
  };

  return (
    <div className='allStudents-Container'>
      <NavBar />
      <div className='container'>
        <h1 id='title'>All Students </h1>
        <table id='students'>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
