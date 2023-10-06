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
  const { toggle, darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const { search } = useContext(SearchContext);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() === "") {
      return;
    }
    try {
      await search(query);
      navigate(`/search/${query}`);
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
