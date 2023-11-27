// import React from 'react';
import './AllRecipes.css';
import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';


const AllRecipes = () => {

    const [recipes, setRecipes] = useState([]);

    var baseUrl = 'http://localhost:80'

    useEffect(() => {
      fetchAllRecipes();
    }, []);
  
    const fetchAllRecipes = () => {
      fetch(baseUrl + "/recipes")
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
    <div className='AllRecipes-Container'>
        <NavBar />
        <div className='container'>
        <h1>All Recipes</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Creator Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.recipeId}>
              <td>{recipe.title}</td>
              {/* <td>{recipe.creatorName}</td> */}
              <td>{recipe.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
        </div>
    </div>
    )
    
}

export default AllRecipes;