import React, { useState } from 'react';
import './RecipeForm.css';
import NavBar from './components/NavBar';
import {useAuth} from  './context/AuthProvider';
import axios from './api/axios';
import { URL } from './index.js';


const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        allergens: [],
        protein: '',
        cookTime: '',
        ingredientQuantity: '',
        upcValues: '',
        cost: '',
        appliances: [],
        instructions: '',
        servings: '',
      });

      const [submitted, setSubmitted] = useState(false);
      const { auth } = useAuth()
      console.log("printing auth information")
      console.log(auth.user)
      console.log(auth.roles)
      console.log(auth.accessToken)

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post(`${URL}/recipes`,handleSendData(formData), config)
          .then(response => {
            if(response.status===200){
              console.log('Recipe submitted successfully!');
              setSubmitted(true);
              setFormData({ // Reset the form after submission
                title: '',
                allergens: [],
                protein: '',
                cookTime: '',
                ingredientQuantity: '',
                upcValues: '',
                cost: '',
                appliances: [],
                instructions: '',
                servings: '',
            });
            setTimeout(() => {
                setSubmitted(false);
              }, 3000);
            } else {
              console.error(
                'Failed to submit recipe:',
                response.status,
                response.statusText
              );
            }
          }) 
          .catch (error => {
            console.error('Error submitting recipe:', error);
          })
      };

      const handleSendData = (formData) => {
        // Format the data before sending
        const formattedData = {
          title: formData.title,
          cooktime: parseInt(formData.cookTime),
          ingredientsQuantity: formData.ingredientQuantity,
          estimatedCost: parseFloat(formData.cost),
          instructions: formData.instructions,
          servings: parseInt(formData.servings),
          status: null,
          protein: {
            proteinId: formData.protein,
          },
          recipeOwner: {
            nutritionUserId: auth.id,
          },
          ingredients: formData.upcValues
            .split('\n')
            .map(upcValue => ({ upcValue })),
          appliances: formData.appliances.map(appliance => ({
            applianceId: appliance,
          })),
          allergens: formData.allergens.map(allergen => ({
            allergenId: allergen,
          })),
          appUsers: [],
        };
    
        console.log(formattedData); 
        return formattedData;
      };

      const handleCheckboxChangeAlrg = (event) => {
        const { name, checked } = event.target;
    
        setFormData((prevFormData) => {
            if (name === '2008' && checked) {
                // If "None" is selected, unselect all other options
                return {
                    ...prevFormData,
                    allergens: [name],
                };
            } else {
                // Handle other options as usual
                return {
                    ...prevFormData,
                    allergens: checked
                        ? [...prevFormData.allergens.filter(item => item !== '2008'), name]
                        : prevFormData.allergens.filter((item) => item !== name),
                };
            }
        });
      };
    

      const handleCheckboxChangeApli = (event) => {
        const { name, checked } = event.target;
    
        setFormData((prevFormData) => {
            if (name === '3007' && checked) {
                // If "None" is selected, unselect all other options
                return {
                    ...prevFormData,
                    appliances: [name],
                };
            } else {
                // Handle other options as usual
                return {
                    ...prevFormData,
                    appliances: checked
                        ? [...prevFormData.appliances.filter(item => item !== '3007'), name]
                        : prevFormData.appliances.filter((item) => item !== name),
                };
            }
        });
      };
    
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const handleInputChangeCost = (event) => {
        const { name, value } = event.target;
    
        // Validate the input against a decimal number pattern
        const decimalNumberPattern = /^\d+(\.\d{0,2})?$/;
        if (decimalNumberPattern.test(value) || value === '') {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      };

      const handleInputChangeUPC = (event) => {
        const { name, value } = event.target;
        const sanitizedValue = value.replace(/[^\d\n]+/g, (match) => (match.includes('\n') ? '\n' : ''));

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: sanitizedValue,
        }));
      };

      return (
        <div className='RecipeForm-Container'>
            <NavBar />
            <div className='form'>
                <h1 className='page-title'> Easy Bites Recipe Submission</h1>
                {/* {submitted && (
                    <div className='success-banner'>Recipe submitted successfully!</div>
                     )}             */}
                <form onSubmit={handleSubmit}>
                <label>
                    Recipe Name: <br/>
                    <input 
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        required>
                    </input>
                </label>
               
                <label htmlFor="multipleSelect">Allergen Options:</label>
                <label className='sub-label'>Select all allergens that are in the Recipe <br /> Example: Pasta conatins wheat, so select wheat</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2000'
                        checked={formData.allergens.includes('2000')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}>
                      </input> 
                      Milk <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2001' 
                        checked={formData.allergens.includes('2001')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}
                        >
                    </input> 
                    Eggs <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2002' 
                        checked={formData.allergens.includes('2002')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}>
                    </input> 
                    Peanuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2003' 
                        checked={formData.allergens.includes('2003')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}>
                    </input> 
                    Tree Nuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2004'
                        checked={formData.allergens.includes('2004')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}>
                        </input> Soy <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2005'
                        checked={formData.allergens.includes('2005')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}
                        ></input> Wheat <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2006' 
                        checked={formData.allergens.includes('2006')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}
                        ></input> Shellfish <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2007' 
                        checked={formData.allergens.includes('2007')}
                        onChange={handleCheckboxChangeAlrg}
                        disabled={formData.allergens.includes('2008')}
                        ></input> Fish <br /> 
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2008' 
                        checked={formData.allergens.includes('2008')}
                        onChange={handleCheckboxChangeAlrg}></input> None <br /> 
                </label>

                <label> Protein Options: <br />
                    <select
                    name='protein'
                    value={formData.protein}
                    onChange={handleInputChange}
                    required>
                        <option value="" disabled>Select</option>
                        <option value="1000">Chicken</option>
                        <option value="1001">Beef</option>
                        <option value="1002">Pork</option>
                        <option value="1004">Seafood</option>
                        <option value="1003">Tofu</option>
                        <option value="1005">None</option>
                    </select>
                </label>

                <label>
                    Cook Time:</label> <label className='sub-label'> Recipe time refers to the total time in minutes needed to make the entire recipe.
                    <select 
                        name='cookTime'
                        value={formData.cookTime}
                        onChange={handleInputChange}
                        required>
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
                        className='ingrediants-quantity-textarea'
                        name='ingredientQuantity'
                        value={formData.ingredientQuantity}
                        onChange={handleInputChange}
                        required></textarea>      
                </label>
                <label>UPC Value:</label><label className='sub-label'>Located on Kroger.com. Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the store website. <br/> Examples: <br/> 0001111050158 <br/> 0001111096920 <br /> 0001111096921
                    <textarea 
                        className='upc-textarea integer-input' // Add the integer-input class
                        name='upcValues'
                        value={formData.upcValues}
                        onChange={handleInputChangeUPC}  // Use a separate handler for UPC validation
                        required></textarea>      
                </label>
                <label>Estimated Ingredients Cost:</label><label className='sub-label'>
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.<br/>
                        Example 1: 20.50<br/>
                        Example 2: 10.00
                    <textarea 
                    className='cost-textarea'
                    name='cost'
                    value={formData.cost}
                    onChange={handleInputChangeCost}
                    required
                    pattern="\d+(\.\d{0,2})?"
                    ></textarea>      
                </label>

                <label htmlFor="multipleSelect">Appliance Selection:</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3000'
                        checked={formData.appliances.includes('3000')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Air fryer <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3001' 
                        checked={formData.appliances.includes('3001')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Crockpot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3002' 
                        checked={formData.appliances.includes('3002')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Stove <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3003' 
                        checked={formData.appliances.includes('3003')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Oven <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3004'
                        checked={formData.appliances.includes('3004')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Microwave <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3005'
                        checked={formData.appliances.includes('3005')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}></input> Blender <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3006' 
                        checked={formData.appliances.includes('3006')}
                        onChange={handleCheckboxChangeApli}
                        disabled={formData.appliances.includes('3007')}
                        ></input> Instant Pot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3007' 
                        checked={formData.appliances.includes('3007')}
                        onChange={handleCheckboxChangeApli}></input> None <br /> 
                </label>
                <label>
                    Recipe Instructions: </label><label className='sub-label'>
                    Please end each step with a '.' (full stop). Each step should go in a separate line.<br/>
                        Example: <br/>
                        Preheat oven to 350 F.<br/>
                        Add milk, eggs, and oil to a large bowl.<br/>
                        Combine wet and dry ingredients.
                    <textarea 
                    className='instructions-textarea' 
                    name='instructions'
                    value={formData.instructions}
                    onChange={handleInputChange}
                    required></textarea>      
                </label>

                <label>
                    Serving Size:
                    <select
                    name='servings'
                    value={formData.servings}
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
                <input className='submit' type="submit" value="Submit" />
                {submitted && (
                    <div className='success-banner'>Recipe submitted successfully!</div>
                     )}   
            </form>
            </div>
        </div>  
    )
    
}

export default RecipeForm;