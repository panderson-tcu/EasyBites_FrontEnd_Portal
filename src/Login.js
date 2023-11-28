import { useRef, useState, useEffect } from 'react';
import './Login.css'
import axios from './api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import AllRecipes from './AllRecipes';
import useAuth from './hooks/useAuth';



const LOGIN_URL = '/nutrition-user/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/AllRecipes"; //get where user came from or AllRecipes which is default home page

  const userRef = useRef();
  const errRef = useRef();
    // Use useNavigate to get the navigation function

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  useEffect(() => {
    userRef.current.focus();
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {}, 
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${user}:${pwd}`),
          }
        }
      );
      console.log('response ' + JSON.stringify(response?.data));

      const accessToken = response?.data?.data?.token;
      const adminLevel = response?.data?.data?.userInfo?.adminLevel;
      const roles = adminLevel ? [adminLevel] : [];

      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true }); 
    } catch (err) {
        if(!err?.response) {
          setErrMsg('No server response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing username or password');
        } else if (err.response?.status === 401) {
          setErrMsg('Username or password are incorrect.');
        } else {
          setErrMsg('Login failed');
        }
        errRef.current.focus();
    }
  }
  
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
            ref={userRef}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    </div>
  )
}

export default Login


// import React, {useRef, useState, useEffect } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Login = ({ onLogin }) => {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//   });

//   // Use useNavigate to get the navigation function
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:80/nutrition-user/login', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
//         },
//       });

//       const data = await response.json();
//       if (response.ok){
//       console.log('Success: ', data);

//       // Call onLogin when authentication is successful
//       onLogin();
      
//       // Redirect to the desired route (e.g., /RecipeForm)
//       navigate('/AllRecipes');
//       } else {
//         console.error(
//           'Failed to log in:',
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.log('Error logging in: ', error);
//       // Handle any errors that occurred during the fetch or processing of the response
//     }
//   };

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
//         <button type="submit" className="login-button">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

