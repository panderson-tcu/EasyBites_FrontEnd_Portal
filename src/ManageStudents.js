import React, { useState } from 'react';
import './ManageStudents.css';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {AuthContext, useAuth} from  './context/AuthProvider';
import axios from './api/axios';

const ManageStudents = () => {
  const [userData, setUserData] = useState({
    nutritionUserId: '',
    firstName: '',
    lastName: '',
    adminLevel: '',
    email: '',
    password: '',
      });
      const { auth, setAuth } = useAuth()


      const [submitted, setSubmitted] = useState(false);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:80/nutrition-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.accessToken}`,

            },
            body: JSON.stringify(handleSendData(userData)),
            
          });
    
          if (response.ok) {
            console.log('Student submitted successfully!');
            setSubmitted(true); // Set submitted to true to display the success banner
            setUserData({ // Reset the form after submission
              nutritionUserId: '',
              firstName: '',
              lastName: '',
              adminLevel: '',
              email: '',
              password: '',
            });
            setTimeout(() => {
                setSubmitted(false);
              }, 3000);
        } else {
            console.error(
              'Failed to submit student:',
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error('Error submitting student:', error);
        }
      };

      const handleSendData = (userData) => {
        // Format the data before sending
        const formattedData = {
          nutritionUserId: userData.nutritionUserId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          adminLevel: userData.adminLevel,
          email: userData.email,
          password: userData.password,
        };
    
        // Now, send the formattedData to the server
        // Your API call or fetch code goes here
        console.log(formattedData); // For testing
        return formattedData;
      };

    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      return (
      <div className='ManageStudents-Container'>
        <NavBar />
      <div className='conatiner'>
        <h1>Add Student Account</h1>
        <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
            <label htmlFor="nutritionUserId">TCU Student ID:</label>
            <input
              type="text"
              name="nutritionUserId"
              value={userData.nutritionUserId}
              onChange={handleChange}
            />
          </div>
        <div className='form-group'>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <label> Admin Level: <br />
                    <select name='adminLevel'
                    value={userData.adminLevel}
                    onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className='button'>Add Student</button>
          {submitted && (
          <div className='success-banner'>Student submitted successfully!</div>
        )}   
          <Link to="/ViewStudents" className='view-all-button'>View All Students</Link>
        </form>
        
      </div>
    </div>
    )
    
}

export default ManageStudents;