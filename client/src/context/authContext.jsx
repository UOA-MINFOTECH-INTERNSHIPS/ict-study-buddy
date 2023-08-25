import { createContext, useEffect, useState } from "react";
import React from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Jenny chen",
      profilePic:
        "https://images.pexels.com/photos/16943679/pexels-photo-16943679/free-photo-of-ranti-marsyanda-chandri-anggara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
