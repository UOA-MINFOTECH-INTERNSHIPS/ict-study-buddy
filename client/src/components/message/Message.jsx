import "./message.css";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

export default function Message({ message, own }) {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null); // State to store user data
  const [userAvatar, setUserAvatar] = useState(null); // State to store user's avatar URL

  useEffect(() => {
    async function getUser() {
      try {
        // Fetch user data based on the sender's ID
        const response = await makeRequest.get(`/users/${message.sender}`);
        setUser(response.data);

        // Preload or cache the sender's avatar
        const senderAvatar = new Image();
        senderAvatar.src = response.data.profilePic;
        senderAvatar.onload = () => {
          // Once the avatar is loaded, update the state
          setUserAvatar(senderAvatar.src);
        };
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUser();
  }, [message.sender]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? currentUser?.profilePic : userAvatar || ""}
          alt=""
        />
        {message.text.startsWith("File: ") ? (
          <div className="messageText">
            <a
              href={`${message.text.split("URL: ")[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fileUrl"
            >
              {message.text.substring(6, message.text.indexOf(", URL: "))}
            </a>
          </div>
        ) : (
          <p className="messageText">{message.text}</p>
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
