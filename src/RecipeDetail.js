import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css'
import NavBar from './components/NavBar';


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

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:80/recipes/${recipeId}`);
        if (response.ok) {
          const recipeData = await response.json();
          setRecipe(recipeData.data);
        } else {
          console.error('Failed to fetch recipe details');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleEditClick = () => {
    console.log('Edit button clicked');
  };

  return (
    <div className='recipe-container'>
      <NavBar />
      <div className='container'>
      <h2>Recipe Details of {recipe.title}</h2>
        <p>Cook Time: {recipe.cooktime} minutes</p>
        <p>Ingredients: {recipe.ingredientsQuantity}</p>
        <p>Estimated Cost: ${recipe.estimatedCost}</p>
        <p>Instructions: {recipe.instructions}</p>
        <p>Servings: {recipe.servings}</p>
        <p>Protein: {recipe.protein?.proteinName}</p>
        <p>Appliance: {recipe.appliances?.map(appliances => appliances.name).join(', ')}</p>
        <p>Allergens: {recipe.allergens?.map(allergens => allergens.name).join(', ')}</p>
        
        <button onClick={handleEditClick} className='submit'>Edit Recipe</button>
    </div>
  </div>
  );
};

export default RecipeDetails;
