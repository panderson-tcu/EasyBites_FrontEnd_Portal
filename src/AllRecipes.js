import React, { useState, useEffect } from 'react';
import './AllRecipes.css';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import axios from './api/axios';


const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const URL = '/recipes';

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // const fetchAllRecipes = () => {
  //   fetch(URL)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data && Array.isArray(data.data)) {
  //         setRecipes(data.data);
  //       } else {
  //         console.error('Data received does not contain an array:', data);
  //       }
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // };

  const fetchAllRecipes = () => {
    axios.get(URL)
      .then(response => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setRecipes(data.data);
        } else {
          console.error('Data received does not contain an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const renderTableData = () => {
    return recipes.map((recipe, index) => {
      const { recipeId, title, status, recipeOwner } = recipe;
      return (
        <tr key={recipeId}>
          <td>
          <Link to={`/recipe/${recipe.recipeId}`}>{title}</Link>
          </td>
          <td>{recipe?.status}</td>
          <td>{recipeOwner?.email}</td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    if (recipes.length === 0) {
      return null;
    }
    return (
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Recipe Owner</th>
      </tr>
    );
  };

  return (
    <div className='AllRecipes-Container'>
      <NavBar />
      <div className='container'>
        <h1 id='title'>All Recipe Table</h1>
        <table id='recipes'>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecipes;
