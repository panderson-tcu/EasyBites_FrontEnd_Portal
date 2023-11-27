import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Navigate
import React, { useState } from 'react';
import RecipeForm from './RecipeForm.js';
import AllRecipes from './AllRecipes.js';
import UserRecipes from './UserRecipes.js';
import ManageStudents from './ManageStudents.js';
import Login from './Login';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          // element={isLoggedIn ? <UserRecipes /> : <Navigate to="/login" />} // Use Navigate
        />
        <Route path='/RecipeForm' element={<RecipeForm />} />
        <Route path='/AllRecipes' element={<AllRecipes />} />
        <Route path='/ManageStudents' element={<ManageStudents />} />
        <Route path='/UserRecipes' element={<UserRecipes />} />
      </Routes>
    </Router>
  );
};

export default App;
