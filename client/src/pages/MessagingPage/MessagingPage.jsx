import React from 'react';
import { useState } from 'react';
import ChatArea from './ChatArea';
import FriendsList from './FriendsList';
import './MessagingPage.scss';


function MessagingPage({ onSelectFriend }) {

    return (
        <div className='messageBoxMain'>
            <div className="messageBox">
                <div className='friendBox'>
                    <FriendsList/>
                </div>
                <div className='chatBox'>
                    <ChatArea/>
                </div>
            </div>
        </div>
        
    );
}



export default MessagingPage;
