import { useEffect, useState } from "react";
import "./chatOnline.scss";
import { makeRequest } from "../../axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]); // State to store the user's friends.
  const [onlineFriends, setOnlineFriends] = useState([]); // State to store online friends.
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    // Function to fetch the user's friends from the server.
    const getFriends = async () => {
      const res = await makeRequest.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends(); // Call the getFriends function when the component mounts or 'currentId' changes.
  }, [currentId]);

  useEffect(() => {
    // Filter friends to find online friends based on the 'onlineUsers' array.
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      // Get or create a conversation between the current user and the selected user.
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
          <span className="chatOnlineName">{o?.userName}</span>
        </div>
      ))}
    </div>
  );
}
