import express from "express";
import { Course } from "../db/course-schema.js";

const router = express.Router();

// Create a new course or courses
router.post("/", async (req, res) => {
  const coursesToInsert = req.body;
  try {
    // Insert one or multiple courses into the database
    const insertedCourses = await Course.insertMany(coursesToInsert);
    return res.status(201).json(insertedCourses);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get a list of all courses
router.get("/", async (req, res) => {
  try {
    // Retrieve all courses from the database
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
