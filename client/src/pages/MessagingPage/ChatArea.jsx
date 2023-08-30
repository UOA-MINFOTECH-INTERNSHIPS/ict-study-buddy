import React, { useState } from 'react';
import './MessagingPage.scss';


function ChatArea({ selectedFriend }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const [menuActive, setMenuActive] = useState(false);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSend = () => {
        setMessages([...messages, { text: inputMessage, align: 'right' }]);
        setInputMessage('');
    };


    const [isBlocked, setIsBlocked] = useState(false);
    const [showGroupInfo, setShowGroupInfoPopup] = useState(false);


    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleMouseLeave = () => {
        setMenuActive(false);
    };

    const blockUser = () => {
        setIsBlocked(true);
    };

    const handleSeeProfileClick = () => {
        setShowGroupInfoPopup(true); 
    };

    const handleClosePopup = () => {
        setShowGroupInfoPopup(false); 
    };


    return (
        <div className="chat-area">
            <div className="chat-person">
                <div className="chat-person-left">
                    <img className="chat-person-avatar" src="./group.png" alt="Friend Avatar" />
                    <div className="chat-person-details">
                    {selectedFriend}
                    </div>
                </div>

                <div className="mid-section">
                    <div className="chat-person-status">
                        Online
                    </div>
                    <div className="chat-person-time">
                        17/08/2023 12:34 PM
                    </div>
                </div>

                <div className="right-section">
                    <div className="chat-person-menu">
                        <button className="menu-button" onClick={toggleMenu}>
                            <img src="./more.png" alt="Menu" />
                        </button>
                        <div className={`dropdown-menu ${menuActive ? 'active' : ''}`} onMouseLeave={handleMouseLeave}>
                            <div className="menu-item" onClick={blockUser}>
                                <img src="./block.png" alt="Block" /> Block Chat
                            </div>

                            <div className="menu-item" onClick={handleSeeProfileClick}>
                                <img src="./seeprofile.png" alt="Profile" /> See Profile

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={`chat-messages ${isBlocked ? 'blocked' : ''}`}>
                {/* Chat messages will appear here */}
                {messages.map((message, index) => (
                    <div key={index} className={`message-box ${message.align}`}>
                        {message.text}
                    </div>
                ))}

                {isBlocked && <div className="block-notice">This user is blocked.</div>}
                {showGroupInfo && (
                    <div className="group-info-popup">
                        {/* Group Information Title */}
                        <div className="group-info-title">
                            Group Information
                        </div>

                        {/* Avatar and Group Name */}
                        <div className="group-info-header">
                            <img className="group-avatar" src="./group.png" alt="Group Avatar" />
                            <div className="group-name">
                                Group：COMPSCI732
                            </div>
                        </div>

                        {/* Participants */}
                        <div className="group-participants">
                            <div className="participants-title">
                                Participants
                            </div>
                            <div className="participants-list">
                                Alice, Bob, Carol, ...50+
                            </div>
                        </div>

                        {/* Group Settings */}
                        <div className="group-settings">
                            <div className="settings-title">
                                Group Settings
                            </div>
                            <div className="settings-options">
                                <label>
                                    Pinned
                                    <input type="checkbox" />
                                </label>
                                <label>
                                    Notifications
                                    <input type="checkbox" />
                                </label>
                            </div>
                        </div>

                        {/* Exit Group Button */}
                        <div className="exit-group">
                            <button className="exit-group-btn">
                                Exit Group
                            </button>
                        </div>

                        {/* Close Button */}
                        <button className="close-popup-btn" onClick={handleClosePopup}>X</button>
                    </div>
                )}


            </div>

            <div className={`chat-input ${isBlocked ? 'disabled-input' : ''}`}>
                <label htmlFor="emoji">
                    <img src="./happy.png" alt="Send emoji" />
                </label>
                <input id="emoji" type="file" style={{ display: 'none' }} />

                <label htmlFor="file-input">
                    <img src="./file_upload.png" alt="File Icon" />
                </label>
                <input id="file-input" type="file" style={{ display: 'none' }} />

                <textarea
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={handleInputChange}
                ></textarea>

                <button className="send_message" onClick={handleSend}>
                    <img src="./send.png" alt="Send" />
                </button>
            </div>

        </div>
    );
}

export default ChatArea;
