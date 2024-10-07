import React, { createContext, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./theme.css"; // Import your custom CSS

// Create a context to manage theme
const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "dark-mode" : "light-mode"}>{children}</div>
    </ThemeContext.Provider>
  );
};
