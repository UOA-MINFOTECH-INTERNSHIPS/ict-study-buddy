import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/RightBar";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";

function Profile(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="left">
        <div className="profileContainer">
          <div className="images">
            <img
              src={
                "https://images.pexels.com/photos/5169050/pexels-photo-5169050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt=""
              className="cover"
            />
            <img
              src={
                "https://images.pexels.com/photos/16943679/pexels-photo-16943679/free-photo-of-ranti-marsyanda-chandri-anggara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt=""
              className="profilePic"
            />
          </div>
          <div className="uInfo">
            <div className="uInfoLeft">
              <div className="userName">{currentUser.name}</div>
              <div className="userDesc">
                Final year postgraduate student at Information Technology
              </div>
              <div className="major">Master of Information Technology</div>
            </div>
            <div className="uInfoRight">
              <div className="items">
                <div className="item">
                  <div className="count">100</div>
                  <span>Followings</span>
                </div>
                <div className="item">
                  <div className="count">102</div>
                  <span>Followers</span>
                </div>
                <div className="item">
                  <div className="count">102</div>
                  <span>Posts</span>
                </div>
              </div>
                <div className="connect">
                  <button className="follow">Follow</button>
                  <button className="message">Message</button>
                </div>
            </div>
          </div>
        </div>
        <Posts />
      </div>
      <RightBar />
    </div>
  );
}

export default Profile;
