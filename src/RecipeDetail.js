import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    cookTime: '',
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
    // Fetch recipe details based on recipeId
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
    // Implement navigation to the recipe edit page or open a modal for editing
    console.log('Edit button clicked');
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Cook Time: {recipe.cookTime} minutes</p>
      <p>Ingredients: {recipe.ingredientsQuantity}</p>
      <p>Estimated Cost: ${recipe.estimatedCost.toFixed(2)}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Protein: {recipe.protein.name}</p>
      <p>Ingredients: {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
      {/* Add similar sections for displaying other details like appliances and allergens */}
      
      <button onClick={handleEditClick}>Edit Recipe</button>
    </div>
  );
};

export default RecipeDetails;
