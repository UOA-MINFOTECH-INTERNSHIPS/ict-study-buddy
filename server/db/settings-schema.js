// settings-schema.js
import mongoose from 'mongoose';
// import { connectDB } from './connectDB.cjs';


const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },//ref to user-schema userName
  birthday: {
    type: Date,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },//ref to user-schema email
  street: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  overview:{
    type: String,
    default: "",
  }, ////ref to user-schema desc
  state: {
    type: String,
    default: "",
  },
  roles: {
    type: [String], // Array of strings to hold multiple roles
    default: [],
  },
  major: {
    type: String,
    default: "",
  },//ref to user-schema major
  communityPreference: {
    type: String,
    default: "Everybody",
  },
  nativeLanguage: {
    type: String,
    default: "English",
  },
  receiveNewsletter: {
    type: Boolean,
    default: false,
  },
  receiveNotifications: {
    type: Boolean,
    default: false,
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  blockedUsers: {
    type: [mongoose.Schema.Types.ObjectId], // Array of User IDs
    default: [],
  }
}, {
  timestamps: true,
});



const Settings = mongoose.model('Settings', settingsSchema);
export {Settings}


// connectDB();
