import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { SearchContext } from "../../context/searchContext";

function NavBar() {
  // Get the dark mode state and toggle function from context
  const { toggle, darkMode } = useContext(DarkModeContext);

  // Get the current user's information from context
  const { currentUser } = useContext(AuthContext);

  // Get the search function from context
  const { search } = useContext(SearchContext);

  // Define a state to store the search query
  const [query, setQuery] = useState("");

  // Get the router's navigation function
  const navigate = useNavigate();

  // Define a function to handle search
  const handleSearch = async () => {
    // Check if the search query is empty
    if (query.trim() === "") {
      return;
    }

    try {
      // Call the search function with the query
      await search(query);
      // Navigate to the search results page with the query
      navigate(`/search/${query}`);
      // Clear the search query input
      setQuery("");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Define a function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Add an event listener for key presses
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Study Buddy</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HomeOutlinedIcon className="items" />
        </Link>
        {darkMode ? (
          <DarkModeOutlinedIcon onClick={toggle} />
        ) : (
          <WbSunnyOutlinedIcon onClick={toggle} />
        )}

        <GridViewOutlinedIcon />
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <SearchOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="right">
        <Link to={"/settings"}>
          <PersonOutlinedIcon className="items" />
        </Link>
        <Link to="/messenger">
          <MessageOutlinedIcon className="items" />
        </Link>
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} />
          <span>{currentUser.userName}</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
