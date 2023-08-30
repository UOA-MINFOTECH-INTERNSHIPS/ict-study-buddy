import React from 'react';
import { useState } from 'react';
import './MessagingPage.css';


function FriendsList({ onSelectFriend }) {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const handleFriendClick = (friendName) => {
        onSelectFriend(friendName);
        setSelectedFriend(friendName);
    };


    const friendsData = [
        {
            name: 'John Smith',
            avatar: './happy.png',
            lastMessage: 'Hey! How are you?',
            unreadMessages: 1,
            lastMessageTime: 'Mon'
        },
        {
            name: 'Lily Harrison',
            avatar: './happy.png',
            lastMessage: 'Nice to meet you!',
            unreadMessages: 2,
            lastMessageTime: '18/08'
        },
        {
            name: 'Group：COMPSCI732',
            avatar: './group.png',
            lastMessage: 'Hello！Everybody！',
            unreadMessages: 5,
            lastMessageTime: '17/08'
        },
        {
            name: 'Joshua Wong',
            avatar: './happy.png',
            lastMessage: 'Morning',
            unreadMessages: 2,
            lastMessageTime: '01/08'
        },
        {
            name: 'Group：COMPSCI701',
            avatar: './group.png',
            lastMessage: '',
            unreadMessages: 2,
            lastMessageTime: '20/07'
        },
        {
            name: 'Iris Lee',
            avatar: './happy.png',
            lastMessage: 'Morning',
            unreadMessages: 1,
            lastMessageTime: '01/06'
        }
    ];

    const people = [
        'John Smith',
        'Lily Harrison',
        'Group: COMPSCI732',
        'Joshua Wong',
        'Group: COMPSCI701',
        'Iris Lee'
    ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const showDropdown = () => {
        setDropdownVisible(true);
    };

    return (
        <div className="friends-list">
            <div className="friends-header">Conversations</div>

            <div className="search-box">
                <label htmlFor="friend-search">
                    <img src="./search.png" alt="Search Icon" />
                </label>
                <input id="friend-search" type="text" placeholder="Search for friends..." onInput={showDropdown} />
                {dropdownVisible && (
                    <div id="search-dropdown-menue" className="search-dropdown-menu">
                        {people.map((person, index) => (
                            <div key={index} className="search-dropdown-item">
                                {person}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="friend-area">
                {friendsData.map(friend => (
                    <div
                        className={`friend-item ${friend.name === selectedFriend ? 'selected' : ''}`}
                        key={friend.name}
                        onClick={() => handleFriendClick(friend.name)}
                    >
                        <img src={friend.avatar} alt="Friend Avatar" className="friend-avatar" />
                        <div className="friend-details">
                            <div className="friend-name">{friend.name}</div>
                            <div className="friend-last-message">{friend.lastMessage}</div>
                        </div>
                        <div className="friend-info">
                            <div className="unread-messages">{friend.unreadMessages}</div>
                            <div className="last-message-time">{friend.lastMessageTime}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}



export default FriendsList;
