import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditRecipe.css';
import NavBar from './components/NavBar';
import {AuthContext, useAuth} from  './context/AuthProvider';
import axios from './api/axios';

const EditRecipe = () => {
  const { recipeId } = useParams();
  const URL = 'http://localhost:80';
  const [recipe, setFormData] = useState({
    title: '',
    allergens: [],
    protein: '',
    cooktime: '',
    ingredientsQuantity: '',
    ingredients: [],
    estimatedCost: '',
    appliances: [],
    instructions: '',
    servings: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { auth, setAuth } = useAuth()
  console.log("printing auth information in edit-recipe page")
  console.log(auth.user)
  console.log(auth.pwd)
  console.log(auth.roles)
  console.log(auth.accessToken)

  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

    useEffect(() => {
      const fetchRecipeDetails = async () => {
        axios.get(URL+`/recipes/${recipeId}`, config)
          .then(response => {
            const recipeData = response.data;
            if(response.status==200){
              setFormData(recipeData.data)
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
    
    console.log(JSON.stringify(recipe))
    const handleSendData = (formData) => {
      const formattedData = {
        title: recipe.title,
        cooktime: parseInt(recipe.cooktime),
        ingredientsQuantity: recipe.ingredientsQuantity,
        estimatedCost: parseFloat(recipe.estimatedCost),
        instructions: recipe.instructions,
        servings: parseInt(recipe.servings),
        status: null,
        protein: {
          proteinId: recipe?.protein?.proteinId,
        },
        recipeOwner: {
          nutritionUserId: 110400159,
        },
        ingredients: 
          recipe.ingredients.map((ingredient) => ({
            upcValue: ingredient.upcValue,
          })),
        appliances: recipe.appliances.map((appliance) => ({
          applianceId: appliance,
        })),
        allergens: recipe.allergens.map((allergen) => ({
          allergenId: allergen,
        })),
        appUsers: [],
      };
  
      console.log(formattedData);
      return formattedData;
    };
    
    
      const handleCheckboxChangeAlrg = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          allergens: checked
            ? [...prevFormData.allergens, name]
            : prevFormData.allergens.filter((item) => item !== name),
        }));
      };

      const handleCheckboxChangeApli = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          appliances: checked
            ? [...prevFormData.appliances, name]
            : prevFormData.appliances.filter((item) => item !== name),
        }));
      };
    
      // const handleInputChange = (event) => {
      //   const { name, value } = event.target;
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     [name]: value,
      //   }));
      // };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        if (name === 'ingredients') {
          // Split the textarea value into an array of lines
          const ingredientLines = value.split('\n');
      
          // Create a new array of ingredients using the upcValues from each line
          const newIngredients = ingredientLines.map((line) => ({
            upcValue: line.trim(), // Trim removes leading and trailing whitespaces
          }));
      
          setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: newIngredients,
          }));
        } else {
          // For other fields, update the state as usual
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(URL+`/recipes/${recipeId}`,handleSendData(recipe), config)
          .then(response => {
            const recipeData = response.data;
            if(response.status==200){
              console.log(JSON.stringify(recipeData))
            } else {
              console.error('Failed to edit recipe details:', response.statusText)
            }
          })
          .catch(error => {
            console.error('Error submitting recipe:', error);
          })

        // try {
        //   const response = await fetch(`http://localhost:80/recipes/${recipeId}`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(handleSendData(recipe)), 
        //   });
    
        // } catch (error) {
        //   console.error('Error submitting recipe:', error);
        // }
      };

      return (
        <div className='EditRecipe-Container'>
            <NavBar />
            <div className='form'>
                <h1 className='page-title'> Edit {recipe.title} </h1> 
                <form onSubmit={handleSubmit}>
                <label>
                    Recipe Name: <br/>
                    <input 
                        type='text'
                        name='title'
                        value={recipe.title}
                        onChange={handleInputChange}>
                    </input>
                </label>
               
                <label htmlFor="multipleSelect">Allergren Options:</label>
                <label className='sub-label'>Select all allergens that are in the Recipe <br /> ex. Pasta conatinas wheat so select wheat</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2000'
                        checked={recipe.allergens.includes('2000')}
                        onChange={handleCheckboxChangeAlrg}></input> Milk <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2001' 
                        checked={recipe.allergens.includes('2001')}
                        onChange={handleCheckboxChangeAlrg}></input> Eggs <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2002' 
                        checked={recipe.allergens.includes('2002')}
                        onChange={handleCheckboxChangeAlrg}></input> Peanuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2003' 
                        checked={recipe.allergens.includes('2003')}
                        onChange={handleCheckboxChangeAlrg}></input> Tree Nuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2004'
                        checked={recipe.allergens.includes('2004')}
                        onChange={handleCheckboxChangeAlrg}></input> Soy <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2005'
                        checked={recipe.allergens.includes('2005')}
                        onChange={handleCheckboxChangeAlrg}></input> Wheat <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2006' 
                        checked={recipe.allergens.includes('2006')}
                        onChange={handleCheckboxChangeAlrg}></input> Shellfish <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2007' 
                        checked={recipe.allergens.includes('2007')}
                        onChange={handleCheckboxChangeAlrg}></input> Fish <br /> 
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2008' 
                        checked={recipe.allergens.includes('2008')}
                        onChange={handleCheckboxChangeAlrg}></input> None <br /> 
                </label>

                <label> Protein Options: <br />
                    <select name='protein'
                    value={recipe.protein.proteinId}
                    onChange={handleInputChange}>
                        <option value="None">Select</option>
                        <option value="1000">Chicken</option>
                        <option value="1001">Beef</option>
                        <option value="1002">Pork</option>
                        <option value="1004">Seafood</option>
                        <option value="1003">Tofu</option>
                        <option value="1005">None</option>
                    </select>
                </label>

                <label>
                    Recipe Time:</label> <label className='sub-label'> Recipe time refers to the time in minutes needed to cook recipe and preparation process time combine.
                    <select name='cooktime'
                        value={recipe.cooktime}
                        onChange={handleInputChange}>
                        <option value="option">Select</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                    </select>
                </label>
                <label>
                    Ingredients Quantity</label><label className='sub-label'>
                    Please format the quantity of each ingredients in the following way. Please capitalize the name of the ingredient. <br/>
                    This is how the ingredients list will be displayed. <br/>
                    Example: <br/>
                        1 cup Milk <br/>
                        3 Eggs<br/>
                        12 oz Chocolate Chips<br/>
                        1 1/2 Tbsp Baking Powder<br/>
                        <textarea  
                        name='ingredientsQuantity'
                        value={recipe.ingredientsQuantity}
                        onChange={handleInputChange}></textarea>      
                </label>
                <label>UPC Value:</label><label className='sub-label'>Located on Kroger.com. Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the store website. <br/> Examples: <br/> 0001111050158 <br/> 0001111096920 <br /> 0001111096921
                    <textarea 
                        name='ingredients'
                        value={recipe.ingredients.map(ingredient => ingredient.upcValue).join('\n')}
                        onChange={handleInputChange}></textarea>      
                </label>
                <label>Estimated Ingredients Cost:</label><label className='sub-label'>
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.<br/>
                        Example 1: 20.50<br/>
                        Example 2: 10.00
                    <textarea  name='estimatedCost'
                    value={recipe.estimatedCost}
                    onChange={handleInputChange}></textarea>      
                </label>

                <label htmlFor="multipleSelect">Appliance Selection:</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3000'
                        value='3000'
                        checked={recipe.appliances.includes('3000')}
                        onChange={handleCheckboxChangeApli}></input> Air fryer <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3001' 
                        value='3001'
                        checked={recipe.appliances.includes('3001')}
                        onChange={handleCheckboxChangeApli}></input> Crockpot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3002' 
                        value='3002'
                        checked={recipe.appliances.includes('3002')}
                        onChange={handleCheckboxChangeApli}></input> Stove <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3003' 
                        value='3003'
                        checked={recipe.appliances.includes('3003')}
                        onChange={handleCheckboxChangeApli}></input> Oven <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3004'
                        value='3004'
                        checked={recipe.appliances.includes('3004')}
                        onChange={handleCheckboxChangeApli}></input> Microwave <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3005'
                        value='3005'
                        checked={recipe.appliances.includes('3005')}
                        onChange={handleCheckboxChangeApli}></input> Blender <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3006' 
                        value='3006'
                        checked={recipe.appliances.includes('3006')}
                        onChange={handleCheckboxChangeApli}></input> Instant Pot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3007' 
                        value='3007'
                        checked={recipe.appliances.includes('3007')}
                        onChange={handleCheckboxChangeApli}></input> None <br /> 
                </label>
                <label>
                    Recipe Instructions: </label><label className='sub-label'>
                    Please end each step with a '.' (full stop). Each step should go in a separate line.<br/>
                        Example: <br/>
                        Preheat oven to 350 F.<br/>
                        Add milk, eggs, and oil to a large bowl.<br/>
                        Combine wet and dry ingredients.
                    <textarea  name='instructions'
                    value={recipe.instructions}
                    onChange={handleInputChange}></textarea>      
                </label>

                <label>
                    Serving Size:
                    <select
                    name='servings'
                    value={recipe.servings}
                    onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
                <input className='submit' type="submit" value="Update" />
                {submitted && (
                    <div className='success-banner'>Recipe updated successfully!</div>
                )}   
            </form>
            </div>
        </div>  
    )
    
}

export default EditRecipe;