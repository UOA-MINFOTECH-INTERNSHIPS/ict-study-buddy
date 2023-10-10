import { createContext, useState } from "react";
import axios from "axios"; 
import { makeRequest } from "../axios";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  const search = async (query) => {
    try {
      const [postsResponse, usersResponse] = await axios.all([
        makeRequest.get(`/search/posts?query=${query}`),
        makeRequest.get(`/search/users?query=${query}`),
      ]);

      const postsData = postsResponse.data;
      const usersData = usersResponse.data;

      setResult({ posts: postsData, users: usersData });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SearchContext.Provider value={{ result, search }}>
      {children}
    </SearchContext.Provider>
  );
};
