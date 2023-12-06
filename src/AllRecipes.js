import React, { useState, useEffect } from 'react';
import './AllRecipes.css';
import { Link } from 'react-router-dom';
import axios from './api/axios';
import NavBar from './components/NavBar';

const AllRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchClicked, setSearchClicked] = useState(false); 


  const fetchAllRecipes = () => {
    axios.get('/recipes')
      .then(response => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setRecipes(data.data);
        } else {
          console.error('Data received does not contain an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setSearchClicked(true); // Assuming you still want to display the banner after typing
  };

  const renderNoMatchesBanner = () => {
    if (searchClicked && searchQuery && searchResults.length === 0) {
      return (
        <div className="no-matches-banner">
          No matches found for "{searchQuery}".
        </div>
      );
    }
    return null;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = searchQuery ? searchResults.slice(indexOfFirstItem, indexOfLastItem) : recipes.slice(indexOfFirstItem, indexOfLastItem);


  const renderTableData = () => {
    const dataToRender = searchQuery ? searchResults : recipes;
    const currentRecipes = dataToRender.slice(indexOfFirstItem, indexOfLastItem);
    return currentRecipes.map((recipe) => {
      const { recipeId, title, status, recipeOwner } = recipe;
      return (
        <tr key={recipeId}>
          <td>
            <Link to={`/recipe/${recipe.recipeId}`}>{title}</Link>
          </td>
          <td>{recipe?.status}</td>
          <td>{recipeOwner?.email}</td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    const dataToRender = searchQuery ? searchResults : recipes;
    if (dataToRender.length === 0) {
      return null;
    }
    return (
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Recipe Owner</th>
      </tr>
    );
  };

  const totalPages = Math.ceil((searchQuery ? searchResults.length : recipes.length) / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='AllRecipes-Container'>
      <NavBar />
      <div className='container'>
        <h1 id='title'>All Recipe Table</h1>
        <div className='search-container'>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='noMatch'>{renderNoMatchesBanner()}</div>
        <table id='recipes'>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className='prev-button'>Prev</button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className='next-button'>Next</button>
      </div>
      </div>
    </div>
  );
};

export default AllRecipes;
