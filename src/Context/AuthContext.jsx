import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true); 
        }
    }, []);

    const login = (email) => {
        localStorage.setItem("user", email);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("user"); // 
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}> 
            {children} 
        </AuthContext.Provider>
    );
};

export default AuthContext;
