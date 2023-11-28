// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin } ) => {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:80/nutrition-user/login', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
//         },
//       }
//       );

//       const data = await response.json();
//       console.log('Success: ', data);
//       // Do something with the successful response data

//       onLogin();

//     } catch (error) {
//       console.log(error);
//       // Handle any errors that occurred during the fetch or processing of the response
//     }
//   }; // <- Add a closing parenthesis here

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin} className="login-form">
//         <div>
//           <label htmlFor="username">Username:</label> <br />
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={loginData.username}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label> <br />
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={loginData.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit" className="login-button" onClick={handleLogin}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Use useNavigate to get the navigation function
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:80/nutrition-user/login', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
        },
      });

      const data = await response.json();
      if (response.ok){
      console.log('Success: ', data);

      // Call onLogin when authentication is successful
      onLogin();
      
      // Redirect to the desired route (e.g., /RecipeForm)
      navigate('/AllRecipes');
      } else {
        console.error(
          'Failed to log in:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log('Error logging in: ', error);
      // Handle any errors that occurred during the fetch or processing of the response
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label htmlFor="username">Username:</label> <br />
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

