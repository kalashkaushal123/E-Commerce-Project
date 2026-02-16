import { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null)

    // Restore from localStorage on reload
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData, accessToken) => {
        setUser(userData);
        setIsLoggedIn(true);
        setToken(accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setToken(null)
        localStorage.removeItem("user");
    };

    return (
        <LoginContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
