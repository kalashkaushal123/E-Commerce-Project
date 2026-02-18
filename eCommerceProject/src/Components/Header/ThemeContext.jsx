// import { createContext, useContext, useState, useEffect } from "react";

// export const ThemeContext = createContext({
//   themeMode: "light",
//   darkTheme: () => {},
//   lightTheme: () => {},
// });

// export const ThemeProvider = ThemeContext.Provider;

// export default function useTheme() {
//   return useContext(ThemeContext);
// }

// // Optional: Theme wrapper for App
// export function ThemeWrapper({ children }) {
//   const [themeMode, setThemeMode] = useState("light");

//   const darkTheme = () => setThemeMode("dark");
//   const lightTheme = () => setThemeMode("light");

//   useEffect(() => {
//     // console.log("Theme changed to:", themeMode);
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(themeMode);
//   }, [themeMode]);

//   return (
//     <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
//       {children}
//     </ThemeProvider>
//   );
// }


