import React, { useState } from 'react';
import ChatArea from './ChatArea';
import FriendsList from './FriendsList';
import './messaging.scss';

function Messaging() {
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleSelectFriend = (friendName) => {
        setSelectedFriend(friendName);
    };

    return (
        <div className='messageBoxMain'>
            <div className="messageBox">
                <div className='friendBox'>
                    <FriendsList onSelectFriend={handleSelectFriend} />
                </div>
                <div className='chatBox'>
                    <ChatArea selectedFriend={selectedFriend} />
                </div>
            </div>
        </div>
    );
}

export default Messaging;

