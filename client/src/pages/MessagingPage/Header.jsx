import React from 'react';
import { Link } from 'react-router-dom';  
import './MessagingPage.css';

function Header() {
    return (
        <div className="header">
            <span>Study Buddy</span>
            <div>
                <a href="community.html">
                    <img src="./community.png" alt="Community Icon" /> Community
                </a>
                <Link to="/">
                    <img src="./message.png" alt="Message Icon" /> Messages
                </Link>
                <Link to="/settings">
                    <img src="./setting.png" alt="Settings Icon" /> Settings
                </Link>
            </div>
        </div>
    );
}

export default Header;
