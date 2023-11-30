import React, {useState} from 'react';
import './NavBar.css';
import SmallLogo from '../images/SmallLogo.png';

function NavBar() {
    const [click, setClick] = useState(false);
  return (
        <div className='Container'>
        <img src={SmallLogo} alt="SmallLogo"  style={{ width: '100px', height: '70px', margin: ' 10px 0 50px 0' }}/>
          <ul>
            <li><a href="/AllRecipes">All Recipe</a></li>
            <li><a href="/UserRecipes">My Recipe</a></li>
            <li><a href="/RecipeForm">Add Recipe</a></li>
            <li><a href="/ManageStudents">Manage Students</a></li>
          </ul>
        </div>
  )
}

export default NavBar
