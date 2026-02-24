import { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("access"))

    // Restore from localStorage on reload
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("access");
        if (storedUser) {
            setUser(storedUser);
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData, accessToken) => {
        localStorage.setItem("access", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setIsLoggedIn(true);
        setToken(accessToken);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setToken(null)
        localStorage.removeItem("user");
        localStorage.removeItem("access");
    };

    return (
        <LoginContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
