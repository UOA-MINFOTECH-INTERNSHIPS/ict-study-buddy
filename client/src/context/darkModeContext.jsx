import React from "react";
import { createContext, useEffect, useState } from "react";

// Create a context for managing dark mode settings
export const DarkModeContext = createContext();

// Create a context provider component for dark mode settings
export const DarkModeContextProvider = ({ children }) => {
  // State to store the current dark mode setting, defaulting to false
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Function to toggle dark mode on or off
  const toggle = () => {
    setDarkMode(!darkMode);
  };

  // Use an effect to persist dark mode setting in local storage when it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Return the context provider that provides darkMode and toggle function
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children} {/* Render child components wrapped by this provider */}
    </DarkModeContext.Provider>
  );
};
