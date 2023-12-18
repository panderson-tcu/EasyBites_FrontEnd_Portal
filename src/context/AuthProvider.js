import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=>{
        const storedAuth = localStorage.getItem('auth');
        // return storedAuth ? JSON.parse(storedAuth) : {};
        return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false };
    });
    
    useEffect(() => {
        // Save auth state to localStorage whenever it changes
        localStorage.setItem('auth', JSON.stringify(auth));
      }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;