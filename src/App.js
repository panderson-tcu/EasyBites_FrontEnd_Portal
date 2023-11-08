import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './RecipeForm.js';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' exact /> 
        <Route path='/RecipeForm' element={<RecipeForm/>} /> 
      </Routes>

    </Router>
    </>
  );
}

export default App;
