import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { io } from "socket.io-client";
import { makeRequest } from "../../axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest.get("/conversations/" + currentUser._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await makeRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Send the file to the server using a POST request
        const response = await makeRequest.post("/upload", formData);
        if (response.status === 200) {
          const fileData = await response.data;
          // console.log("fileData", fileData);
          const messageText = `File: ${fileData.name}, URL: ${fileData.url}`;
          const message = {
            sender: currentUser._id,
            conversationId: currentChat._id,
            text: messageText,
          };

          const receiverId = currentChat.members.find(
            (member) => member !== currentUser._id
          );

          // Send the message to the server
          socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId,
            text: messageText,
          });
          try {
            const res = await makeRequest.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
          } catch (err) {
            console.log(err);
          }
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      // Handle the case where no file is selected
      console.error("No file selected for upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await makeRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c, index) => (
              <div onClick={() => setCurrentChat(c)} key={index}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message message={m} own={m.sender === currentUser._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>

                  <div className="item">
                    <input
                      type="file"
                      id="fileInput"
                      className="fileUpload"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <label htmlFor="fileInput">
                      <InsertPhotoIcon />
                    </label>
                    <button onClick={handleUpload}>Upload File</button>
                  </div>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={currentUser._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
