import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

// Create a context for managing user authentication data
export const AuthContext = createContext();

// Create a context provider component for user authentication
export const AuthContextProvider = ({ children }) => {
  // State to store the current user's data
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to log in a user
  const login = async (user) => {
    // Make a POST request to the login endpoint with user credentials
    const res = await makeRequest.post("/auth/login", user, {
      withCredentials: true, // Include credentials such as cookies
    });

    // Set the current user's data based on the response data
    setCurrentUser(res.data);
  };

  // Use an effect to persist user data in local storage when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Return the context provider that provides currentUser and login function
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children} {/* Render child components wrapped by this provider */}
    </AuthContext.Provider>
  );
};
