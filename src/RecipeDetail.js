import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetail.css'
import NavBar from './components/NavBar';
import {useAuth} from  './context/AuthProvider';
import axios from './api/axios';
import {URL} from './index.js';


const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    cooktime: '',
    ingredientsQuantity: '',
    estimatedCost: '',
    instructions: '',
    servings: '',
    protein: {},
    ingredients: [],
    appliances: [],
    allergens: [],
  });

  const { auth } = useAuth()
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

  const isAdmin = auth && auth.roles === 'admin';
  const isRecipeOwner = auth && auth.id === recipe?.recipeOwner?.nutritionUserId;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      axios.get(`${URL}/recipes/${recipeId}`, config)
        .then(response => {
          const recipeData = response.data;
          if(response.status===200){
            setRecipe(recipeData.data)
          } else {
            console.error('Failed to fetch recipe details:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error fetching recipe details:', error);
        })
    };

    fetchRecipeDetails();
  }, [recipeId]);


  const statusApprove = async () => {
    try {
      const response = await fetch(`${URL}/recipes/approved/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ status: 'approved' }),
      });
  
      if (response.ok) {
        console.log('Recipe status updated to Approved');
        setTimeout(async () => {
          try {
            const updatedResponse = await fetch(`${URL}/recipes/${recipeId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${auth.accessToken}`
              }
            });
            if (updatedResponse.ok) {
              const updatedRecipe = await updatedResponse.json();
              setRecipe(updatedRecipe.data);
            } else {
              console.error('Failed to fetch updated recipe details');
            }
          } catch (error) {
            console.error('Error fetching updated recipe details:', error);
          }
        }, 100); // 100 milliseconds = .1 seconds
      } else {
        console.error('Failed to update recipe status');
      }
    } catch (error) {
      console.error('Error updating recipe status:', error);
    }
  };
  
  const statusDecline = async () => {
    try {
      const response = await fetch(`${URL}/recipes/declined/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ status: 'declined' }),
      });
  
      if (response.ok) {
        console.log('Recipe status updated to Declined');
        setTimeout(async () => {
          try {
            const updatedResponse = await fetch(`${URL}/recipes/${recipeId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${auth.accessToken}`
              }
            });
            if (updatedResponse.ok) {
              const updatedRecipe = await updatedResponse.json();
              setRecipe(updatedRecipe.data);
            } else {
              console.error('Failed to fetch updated recipe details');
            }
          } catch (error) {
            console.error('Error fetching updated recipe details:', error);
          }
        }, 100); // 100 milliseconds = .1 seconds
      } else {
        console.error('Failed to update recipe status');
      }
    } catch (error) {
      console.error('Error updating recipe status:', error);
    }
  };
  
  return (
    <div className='recipe-container'>
      <NavBar />
      <div className='container'>
      <h1>Recipe Details of {recipe.title}</h1>
        <p className='info-header'>Title: </p> <p className='info-details'> {recipe.title}</p>
        <p className='info-header'>Allergens: </p> <p className='info-details'> {recipe.allergens?.map(allergens => allergens.name).join(', ')}</p>
        <p className='info-header'>Protein: </p> <p className='info-details'> {recipe.protein?.proteinName}</p>
        <p className='info-header'>Cook Time: </p> <p className='info-details'> {recipe.cooktime} minutes</p>
        <p className='info-header'>Ingredients: </p> <p className='info-details'>
        {recipe.ingredientsQuantity.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
        <p className='info-header'>Estimated Cost: </p> <p className='info-details'>${recipe.estimatedCost}</p>
        <p className='info-header'>Appliance: </p> <p className='info-details'> {recipe.appliances?.map(appliances => appliances.name).join(', ')}</p>
        <p className='info-header'>Instructions: </p> <p className='info-details'>
        {recipe.instructions.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
        <p className='info-header'>Servings: </p> <p className='info-details'> {recipe.servings}</p>
        <p className='info-header'> Status: </p> <p className='info-details'> {recipe.status}</p>

        {(isRecipeOwner || isAdmin) && (
          <Link to={`/recipe/${recipeId}/edit`} className='edit'>Edit Recipe</Link>
        )}
       
       {isAdmin && (
          <label className='change'>Change Status:</label>
        )}
        {isAdmin && (
          <div className="button-container">
            <button onClick={statusApprove} className='approved'>Approve</button> 
            <button onClick={statusDecline} className='declined'>Decline</button>
          </div>
        )}
    </div>
 </div>
  );
};

export default RecipeDetails;