import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false };
    });

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (auth.accessToken) {
                const decodedToken = jwtDecode(auth.accessToken);
                const currentTime = Date.now() / 1000; // Convert to seconds

                if (decodedToken.exp < currentTime && auth.isAuthenticated) {
                    // Token has expired, update authentication state
                    setAuth(prevAuth => ({ ...prevAuth, isAuthenticated: false }));
                }
            }
        };

        // Save auth state to localStorage whenever it changes
        localStorage.setItem('auth', JSON.stringify(auth));

        // Check token expiration when the component mounts
        checkTokenExpiration();

        // Set up an interval to check token expiration periodically
        const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [auth]); // Include auth as a dependency

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
