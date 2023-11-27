import React, { useState } from 'react';
import './RecipeForm.css';
import NavBar from './components/NavBar';


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
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:80/recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(handleSendData(formData)),
            // body: JSON.stringify(formData),
            
          });
    
          if (response.ok) {
            console.log('Recipe submitted successfully!');
          } else {
            console.error(
              'Failed to submit recipe:',
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error('Error submitting recipe:', error);
        }
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
            nutritionUserId: 110409760,
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
    
        // Now, send the formattedData to the server
        // Your API call or fetch code goes here
        console.log(formattedData); // For testing
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
    
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      return (
        <div className='RecipeForm-Container'>
            <NavBar />
            <div className='form-wrapper'>
                <h1 className='page-title'> Easy Bites Recipe Submission</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Recipe Name: <br/>
                    <input 
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}>
                    </input>
                </label>
               
                <label htmlFor="multipleSelect">Allergren Options:</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2000'
                        checked={formData.allergens.includes('2000')}
                        onChange={handleCheckboxChangeAlrg}></input> Milk <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2001' 
                        checked={formData.allergens.includes('2001')}
                        onChange={handleCheckboxChangeAlrg}></input> Eggs <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2002' 
                        checked={formData.allergens.includes('2002')}
                        onChange={handleCheckboxChangeAlrg}></input> Peanuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2003' 
                        checked={formData.allergens.includes('2003')}
                        onChange={handleCheckboxChangeAlrg}></input> Tree Nuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2004'
                        checked={formData.allergens.includes('2004')}
                        onChange={handleCheckboxChangeAlrg}></input> Soy <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='2005'
                        checked={formData.allergens.includes('2005')}
                        onChange={handleCheckboxChangeAlrg}></input> Wheat <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2006' 
                        checked={formData.allergens.includes('2006')}
                        onChange={handleCheckboxChangeAlrg}></input> Shellfish <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2007' 
                        checked={formData.allergens.includes('2007')}
                        onChange={handleCheckboxChangeAlrg}></input> Fish <br /> 
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='2008' 
                        checked={formData.allergens.includes('2008')}
                        onChange={handleCheckboxChangeAlrg}></input> None <br /> 
                </label>

                <label> Protein Options: <br />
                    <select name='protein'
                    value={formData.protein}
                    onChange={handleInputChange}>
                        <option value="1005">None</option>
                        <option value="1000">Chicken</option>
                        <option value="1001">Beef</option>
                        <option value="1002">Pork</option>
                        <option value="1003">Seafood</option>
                        <option value="1004">Tofu</option>
                    </select>
                </label>

                <label>
                    Recipe Time:</label> <label className='sub-label'> Recipe time refers to the time in minutes needed to cook recipe and preparation process time combine.
                    <select name='cookTime'
                        value={formData.cookTime}
                        onChange={handleInputChange}>
                        <option value="option"></option>
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
                        name='ingredientQuantity'
                        value={formData.ingredientQuantity}
                        onChange={handleInputChange}></textarea>      
                </label>
                <label>UPC Value:</label><label className='sub-label'>Located on Kroger.com. Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the store website. <br/> Examples: <br/> 0001111050158 <br/> 0001111096920 <br /> 0001111096921
                    <textarea name='upcValues'
                        value={formData.upcValues}
                        onChange={handleInputChange}></textarea>      
                </label>
                <label>Estimated Ingredients Cost:</label><label className='sub-label'>
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.<br/>
                        Example 1: 20.50<br/>
                        Example 2: 10.00
                    <textarea  name='cost'
                    value={formData.cost}
                    onChange={handleInputChange}></textarea>      
                </label>

                <label htmlFor="multipleSelect">Appliance Selection:</label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3000'
                        checked={formData.appliances.includes('3000')}
                        onChange={handleCheckboxChangeApli}></input> Air fryer <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3001' 
                        checked={formData.appliances.includes('3001')}
                        onChange={handleCheckboxChangeApli}></input> Crockpot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3002' 
                        checked={formData.appliances.includes('3002')}
                        onChange={handleCheckboxChangeApli}></input> Stove <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3003' 
                        checked={formData.appliances.includes('3003')}
                        onChange={handleCheckboxChangeApli}></input> Oven <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3004'
                        checked={formData.appliances.includes('3004')}
                        onChange={handleCheckboxChangeApli}></input> Microwave <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='3005'
                        checked={formData.appliances.includes('3005')}
                        onChange={handleCheckboxChangeApli}></input> Blender <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3006' 
                        checked={formData.appliances.includes('3006')}
                        onChange={handleCheckboxChangeApli}></input> Instant Pot <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='3007' 
                        checked={formData.appliances.includes('3007')}
                        onChange={handleCheckboxChangeApli}></input> None <br /> 
                </label>
            



                {/* <label htmlFor="multipleSelect"> Recipe Appliances:</label><label className='sub-label'>Please select all the appliances needed for this recipe. If there is an applying you think should be added, feel free to let us know! <br />
                <label htmlFor="airfryer" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3000'
                    value='airfryer'
                    id='3000'
                    onChange={handleCheckboxChange}/>
                    Air Fryer
                </label><br />
                <label htmlFor="crockpot" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3001'
                    value='crockpot'
                    id='3001'
                    onChange={handleCheckboxChange}/>
                    Crockpot
                </label><br />
                <label htmlFor="stove" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3002'
                    value='stove'
                    id='3002'
                    onChange={handleCheckboxChange}/>
                    Stove
                </label><br />
                <label htmlFor="oven" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3003'
                    value='oven'
                    id='3003'
                    onChange={handleCheckboxChange}/>
                    Oven
                </label><br />
                <label htmlFor="microwave" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3004'
                    value='microwave'
                    id='3004'
                    onChange={handleCheckboxChange}/>
                    Microwave
                </label><br />
                <label htmlFor="blender" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3005'
                    value='blender'
                    id='3005'
                    onChange={handleCheckboxChange}/>
                    Blender
                </label><br />
                <label htmlFor="instantpot" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3006'
                    value='instantpot'
                    id='3006'
                    onChange={handleCheckboxChange}/>
                    Instant Pot
                </label><br />
                <label htmlFor="None" className='sub-label'>
                    <input
                    type='checkbox'
                    name='3007'
                    value='none'
                    id='3007'
                    onChange={handleCheckboxChange}/>
                    None
                </label>
                </label> */}
    
                <label>
                    Recipe Instructions: </label><label className='sub-label'>
                    Please end each step with a '.' (full stop). Each step should go in a separate line.<br/>
                        Example: <br/>
                        Preheat oven to 350 F.<br/>
                        Add milk, eggs, and oil to a large bowl.<br/>
                        Combine wet and dry ingredients.
                    <textarea  name='instructions'
                    value={formData.instructions}
                    onChange={handleInputChange}></textarea>      
                </label>

                <label>
                    Serving Size:
                    <select
                    name='servings'
                    value={formData.servings}
                    onChange={handleInputChange}>
                        <option value="">Slect One</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
                <input className='submit' type="submit" value="Submit" />
            </form>
            </div>
        </div>  
    )
    
}

export default RecipeForm;