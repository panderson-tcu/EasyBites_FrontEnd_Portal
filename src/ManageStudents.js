import React, { useState } from 'react';
import './ManageStudents.css';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const ManageStudents = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:80/create-student-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        console.log('Student account created successfully!');
      } else {
        console.error('Failed to create student account');
      }
    } catch (error) {
      console.error('Error creating student account:', error);
    }
  };

  return (
    <div className='ManageStudents-Container'>
      <NavBar />
      <div className='conatiner'>
        <h1>Add Student Account</h1>
        <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className='button'>Add Student</button>
          <Link to="/ViewStudents" className='view-all-button'>View All Students</Link>
        </form>
      </div>
    </div>
  );
};

export default ManageStudents;
