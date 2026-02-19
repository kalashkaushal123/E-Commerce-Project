import React, { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
    themeMode: 'light',
    darkTheme: () => {},
    lightTheme: () => {}
});

export function ThemeProviderWrapper({ children }) {
    // const [themeMode, setThemeMode] = useState('light');

    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const root = document.documentElement; // <html>

        if (themeMode === 'dark') {
        root.classList.add('dark');
        } else {
        root.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem("theme", themeMode);
        
    }, [themeMode]);

    const darkTheme = () => setThemeMode('dark');
    const lightTheme = () => setThemeMode('light');

    return (
        <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default function useTheme() {
    return useContext(ThemeContext);
}
