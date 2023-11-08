import React, {useState} from 'react';
import './NavBar.css';

function NavBar() {
    const [click, setClick] = useState(false);
  return (
        <div className='Container'>
          <ul>
            <li><a href="/">All Recipe</a></li>
            <li><a href="/">My Recipe</a></li>
            <li><a href="/RecipeForm">Add Recipe</a></li>
            <li><a href="/">Manage Students</a></li>
          </ul>
        </div>
  )
}

export default NavBar
