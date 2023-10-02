import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import { makeRequest } from "../../axios";


export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await makeRequest(`/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePic
            ? user.profilePic
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
