import React, { useState } from 'react';
import './Settings.css';

function Settings() {
    const [selectedSetting, setSelectedSetting] = useState('Manage My Account');
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({ major: 'Computer Science' });
    const [darkMode, setDarkMode] = useState(false);

    const handleSettingClick = (setting) => {
        setSelectedSetting(setting);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = () => {
        setIsEditable(false);
        alert('Save Successfully!');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`settings-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="settings-list">
                <div
                    className={`settings-item ${selectedSetting === 'Manage My Account' ? 'selected' : ''}`}
                    onClick={() => handleSettingClick('Manage My Account')}
                >
                    Manage My Account
                </div>
                <div
                    className={`settings-item ${selectedSetting === 'Preference' ? 'selected' : ''}`}
                    onClick={() => handleSettingClick('Preference')}
                >
                    Preference
                </div>
                <div
                    className={`settings-item ${selectedSetting === 'Blocked Users' ? 'selected' : ''}`}
                    onClick={() => handleSettingClick('Blocked Users')}
                >
                    Blocked Users
                </div>

            </div>
            <div className="settings-area">
                {selectedSetting === 'Manage My Account' && (
                    <div>
                        <div className="form-header">Account Information</div>
                        <form>
                            <form>
                                <div className="form-row">
                                    <label>Firstname: </label>
                                    <input type="text" name="firstname" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Lastname: </label>
                                    <input type="text" name="lastname" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Username: </label>
                                    <input type="text" name="username" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Birthday: </label>
                                    <input type="date" name="birthday" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Phone Number: </label>
                                    <input type="tel" name="phoneNumber" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Email: </label>
                                    <input type="email" name="email" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Address: </label>
                                    <input type="text" placeholder="Street" name="street" disabled={!isEditable} />
                                    <input type="text" placeholder="City" name="city" disabled={!isEditable} />
                                    <input type="text" placeholder="State" name="state" disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Overview: </label>
                                    <textarea name="overview" disabled={!isEditable}></textarea>
                                </div>
                                <div className="form-row">
                                    <label>Roles: </label>
                                    <input type="checkbox" name="role" value="undergraduate" disabled={!isEditable} /> Undergraduate
                                    <input type="checkbox" name="role" value="postgraduate" disabled={!isEditable} /> Postgraduate
                                    <input type="checkbox" name="role" value="international" disabled={!isEditable} /> International Student
                                </div>
                                <div className="form-row">
                                    <label>Major: </label>
                                    <select name="major" onChange={handleInputChange} disabled={!isEditable}>
                                        <option value="--Select Your Major--">--Select Your Major--</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Information System">Information System</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                    </select>
                                </div>
                            </form>

                        </form>
                        <button onClick={handleEdit} disabled={isEditable}>Edit</button>
                        <button onClick={handleSave} disabled={!isEditable}>Save</button>
                    </div>
                )}


                {selectedSetting === 'Preference' && (
                    <div>
                        <div className="form-header">Preference</div>
                        <form className="settings-form">
                            <div className="form-row">
                                <div>Community</div> <div>Who can contact me</div>
                                <select disabled={!isEditable}>
                                    <option>Everybody</option>
                                    <option>No one</option>
                                    <option>Only my friends</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div>Language</div> <div>My native language is</div>
                                <select disabled={!isEditable}>
                                    <option>English</option>
                                    <option>Chinese</option>
                                    <option>French</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div>Newsletter</div>
                                <input type="checkbox" disabled={!isEditable} />
                                <span>I would like to receive our newsletter.</span>
                            </div>
                            <div className="form-row">
                                <div>Notifications</div>
                                <input type="checkbox" disabled={!isEditable} />
                                <span>I would like to receive new messages.</span>
                            </div>
                            <div className="form-row">
                                <label>Dark Mode</label>
                                <input type="checkbox" onChange={toggleDarkMode} />
                            </div>
                        </form>
                        <button onClick={handleEdit} disabled={isEditable}>Edit</button>
                        <button onClick={handleSave} disabled={!isEditable}>Save</button>
                    </div>
                )}




                {selectedSetting === 'Blocked Users' && (
                    <div>
                        <div className="form-header">Blocked Users</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;
