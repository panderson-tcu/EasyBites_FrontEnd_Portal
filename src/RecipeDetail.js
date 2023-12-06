import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetail.css'
import NavBar from './components/NavBar';
import {AuthContext, useAuth} from  './context/AuthProvider';
import axios from './api/axios';


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

  const { auth, setAuth } = useAuth()
  console.log("printing auth information")
  console.log(auth.user)
  console.log(auth.pwd)
  console.log(auth.roles)
  console.log(auth.accessToken)
  console.log(auth.id)


  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  const isAdmin = auth && auth.roles === 'admin';
  const isRecipeOwner = auth && auth.id == recipe?.recipeOwner?.nutritionUserId;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      axios.get(`http://localhost:80/recipes/${recipeId}`, config)
        .then(response => {
          const recipeData = response.data;
          if(response.status==200){
            setRecipe(recipeData.data)
          } else {
            console.error('Failed to fetch recipe details:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error fetching recipe details:', error);
        })
    // const fetchRecipeDetails = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:80/recipes/${recipeId}`);
    //     if (response.ok) {
    //       const recipeData = await response.json();
    //       setRecipe(recipeData.data);
    //     } else {
    //       console.error('Failed to fetch recipe details');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching recipe details:', error);
    //   }
    };

    fetchRecipeDetails();
  }, [recipeId]);


  // const handleEditClick = () => {
  //   console.log('Edit button clicked');
  // };


  const statusApprove = async () => {
    try {
      const response = await fetch(`http://localhost:80/recipes/approved/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
  
      if (response.ok) {
        console.log('Recipe status updated to Approved');
        setTimeout(async () => {
          try {
            const updatedResponse = await fetch(`http://localhost:80/recipes/${recipeId}`);
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
      const response = await fetch(`http://localhost:80/recipes/declined/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'declined' }),
      });
  
      if (response.ok) {
        console.log('Recipe status updated to Declined');
        setTimeout(async () => {
          try {
            const updatedResponse = await fetch(`http://localhost:80/recipes/${recipeId}`);
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
      <p className='info-header'>Cook Time: </p> <p className='info-details'> {recipe.cooktime} minutes</p>
        <p className='info-header'>Ingredients: </p> <p className='info-details'>{recipe.ingredientsQuantity}</p>
        <p className='info-header'>Estimated Cost: </p> <p className='info-details'>${recipe.estimatedCost}</p>
        <p className='info-header'>Instructions: </p> <p className='info-details'>{recipe.instructions}</p>
        <p className='info-header'>Servings: </p> <p className='info-details'> {recipe.servings}</p>
        <p className='info-header'>Protein: </p> <p className='info-details'> {recipe.protein?.proteinName}</p>
        <p className='info-header'>Appliance: </p> <p className='info-details'> {recipe.appliances?.map(appliances => appliances.name).join(', ')}</p>
        <p className='info-header'>Allergens: </p> <p className='info-details'> {recipe.allergens?.map(allergens => allergens.name).join(', ')}</p>
        <p className='info-header'> Status: </p> <p className='info-details'> {recipe.status}</p>

        {/* <Link to="/EditRecipe" onClick={handleEditClick} className='submit'>Edit Recipe</Link> */}
        {(isRecipeOwner || isAdmin) && (
          <Link to={`/recipe/${recipeId}/edit`} className='edit'>Edit Recipe</Link>
        )}
       
       {isAdmin && (
          <label className='change'>Change Status:</label>
        )}
        {isAdmin && (
          <div class="button-container">
            <button onClick={statusApprove} className='approved'>Approve</button> 
            <button onClick={statusDecline} className='declined'>Decline</button>
          </div>
        )}
    </div>
 </div>
  );
};

export default RecipeDetails;