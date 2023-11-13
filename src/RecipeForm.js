import React from 'react';
import './RecipeForm.css';
import NavBar from './components/NavBar';


const RecipeForm = () => {

    return (
        <div className='RecipeForm-Container'>
            <NavBar />
            <div className='form-wrapper'>
            <form>
                <label>
                    Recipe Name:
                    <input type="text"></input>
                </label>
                <label htmlFor="multipleSelect">Allergren Options:</label>
                <select multiple={true} value={['B', 'C']}>
                    <option value="option1">Milk</option>
                    <option value="option2">Peanuts</option>
                    <option value="option3">Tree Nuts</option>
                    <option value="option4">Soy</option>
                    <option value="option5">Eggs</option>
                    <option value="option6">Wheat</option>
                    <option value="option7">Shellfish</option>
                    <option value="option8">Fish</option>
                    <option value="option9">None</option>
                </select>
                <label>
                    Cook Time:</label> <label className='sub-label'> Cook time refers to the time in minutes needed to cook recipe excluding the preparation process.
                    <select>
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
                    Here is an example: <br/>
                        1 cup Milk <br/>
                        3 Eggs<br/>
                        12 oz Chocolate Chips<br/>
                        1 1/2 Tbsp Baking Powder<br/>
                        <textarea name="ingredientQuantity"></textarea>      
                </label>
                <label>UPC Value:</label><label className='sub-label'>Located on Kroger.com. Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the store website.
                    <textarea name="upcValue" placeholder='UPC Value'></textarea>      
                </label>
                <label>Estimated Ingredients Cost:</label><label className='sub-label'>
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.<br/>
                        Example 1: 20.50<br/>
                        Example 2: 10.00
                    <textarea name="ingredientCost" placeholder='Ingrient Cost'></textarea>      
                </label>
                <label>
                    Recipe Appliances:</label><label className='sub-label'>Please select all the appliances needed for this recipe. If there is an applying you think should be added, feel free to let us know!
                    <select name="selectedFruit">
                        <option value="airfryer">Air Fryer</option>
                        <option value="crockpot">Crockpot</option>
                        <option value="stove">Stove</option>
                        <option value="oven">Oven</option>
                        <option value="microwave">Microwave</option>
                        <option value="blender">Blender</option>
                        <option value="stove">Stove</option>
                        <option value="instantpot">Instant pot</option>
                    </select>
                </label>
                <label>
                    Recipe Instructions: </label><label className='sub-label'>
                    Please end each step with a '.' (full stop). Each step should go in a separate line.<br/>
                        Example: <br/>
                        Preheat oven to 350 F.<br/>
                        Add milk, eggs, and oil to a large bowl.<br/>
                        Combine wet and dry ingredients.
                    <textarea name="recipeinstructions" placeholder='Recipe Instructions'></textarea>      
                </label>
                <label>
                    Serving Size:
                    <select>
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