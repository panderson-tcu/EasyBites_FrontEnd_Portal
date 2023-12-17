// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import RecipeForm from './RecipeForm.js';
import AllRecipes from './AllRecipes.js';
import UserRecipes from './UserRecipes.js';
import ManageStudents from './ManageStudents.js';
import Login from './Login';
import ViewStudents from './ViewStudents.js';
import RecipeDetails from './RecipeDetail.js';
import EditRecipe from './EditRecipe.js';
import { AuthProvider, useAuth } from './context/AuthProvider.js'; // Import useAuth
import ViewUserRecipes from './ViewUserRecipes.js';

const PrivateRoute = ({ element }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const { auth } = useAuth(); // Use useAuth to access authentication state

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
  
          {/* Use PrivateRoute for protected routes */}
          <Route 
            path='/' 
            element={<PrivateRoute element={<AllRecipes/>}/>}
          />
          <Route
            path='/AllRecipes'
            element={<PrivateRoute element={<AllRecipes />} />}
          />
          <Route
            path='/RecipeForm'
            element={<PrivateRoute element={<RecipeForm />} />}
          />
          <Route
            path='/ManageStudents'
            element={<PrivateRoute element={<ManageStudents />} />}
          />
          <Route
            path='/UserRecipes'
            element={<PrivateRoute element={<UserRecipes />} />}
          />
          <Route
            path='/ViewStudents'
            element={<PrivateRoute element={<ViewStudents />} />}
          />
          <Route
            path='/recipe/:recipeId'
            element={<PrivateRoute element={<RecipeDetails />} />}
          />
          <Route
            path='/recipe/:recipeId/edit'
            element={<PrivateRoute element={<EditRecipe />} />}
          />
          <Route
            path='/student/:nutritionUserId'
            element={<PrivateRoute element={<ViewUserRecipes />} />}
          />
          {/* Fallback route in case none of the above match */}
          <Route path='/' element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
