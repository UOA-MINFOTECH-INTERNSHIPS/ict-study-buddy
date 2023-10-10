// server/routes/sets.js
import express from "express";

const router = express.Router();
import { User } from "../db/user-schema.js";
import { Settings } from "../db/settings-schema.js";
import { Group } from "../db/groups-schema.js";

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const setting = await Settings.findOne({ user: userId });
  const groupList = await Group.find({});

  if(!setting){
    const newSettings = new Settings({
      user: userId,
      username: user.userName,
      email: user.email,
      major:user.major,
      overview:user.desc
    });
    try {
      const settings = await newSettings.save();
      return res.status(200).json({"setting":settings,"groupList":groupList});
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  let bloced=[];
  for(var i=0;i<setting.blockedUsers.length;i++){
    const now_user = await User.findById(setting.blockedUsers[i]);
    bloced.push(now_user);
  }
  return res.status(200).json({"setting":setting,"groupList":groupList,"blockedUsersList":bloced});
})

// Update user settings
router.put('/:settingId', async (req, res) => {
  const { settingId } = req.params;
  const { firstname, lastname, username, birthday, phoneNumber, email, street, city, state, overview, roles, major,communityPreference,nativeLanguage,receiveNewsletter,receiveNotifications,darkMode,blockedUsers } = req.body;
  console.log(darkMode);
  try {
    // // Find the user by userId and find the setting by id
    const setting = await Settings.findById(settingId);
    const user = await User.findById(setting.user);

    if (!setting) {
      return res.status(404).json({ message: 'User not found' });
    }

    //  Update the user and settings
    setting.firstname = firstname || setting.firstname;
    setting.lastname = lastname || setting.lastname;
    setting.username = username || setting.username;
    setting.birthday = birthday || setting.birthday;
    setting.phoneNumber = phoneNumber || setting.phoneNumber;
    setting.email = email || setting.email;
    setting.street = street || setting.street;
    setting.city = city || setting.city;
    setting.state = state || setting.state;
    setting.overview = overview || setting.overview;
    setting.roles = roles || setting.roles;
    setting.communityPreference = communityPreference || setting.communityPreference;
    setting.nativeLanguage = nativeLanguage || setting.nativeLanguage;
    setting.receiveNewsletter = receiveNewsletter;
    setting.receiveNotifications = receiveNotifications ;
    setting.darkMode = darkMode 

    setting.blockedUsers=blockedUsers || setting.blockedUsers;
    
    user.desc=overview || user.desc; // Linking Overview to desc in User schema
    user.userName=username || user.userName;
    user.email=email || user.email;
    user.major=major || user.major;

    // Save the updated user settings
    await user.updateOne({$set:user});
    await setting.updateOne({ $set:setting });

   return res.status(200).json("Save Successfully");
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});


//
router.get('/black', async (req, res) => {

});

export default router;
