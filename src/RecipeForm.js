// import React from 'react';
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
          const response = await fetch('http://localhost:8080/Recipe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
    
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          allergens: checked
            ? [...prevFormData.allergens, name]
            : prevFormData.allergens.filter((item) => item !== name),
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
                        name='milkAllergen'
                        checked={formData.allergens.includes('milkAllergen')}
                        onChange={handleCheckboxChange}></input> Milk <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='peanutsAllergen' 
                        checked={formData.allergens.includes('peanutsAllergen')}
                        onChange={handleCheckboxChange}></input> Peanuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='nutsAllergen' 
                        checked={formData.allergens.includes('nutsAllergen')}
                        onChange={handleCheckboxChange}></input> Tree Nuts <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='soyAllergen'
                        checked={formData.allergens.includes('soyAllergen')}
                        onChange={handleCheckboxChange}></input> Soy <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='eggAllergen' 
                        checked={formData.allergens.includes('eggAllergen')}
                        onChange={handleCheckboxChange}></input> Eggs <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox'
                        name='wheatAllergen'
                        checked={formData.allergens.includes('wheatAllergen')}
                        onChange={handleCheckboxChange}></input> Wheat <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='shellAllergen' 
                        checked={formData.allergens.includes('shellAllergen')}
                        onChange={handleCheckboxChange}></input> Shellfish <br />
                </label>
                <label className='sub-label'>
                    <input 
                        type='checkbox' 
                        name='fishAllergen' 
                        checked={formData.allergens.includes('fishAllergen')}
                        onChange={handleCheckboxChange}></input> Fish <br /> 
                </label>

                <label> Protein Options: <br />
                    <select name='protein'
                    value={formData.protein}
                    onChange={handleInputChange}>
                        <option>Chicken</option>
                        <option>Pork</option>
                        <option>Beef</option>
                        <option>Tofu</option>
                        <option>Fish</option>
                        <option>None</option>
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
                <label htmlFor="multipleSelect"> Recipe Appliances:</label><label className='sub-label'>Please select all the appliances needed for this recipe. If there is an applying you think should be added, feel free to let us know! <br />
                <label htmlFor="airfryer" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='airfryer'
                    id='airfryer'
                    onChange={handleCheckboxChange}
                    />
                    Air Fryer
                </label><br />
                <label htmlFor="crockpot" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='crockpot'
                    id='crockpot'
                    onChange={handleCheckboxChange}
                    />
                    Crockpot
                </label><br />
                <label htmlFor="stove" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='stove'
                    id='stove'
                    onChange={handleCheckboxChange}
                    />
                    Stove
                </label><br />
                <label htmlFor="oven" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='oven'
                    id='oven'
                    onChange={handleCheckboxChange}
                    />
                    Oven
                </label><br />
                <label htmlFor="microwave" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='microwave'
                    id='microwave'
                    onChange={handleCheckboxChange}
                    />
                    Microwave
                </label><br />
                <label htmlFor="blender" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='blender'
                    id='blender'
                    onChange={handleCheckboxChange}
                    />
                    Blender
                </label><br />
                <label htmlFor="instantpot" className='sub-label'>
                    <input
                    type='checkbox'
                    name='appliances'
                    value='instantpot'
                    id='instantpot'
                    onChange={handleCheckboxChange}
                    />
                    Instant Pot
                </label>
                </label>
    
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
                        <option value="serv"></option>
                        <option value="serv1">1</option>
                        <option value="serv2">2</option>
                        <option value="serv3">3</option>
                        <option value="serv4">4</option>
                        <option value="serv5">5</option>
                        <option value="serv6">6</option>
                    </select>
                </label>
                <input className='submit' type="submit" value="Submit" />
            </form>
            </div>
        </div>  
    )
    
}

export default RecipeForm;