import "./navbar.scss";
import * as React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import photo from "../../assets/register-background-pic.jpg";

function NavBar(props) {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Study Buddy</span>
        </Link>
        <HomeOutlinedIcon />

        <WbSunnyOutlinedIcon style={{ cursor: "pointer" }} />

        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <MessageOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={photo} />
          <span>Jenny</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
