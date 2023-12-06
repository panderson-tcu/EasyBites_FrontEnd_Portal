import React from 'react';
import './NavBar.css';
import SmallLogo from '../images/SmallLogo.png';
import {AuthContext, useAuth} from  '../context/AuthProvider';

function NavBar() {
  const { auth, setAuth } = useAuth()
  const config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };
    const isAdmin = auth && auth.roles === 'admin';

  return (
        <div className='Container'>
        <img src={SmallLogo} alt="SmallLogo"  style={{ width: '150px', height: '105px', margin: ' 10px 0 50px 0' }}/>
          <ul>
            <li><a href="/AllRecipes">All Recipes</a></li>
            <li><a href="/UserRecipes">My Recipes</a></li>
            <li><a href="/RecipeForm">Add Recipe</a></li>
            {isAdmin && (
              <li><a href="/ManageStudents">Manage Students</a></li>
            )}
          </ul>
          <h3 className='userName'>{auth.name}</h3>
        </div>
  )
}

export default NavBar
