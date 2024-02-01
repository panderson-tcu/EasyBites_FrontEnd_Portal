import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditRecipe.css';
import NavBar from './components/NavBar';
import {useAuth} from  './context/AuthProvider';
import axios from './api/axios';
import {URL} from './index.js'

const EditRecipe = () => {
  const { recipeId } = useParams();
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

  const { auth } = useAuth()
  console.log("printing auth information in edit-recipe page")
  console.log(auth.user)
  console.log(auth.roles)
  console.log(auth.accessToken)

  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

    useEffect(() => {
      const fetchRecipeDetails = async () => {
        axios.get(`${URL}/recipes/${recipeId}`, config)
          .then(response => {
            const recipeData = response.data;
            if(response.status===200){
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
        protein: recipe?.protein,
        // protein: {
        //   proteinId: recipe?.protein,
        // },
        recipeOwner: {
          nutritionUserId: auth.id,
        },
        ingredients: 
          recipe.ingredients.map((ingredient) => ({
            upcValue: ingredient.upcValue,
          })),
        appliances: recipe.appliances.map((appliance) => ({
          applianceId: appliance.applianceId,
        })),
        allergens: recipe.allergens.map((allergen) => ({
          allergenId: allergen.allergenId,
        })),
        appUsers: [],
      };
  
      console.log(formattedData);
      return formattedData;
    };
    
      const handleCheckboxChangeAlrg = (event) => {
        const { name, checked, value } = event.target;
        let newAllergen = {
          allergenId: parseInt(value),
          // allergenId: value,
          'name': name
        }
        setFormData((prevFormData) => {
          if (value === '2008' && checked) {
            // If "None" is selected, unselect all other options
            return {
                ...prevFormData,
                allergens: [newAllergen],
            };
          }
          else {
            return {
            ...prevFormData,
            allergens: checked
              ? [...prevFormData.allergens, newAllergen]
              : prevFormData.allergens.filter(
                (allergen) => allergen.allergenId !== newAllergen.allergenId
              ),
            }
          }
        });
      };

      const handleCheckboxChangeApli = (event) => {
        const { name, checked, value } = event.target;
        let newAppliance = {
          applianceId: parseInt(value),
          // applianceId: value,
          'name': name
        }
        setFormData((prevFormData) => {
          if (value === '3007' && checked) {
            // If "None" is selected, unselect all other options
            return {
                ...prevFormData,
                appliances: [newAppliance],
            };
          }
          else {
            return {
            ...prevFormData,
            appliances: checked
              ? [...prevFormData.appliances, newAppliance]
              : prevFormData.appliances.filter(
                (appliance) => appliance.applianceId !== newAppliance.applianceId
              ),
            }
          }
        });
      };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        if (name === 'ingredients') {
          // Split the textarea value into an array of lines
          const sanitizedValue = value.replace(/[^\d\n]+/g, (match) => (match.includes('\n') ? '\n' : ''));
          const ingredientLines = sanitizedValue.split('\n');
      
          // Create a new array of ingredients using the upcValues from each line
          const newIngredients = ingredientLines.map((line) => ({
            upcValue: line.trim(), // Trim removes leading and trailing whitespaces
          }));
      
          setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: newIngredients,
          }));
        } 
        else if(name==='protein') {
          let newProtein = {
            proteinId: parseInt(value),
            // 'name': name
          }
          setFormData((prevFormData) => ({
            ...prevFormData,
            protein: newProtein
          }));
        }
        else if (name==='estimatedCost') {
        // Validate the input against a decimal number pattern
        const decimalNumberPattern = /^\d+(\.\d{0,2})?$/;
        if (decimalNumberPattern.test(value) || value === '') {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
        }
        else {
          // For other fields, update the state as usual
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`${URL}/recipes/${recipeId}`,handleSendData(recipe), config)
          .then(response => {
            const recipeData = response.data;
            if(response.status===200){
              console.log(JSON.stringify(recipeData))
              setSubmitted(true); 
            } else {
              console.error('Failed to edit recipe details:', response.statusText)
            }
          })
          .catch(error => {
            console.error('Error submitting recipe:', error);
          })
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
                        onChange={handleInputChange}
                        required>
                    </input>
                </label>
               
                <label htmlFor="multipleSelect">Allergen Options:</label>
                <label className='sub-label'>Select all allergens that are in the Recipe <br /> ex. Pasta conatinas wheat so select wheat</label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenMilkCheckbox'
                      name='Milk'
                      value='2000'
                      // checks allergen if this allergen is in the json
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2000)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Milk
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenEggCheckbox'
                      name='Eggs'
                      value='2001'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2001)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Eggs
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenPeanutCheckbox'
                      name='Peanuts'
                      value='2002'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2002)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Peanuts
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenTreeNutsCheckbox'
                      name='Tree Nuts'
                      value='2003'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2003)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Tree Nuts
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenSoyCheckbox'
                      name='Soy'
                      value='2004'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2004)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Soy
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenWheatCheckbox'
                      name='Wheat'
                      value='2005'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2005)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Wheat
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenShellfishCheckbox'
                      name='Shellfish'
                      value='2006'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2006)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Shellfish
                    <br />
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenFishCheckbox'
                      name='Fish'
                      value='2007'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2007)}
                      onChange={handleCheckboxChangeAlrg}
                      disabled={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                    />
                    Fish
                    <br /> 
                </label>
                <label className='sub-label'>
                  <input
                      type='checkbox'
                      id='allergenNoneCheckbox'
                      name='None'
                      value='2008'
                      checked={recipe.allergens.some((allergen) => allergen.allergenId === 2008)}
                      onChange={handleCheckboxChangeAlrg}
                    />
                    None
                    <br /> 
                </label>

                <label> Protein Options: <br />
                    <select name='protein'
                    value={recipe.protein.proteinId}
                    onChange={handleInputChange}
                    required>
                        <option value="" disabled>Select</option>
                        <option value="1000" name="Chicken">Chicken</option>
                        <option value="1001" name="Beef">Beef</option>
                        <option value="1002" name="Pork">Pork</option>
                        <option value="1006" name="Turkey">Turkey</option>
                        <option value="1004" name="Seafood">Seafood</option>
                        <option value="1003" name="Tofu">Tofu</option>
                        <option value="1005" name="None">None</option>
                    </select>
                </label>

                <label>
                    Recipe Time:</label> <label className='sub-label'> Recipe time refers to the time in minutes needed to cook recipe and preparation process time combine.
                    <select name='cooktime'
                        value={recipe.cooktime}
                        onChange={handleInputChange}>
                        <option value="" disabled>Select</option>
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
                        onChange={handleInputChange}
                        required></textarea>      
                </label>
                <label>UPC Value:</label><label className='sub-label'>Located on Kroger.com. Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the store website. <br/> Examples: <br/> 0001111050158 <br/> 0001111096920 <br /> 0001111096921
                    <textarea 
                        name='ingredients'
                        value={recipe.ingredients.map(ingredient => ingredient.upcValue).join('\n')}
                        onChange={handleInputChange}
                        required></textarea>      
                </label>
                <label>Estimated Ingredients Cost:</label><label className='sub-label'>
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.<br/>
                        Example 1: 20.50<br/>
                        Example 2: 10.00
                    <textarea  
                    name='estimatedCost'
                    value={recipe.estimatedCost}
                    onChange={handleInputChange}
                    required
                    pattern="\d+(\.\d{0,2})?"></textarea>      
                </label>

                <label htmlFor="multipleSelect">Appliance Selection:</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        id='applianceAirFryerCheckbox'
                        value='3000'
                        name='Air Fryer'
                        checked={recipe.appliances.some((appliance)=> appliance.applianceId === 3000)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Air Fryer <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        id='applianceCrockpotCheckbox' 
                        value='3001' 
                        name='Crockpot'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3001)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Crockpot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        id='applianceStoveCheckbox'
                        value='3002' 
                        name='Stove'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3002)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Stove <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        id='applianceOvenCheckbox'
                        value='3003' 
                        name='Oven'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3003)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Oven <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        id='applianceMicrowaveCheckbox'
                        value='3004'
                        name='Microwave'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3004)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Microwave <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        id='applianceBlenderCheckbox'
                        value='3005'
                        name='Blender'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3005)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Blender <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        id='applianceInstantPotCheckbox'
                        value='3006' 
                        name='Instant Pot'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3006)}
                        onChange={handleCheckboxChangeApli}
                        disabled={recipe.appliances.some((appliance) => appliance.applianceId === 3007)}></input> Instant Pot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        id='applianceNoneCheckbox'
                        value='3007' 
                        name='None'
                        checked={recipe.appliances.some((appliance)=>appliance.applianceId === 3007)}
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
                    onChange={handleInputChange}
                    required></textarea>      
                </label>

                <label>
                    Serving Size:
                    <select
                    name='servings'
                    value={recipe.servings}
                    onChange={handleInputChange}
                    required>
                        <option value="" disabled>Select</option>
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