import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './RecipeForm.js';
import AllRecipes from './AllRecipes.js';
import UserRecipes from './UserRecipes.js';
import ManageStudents from './ManageStudents.js';
import Login from './Login';


function App() {
  return (
    <>
    <div className=''>
    <Login />
    </div>
    <Router>
      <Routes>
        <Route path='/' exact /> 
        <Route path='/RecipeForm' element={<RecipeForm/>} /> 
        <Route path='/AllRecipes' element={<AllRecipes/>} /> 
        <Route path='/ManageStudents' element={<ManageStudents/>} /> 
        <Route path='/UserRecipes' element={<UserRecipes/>} /> 
      </Routes>

    </Router>
    </>
  );
}

export default App;
