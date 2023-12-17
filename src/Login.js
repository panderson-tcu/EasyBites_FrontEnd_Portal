import { useRef, useState, useEffect, useContext } from 'react';
import './Login.css'
import AuthContext from './context/AuthProvider';
import axios from './api/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FullLogo from './images/FullLogo.png';
import { AuthProvider } from './context/AuthProvider';


const LOGIN_URL = '/nutrition-user/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  // Use useNavigate to get the navigation function
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

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

      console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = JSON.stringify(response?.data?.data?.token).replace(/["']/g, '');
      // console.log("printing access token")
      // console.log(JSON.stringify(response?.data?.data?.token))
      const roles = response?.data?.data?.userInfo?.adminLevel;
      const id = response?.data?.data?.userInfo?.nutritionUserId;
      const name = response?.data?.data?.userInfo?.firstName + ' ' + response?.data?.data?.userInfo?.lastName;
      console.log("Nutrition student id" + id)

      setAuth({ user, roles, id, accessToken, name, isAuthenticated: true });
      setUser('');
      setPwd('');
      setSuccess(true);
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
    <AuthProvider>
    <>
      {success ? (
        navigate('/AllRecipes')
      ) : (
      <div className="login-container">
        <img src={FullLogo} alt="FullLogo" style={{ width: '200px', height: '200px' }}/>
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
        )}
    </>   
    </AuthProvider> 
  )
}

export default Login

