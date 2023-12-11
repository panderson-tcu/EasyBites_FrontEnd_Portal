import React, { useState, useEffect } from 'react';
import './UserRecipes.css';
import { useParams, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import axios from './api/axios';
import {AuthContext, useAuth} from  './context/AuthProvider';


const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const{nutritionUserId} = useParams();
  const [userName, setUserName] = useState([])

  const URL = '/recipes';

  const { auth, setAuth } = useAuth()
  console.log("printing auth information")
  console.log(auth.user)
  console.log(auth.roles)
  console.log(auth.accessToken)
  console.log(auth.id)


  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  useEffect(() => {
    fetchAllRecipes();
    fetchNutritionUser();
  }, []);

  const fetchAllRecipes = () => {
    axios.get(URL+'/nutrition-user/'+nutritionUserId, config)
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

  const fetchNutritionUser = () => {
    axios.get('/nutrition-user/'+nutritionUserId, config)
        .then(response => {
            const data = response.data.data;
            if(response.status==200){
                setUserName(data.firstName + ' ' + data.lastName)
              }
            else {
            console.error('Data received does not contain an array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

  }

  const renderTableData = () => {
    return recipes.map((recipe, index) => {
      const { recipeId, title, status } = recipe;
      return (
        <tr key={recipeId}>
          <td>
          <Link to={`/recipe/${recipe.recipeId}`}>{title}</Link>
          </td>
          <td>{recipe?.status}</td>
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
      </tr>
    );
  };

  return (
    <div className='user-container'>
      <NavBar />
      <div className='container'>
        <h1 id='title'>{userName}'s User Information</h1>
        <table id='recipes'>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecipes;
