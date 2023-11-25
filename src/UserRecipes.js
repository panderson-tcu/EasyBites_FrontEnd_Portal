// import React from 'react';
import './UserRecipes.css';
import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUserRecipes/username');
        if (response.ok) {
          const data = await response.json();
          setUserRecipes(data);
        } else {
          console.error('Failed to fetch user recipes:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    fetchUserRecipes();
  }, []); 

  return (
    <div className='UserRecipes-Container'>
        <NavBar />
      <h1 className='page-title'>Your Submitted Recipes</h1>
      <ul>
        {userRecipes.map((recipe) => (
          <li key={recipe._id}>{recipe.recipeName}</li>
          // Display other recipe details as needed
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
