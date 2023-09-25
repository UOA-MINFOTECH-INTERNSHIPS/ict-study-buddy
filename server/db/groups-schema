// groups-schema.js

import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    description: {
      type: String,
      default: "",
    },
    groupPic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

export { Group };
