import React, { useState, useEffect } from 'react';
import './ViewStudents.css';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';
import {useAuth} from  './context/AuthProvider';
import {URL} from './index.js'

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const { auth } = useAuth()
  console.log("printing auth information")
  console.log(auth.user)
  console.log(auth.roles)
  console.log(auth.accessToken)

  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  useEffect(() => {
    fetchAllNutritionUsers();
  }, []);

  const fetchAllNutritionUsers = () => {
    fetch(`${URL}/nutrition-user`, config)
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
    return students.map((student) => {
      const { nutritionUserId, firstName, lastName, email, adminLevel } = student;
      return (
          <tr key={nutritionUserId}>
              <td>
              <Link to={`/student/${nutritionUserId}`}>{firstName}</Link>
              </td>
              <td>
              <Link to={`/student/${nutritionUserId}`}>{lastName}</Link></td>
              <td>
              <Link to={`/student/${nutritionUserId}`}>{email}</Link>
              </td>
              <td>
                <Link to={`/student/${nutritionUserId}`}>{adminLevel}</Link>
              </td>
          </tr>
      );
    });
  };

  const renderTableHeader = () => {
    if (students.length === 0) {
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
        <table className='studentTable' id='students'>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        <Link to="/ManageStudents" className='manage-button'>Add a Student</Link>
      </div>
    </div>
  );
};

export default ViewStudents;
