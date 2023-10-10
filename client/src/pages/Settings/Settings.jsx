import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { DarkModeContext } from "../../context/darkModeContext";
import groupIcon from '../../assets/group.png';
import photo from "../../assets/register-background-pic.jpg";
import { notification} from 'antd';

import './settings.scss';

function Settings() {
    const [selectedSetting, setSelectedSetting] = useState('Manage My Account');
    const [isEditable, setIsEditable] = useState(true);
    const [formData, setFormData] = useState({ major: 'Computer Science' });
    const [darkMode, setDarkMode] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [blockedUsersList,setBlockedUsersList]=useState([]);
    const [blockedUsers,setBlockedUsers]=useState([]);
    const [setting,setSetting]=useState({});
    
    const [id,setId]=useState("");
    const [uid,setUid]=useState("");
    const [firstname,setFirstName]=useState("");
    const [lastname,setLastname]=useState("");
    const [username,setUsername]=useState("");
    const [birthday,setBirthday]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [email,setEmail]=useState("");
    const [street,setStreet]=useState("");
    const [city,setCity]=useState("");
    const [state,setState]=useState("");
    const [overview,setOverview]=useState("");
    const [roles,setRoles]=useState([]);
    const [major,setMajor]=useState("");
    const [communityPreference,setCommunityPreference]=useState("");
    const [nativeLanguage,setNativeLanguage]=useState("");
    const [receiveNewsletter,setReceiveNewsletter]=useState(false);
    const [receiveNotifications,setReceiveNotifications]=useState(false);

    const handleSettingClick = (setting) => {
        setSelectedSetting(setting);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const openNotificationWithIcon = (type,title,text) => {
        notification[type]({
          message: title,
          description:text,
        });
    };
    

    const preferenceSave = () => {
        var data={
            "communityPreference":communityPreference,
            "nativeLanguage":nativeLanguage,
            "receiveNewsletter":receiveNewsletter,
            "receiveNotifications":receiveNotifications,
            "darkMode":darkMode
        };
        axios.put(`http://localhost:3000/api/set/${setting._id}`, data)
        .then(response => {
            localStorage.setItem("darkMode", darkMode);
            openNotificationWithIcon("success",'tips ','Save Successfully(The darkMode takes effect when the page is refreshed)!');
            setIsEditable(true);
            getOnload();
        })
        .catch(error => {
            console.error('There was an error updating the settings:', error);
        });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const getOnload=async()=>{
        var user=JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        axios.get(`http://localhost:3000/api/set/${userId}`)
            .then(response => {
                console.log(response.data);
                setSetting(response.data.setting);
                setId(response.data.setting._id);
                setUid(response.data.setting.user);
                setFirstName(response.data.setting.firstname);
                setLastname(response.data.setting.lastname);
                setUsername(response.data.setting.username);
                setBirthday(response.data.setting.birthday);
                setPhoneNumber(response.data.setting.phoneNumber);
                setEmail(response.data.setting.email);
                setStreet(response.data.setting.street);
                setCity(response.data.setting.city);
                setState(response.data.setting.state);
                setOverview(response.data.setting.overview);
                setRoles(response.data.setting.roles);
                setMajor(response.data.setting.major);
                setCommunityPreference(response.data.setting.communityPreference);
                setNativeLanguage(response.data.setting.nativeLanguage);
                setReceiveNewsletter(response.data.setting.receiveNewsletter);
                setReceiveNotifications(response.data.setting.receiveNotifications);
                setDarkMode(response.data.setting.darkMode);
                setBlockedUsersList(response.data.blockedUsersList);
                setBlockedUsers(response.data.setting.blockedUsers);
                console.log("darkMode:     "+localStorage.getItem("darkMode"));

                let now_groupList=[];
                response.data.groupList.forEach(group=>{
                    var bl=false;
                    group.members.forEach(member=>{
                        if(member==response.data.setting.user){
                            bl=true;
                        }
                    });
                    now_groupList.push({
                        ...group,
                        "bl":bl
                    });
                });
                setGroupList(now_groupList);

                var now_roles=response.data.setting.roles;
                var roleList=document.getElementsByName("role");
                roleList.forEach(role => {
                    now_roles.forEach(r=>{
                        if(role.value==r){
                            role.checked=true;
                        }
                    });
                });
            })
            .catch(error => {
                console.error('There was an error fetching the user data:', error);
            });
    }

    useEffect(() => {
        // Replace with your actual user ID
        getOnload();
    }, []);

    const handleSave = () => {
        // Replace with your actual user ID and API endpoint
        // const userId = 'your_actual_user_id_here';
     
        var roleList=document.getElementsByName("role");
        var now_roles=[];
        roleList.forEach(role => {
            if(role.checked){
                now_roles.push(role.value);
            }
        });

        if(email && username){
            var data={
                "firstname":firstname,
                "lastname":lastname,
                "username":username,
                "birthday":birthday,
                "phoneNumber":phoneNumber,
                "email":email,
                "street":street,
                "city":city,
                "state":state,
                "overview":overview,
                "roles":now_roles,
                "major":major
            };
            axios.put(`http://localhost:3000/api/set/${setting._id}`, data)
                .then(response => {
                    openNotificationWithIcon('success','tips','Save Successfully!');
                    setIsEditable(true);
                    getOnload();
                })
                .catch(error => {
                    console.error('There was an error updating the settings:', error);
                });
        }else{
            openNotificationWithIcon("error","tips","username and Email cannot be empty!");
        }   
    };

    //Group chat Option
    const groupOption=(e,bl,gid)=>{
        var now_group={};
        var now_member_list=[];
        groupList.forEach(group=>{
            if(group._id==gid){
                now_group=group;
            }
        });
        if(bl){
            var members=now_group.members;
            members.forEach(member=>{
                if(member!=uid){
                    now_member_list.push(member);
                }
            })
        }else{
            var now_member_list=now_group.members;
            now_member_list.push(uid);
        }
        axios.put(`http://localhost:3000/api/group/${now_group._id}`, {"members":now_member_list})
        .then(response => {
            openNotificationWithIcon('success','tips','group option success!');
            getOnload();
        })
        .catch(error => {
            console.error('There was an error updating the settings:', error);
        });
    }

    //Cancel the shielding
    const cancelShielding=(e,now_uid)=>{
        console.log();
        let now_block_list=[];
        blockedUsers.forEach(block=>{
            if(now_uid!=block){
                now_block_list.push(block);
            }
        });
        axios.put(`http://localhost:3000/api/set/${setting._id}`, {blockedUsers:now_block_list})
        .then(response => {
            openNotificationWithIcon('success','tips','Cancel the shielding Successfully!');
            getOnload();
        })
        .catch(error => {
            console.error('There was an error updating the settings:', error);
        });
    }

    //Conversion time format
    const fordate=(date)=>{
        var now_time=new Date(date);
        const year = now_time.getFullYear().toString().padStart(4, '0');
        const month = (now_time.getMonth() + 1).toString().padStart(2, '0');
        const day = now_time.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
                    className={`settings-item ${selectedSetting === 'Manage Groups' ? 'selected' : ''}`}
                    onClick={() => handleSettingClick('Manage Groups')}
                >
                    Manage Groups
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
                                <div className="form-row-group">
                                    <div className="form-row">
                                        <label>Firstname: </label>
                                        <input type="text" name="firstname" disabled={!isEditable} onChange={(e)=>{setFirstName(e.target.value)}} value={firstname}/>
                                    </div>
                                    <div className="form-row">
                                        <label>Lastname: </label>
                                        <input type="text" name="lastname" disabled={!isEditable}  onChange={(e)=>{setLastname(e.target.value)}}  value={lastname}/>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label>Username: <span className="required">*</span></label>
                                    <input type="text" name="username" disabled={!isEditable}  onChange={(e)=>{setUsername(e.target.value)}}  value={username} required />
                                </div>


                                <div className="form-row">
                                    <label>Birthday: </label>
                                    <input type="date" name="birthday" disabled={!isEditable}  onChange={(e)=>{setBirthday(e.target.value)}}  value={fordate(birthday)} style={{ "width": "10vw" }} />
                                </div>
                                <div className="form-row">
                                    <label>Phone Number: </label>
                                    <input type="tel" name="phoneNumber"  onChange={(e)=>{setPhoneNumber(e.target.value)}}  value={phoneNumber} disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Email: <span className="required">*</span></label>
                                    <input type="email" name="email"  onChange={(e)=>{setEmail(e.target.value)}}  value={email} disabled={!isEditable} required />
                                </div>

                                <div className="form-row">
                                    <label>Address: </label>
                                    <input type="text" placeholder="Street" name="street"  onChange={(e)=>{setStreet(e.target.value)}}  value={street} disabled={!isEditable} />
                                    <span> - </span>
                                    <input type="text" placeholder="City" name="city" onChange={(e)=>{setCity(e.target.value)}}  value={city} disabled={!isEditable} />
                                    <span> - </span>
                                    <input type="text" placeholder="State" name="state" onChange={(e)=>{setState(e.target.value)}}  value={state} disabled={!isEditable} />
                                </div>
                                <div className="form-row">
                                    <label>Overview: </label>
                                    <textarea name="overview" disabled={!isEditable} onChange={(e)=>{setOverview(e.target.value)}}  value={overview} style={{ "vertical-align": "top" }}></textarea>
                                </div>
                                <div className="form-row">
                                    <label>Roles: </label>
                                    <input type="checkbox" name="role" value="undergraduate" disabled={!isEditable} /> Undergraduate
                                    <input type="checkbox" name="role" value="postgraduate" disabled={!isEditable} /> Postgraduate
                                    <input type="checkbox" name="role" value="international" disabled={!isEditable} /> International Student
                                </div>
                                <div className="form-row">
                                    <label>Major: </label>
                                    <select name="major" onChange={(e)=>{setMajor(e.target.value)}} value={major} disabled={!isEditable}>
                                        <option value="">--Select Your Major--</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Information System">Information System</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                    </select>
                                </div>
                            </form>

                        </form>
                        <button onClick={handleSave} disabled={!isEditable} className="btn_submit">Save</button>
                    </div>
                )}


                {selectedSetting === 'Preference' && (
                    <div>
                        <div className="form-header">Preference</div>
                        <form className="settings-form">
                            <div className="form-row">
                                <div>Community</div> <div>Who can contact me</div>
                                <select disabled={!isEditable}  onChange={(e)=>{setCommunityPreference(e.target.value)}} value={communityPreference} >
                                    <option value="Everybody">Everybody</option>
                                    <option value="No one">No one</option>
                                    <option value="Only my friends">Only my friends</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div>Language</div> <div>My native language is</div>
                                <select disabled={!isEditable} onChange={(e)=>{setNativeLanguage(e.target.value)}} value={nativeLanguage}>
                                    <option value="English">English</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Maori">Maori</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div>Newsletter</div>
                                <input type="checkbox" disabled={!isEditable} checked={receiveNewsletter} onChange={(e)=>{setReceiveNewsletter(e.target.checked)}} />
                                <span>I would like to receive our newsletter.</span>
                            </div>
                            <div className="form-row">
                                <div>Notifications</div>
                                <input type="checkbox" disabled={!isEditable} checked={receiveNotifications}  onChange={(e)=>{setReceiveNotifications(e.target.checked)}} />
                                <span>I would like to receive new messages.</span>
                            </div>
                            <div className="form-row">
                                <label>Dark Mode</label>
                                <input type="checkbox" checked={darkMode}  onChange={(e)=>{setDarkMode(e.target.checked)}} />
                            </div>
                        </form>
                        <button onClick={preferenceSave} disabled={!isEditable} className="btn_submit">Save</button>
                    </div>
                )}

                {selectedSetting === 'Manage Groups' && (
                    <div>
                        <div className="form-header">Manage Groups</div>
                        <div className=''>
                            {groupList.map(group => (
                                <div className='friend-item' style={{"padding": "1vw","margin-bottom":"2vw"}}>
                                    <img src={groupIcon} alt="Friend Avatar" className="friend-avatar" />
                                    <div className="friend-details">
                                        <div className="friend-name" style={{"font-weight": "bold","font-size": "large"}}>{group.groupName}</div>
                                        <div className="friend-last-message hidden_text">{group.description}</div>
                                    </div>
                                    <div className="friend-info">
                                        <button onClick={(e)=>groupOption(e,group.bl,group._id)} className={group.bl?"btn_edit":"btn_submit"}>{group.bl?"Exit a group chat":"Join a group chat"}</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}


                {selectedSetting === 'Blocked Users' && (
                    <div>
                        <div className="form-header">Blocked Users</div>
                        <div className=''>
                            {blockedUsersList.map(blockedUsers => (
                                <div className='friend-item' style={{"padding": "1vw","margin-bottom":"2vw"}}>
                                    <img src={photo} alt="Friend Avatar" className="friend-avatar" style={{"width": "100px","height":"100px"}}/>
                                    <div className="friend-details">
                                        <div className="friend-name" style={{"font-weight": "bold","font-size": "large"}}>{blockedUsers.userName}</div>
                                    </div>
                                    <div className="friend-info">
                                        <button onClick={(e)=>cancelShielding(e,blockedUsers._id)} className="btn_edit">Release</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Settings;
