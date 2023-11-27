import React, { useState, useEffect } from 'react';
import './UserRecipes.css';
import NavBar from './components/NavBar';

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('http://localhost:80/recipes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Data received is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className='UserRecipes-Container'>
      <NavBar />
      <div className='container'>
        <h1>Your Recipes</h1>
        <table>
          <thead>
            <tr>
              <th>Recipe Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.recipeId}>
                <td>{recipe.title}</td>
                <td>{recipe.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRecipes;
