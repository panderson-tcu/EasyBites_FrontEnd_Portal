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
                <label>
                    Recipe Allergen Information *Please specify if the recipe contains any of the following common allergens, select all that apply or "none".
                    <select>

                    </select>
                </label>
                <label>
                    Cook Time (in Minutes): Cook time refers to the time needed to cook recipe excluding the preparation process.
                    <select>

                    </select>
                </label>
                <label>
                    Ingredients Quantity
                    Please format the quantity of each ingredients in the following way. Please capitalize the name of the ingredient. This is how the ingredients list will be displayed. Here is an example.
                        1 cup Milk
                        3 Eggs
                        12 oz Chocolate Chips
                        1 1/2 Tbsp Baking Powder
                        <textarea name="ingredientQuantity"></textarea>      
                </label>
                <label>
                    UPC Value Location on Kroger.com
                    Please specify each ingredient in a seperate line. Please include the Kroger UPC value from the stpre website.
                    <textarea name="upcValue"></textarea>      
                </label>
                <label>
                    Estimated Ingredients Cost
                    Based off the list of Ingredients on the Kroger website, What is the total estimated cost for this recipe with two decimals? Please DO NOT include dollar signs or any other characters.
                        Example 1: 20.50
                        Example 2: 10.00
                    <textarea name="ingredientCost"></textarea>      
                </label>
                <label>
                    Recipe Appliances needed
                    Please select all the appliances needed for this recipe. If there is an applying you think should be added, feel free to let us know!
                    <select>

                    </select>
                </label>
                <label>
                    Recipe Instructions 
                    Please end each step with a '.' (full stop). Each step should go in a separate line.
                        Example: 
                        Preheat oven to 350 F.
                        Add milk, eggs, and oil to a large bowl.
                        Combine wet and dry ingredients.
                    <select>
                        
                    </select>
                </label>
                <label>
                    How many servings does this meal generate?
                    <select>

                    </select>
                </label>
                <input className='submit' type="submit" value="Submit" />
            </form>
            </div>
            
        </div>
        
    )
    
}

export default RecipeForm;