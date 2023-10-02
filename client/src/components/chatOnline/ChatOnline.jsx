import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import { makeRequest } from "../../axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await makeRequest.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await makeRequest.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o, index) => (
        <div
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
          key={index}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profilePic ? o.profilePic : PF + "person/noAvatar.png"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}