import { createContext, useState } from "react";
import axios from "axios";
import { makeRequest } from "../axios";

// Create a context for managing search results
export const SearchContext = createContext();

// Create a context provider component for search functionality
export const SearchContextProvider = ({ children }) => {
  // State to store the search results, initialized as null
  const [result, setResult] = useState(null);

  // Function to perform a search based on a query
  const search = async (query) => {
    try {
      // Send requests to search for both posts and users
      const [postsResponse, usersResponse] = await axios.all([
        makeRequest.get(`/search/posts?query=${query}`),
        makeRequest.get(`/search/users?query=${query}`),
      ]);

      // Extract data from the responses
      const postsData = postsResponse.data;
      const usersData = usersResponse.data;

      // Set the search results with posts and users
      setResult({ posts: postsData, users: usersData });
    } catch (error) {
      console.error(error);
    }
  };

  // Return the context provider that provides search results and the search function
  return (
    <SearchContext.Provider value={{ result, search }}>
      {children} {/* Render child components wrapped by this provider */}
    </SearchContext.Provider>
  );
};
