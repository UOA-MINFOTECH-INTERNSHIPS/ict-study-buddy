import express from "express";

const router = express.Router();
import { User } from "../db/user-schema.js";
import { Group } from "../db/groups-schema.js";

// Update group 
router.put('/:gid', async (req, res) => {
    const { gid } = req.params;
    const { members } = req.body;

    // // Find the Group by gid
    const now_group = await Group.findById(gid);
   
    if (!now_group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    //  Update the members and Group
    now_group.members = members || now_group.members;
    console.log(now_group);

    try{
        await now_group.updateOne({ $set:now_group });
        return res.status(200).json("Save Successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


//Add group list by default
router.get('/group/add', async (req, res) => {
  const userList = await User.find({});
  const group1 = new Group({
    groupName: "Music exchange meeting I",
    owner: userList[0]._id,
    members: [],
    description:"This group welcomes all domestic and foreign conservatory (professional) students, graduates and people who are preparing to take the conservatory of music to join! We make progress by organizing everyone together, helping each other! Let our music learning more rich, no longer lonely!"
  });

  const group2 = new Group({
    groupName: "Music exchange meeting II",
    owner: userList[0]._id,
    members: [],
    description:"The group will keep sharing the dynamics of major music colleges (majors) at home and abroad, such as application consultation, concerts, master classes, etc., and welcome everyone to share any valuable content of their own schools and majors at any time!"
  });

  const group3 = new Group({
    groupName: "Music exchange meeting III",
    owner: userList[0]._id,
    members: [],
    description:"This group welcomes all domestic and foreign conservatory (professional) students, graduates and people who are preparing to take the conservatory of music to join! We make progress by organizing everyone together, helping each other! Let our music learning more rich, no longer lonely!"
  });

  const group4 = new Group({
    groupName: "Music exchange meeting IV",
    owner: userList[0]._id,
    members: [],
    description:"The group will keep sharing the dynamics of major music colleges (majors) at home and abroad, such as application consultation, concerts, master classes, etc., and welcome everyone to share any valuable content of their own schools and majors at any time!"
  });

  try {
    await group1.save();
    await group2.save();
    await group3.save();
    await group4.save();
    return res.status(201).json({"message":"add group Successfully"});
  } catch (err) {
    return res.status(500).json(err);
  }
})


export default router;
