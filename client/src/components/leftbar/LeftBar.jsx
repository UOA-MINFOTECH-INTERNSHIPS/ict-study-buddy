import "./leftbar.scss";
import * as React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupIcon from "@mui/icons-material/Group";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";

function LeftBar(props) {

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <PersonOutlinedIcon />
            <span>Jenny</span>
          </div>
          <div className="item">
            <GroupIcon />
            <span>Groups</span>
          </div>
          <div className="item">
            <TextSnippetIcon />
            <span>Notes</span>
          </div>
          <div className="item">
            <AddToDriveIcon />
            <span>Resources</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default LeftBar;
