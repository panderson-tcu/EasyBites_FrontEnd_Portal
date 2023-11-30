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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path='/login' 
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path='/'
          element={isLoggedIn ? <AllRecipes /> : <Navigate to="/login" />}
        />
        <Route path='/AllRecipes' element={<AllRecipes />} />
        <Route path='/RecipeForm' element={<RecipeForm />} />
        <Route path='/ManageStudents' element={<ManageStudents />} />
        <Route path='/UserRecipes' element={<UserRecipes />} />
        <Route path='/ViewStudents' element={<ViewStudents />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;


// //////////////////////////////////////////////////////////////////

// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
// import React, { useState } from 'react';
// import RecipeForm from './RecipeForm.js';
// import AllRecipes from './AllRecipes.js';
// import UserRecipes from './UserRecipes.js';
// import ManageStudents from './ManageStudents.js';
// import Login from './Login';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path='/login' 
//           element={<Login onLogin={handleLogin} />}
//         />
//         <Route
//           path='/'
//           element={isLoggedIn ? <AllRecipes /> : <Navigate to="/login" />}
//         />
//         <Route path='/RecipeForm' element={<RecipeForm />} />
//         <Route path='/AllRecipes' element={<AllRecipes />} />
//         <Route path='/ManageStudents' element={<ManageStudents />} />
//         <Route path='/UserRecipes' element={<UserRecipes />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

