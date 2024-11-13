const express = require("express");
// Express routing component
const router = express.Router();
const courseController = require("../controllers/Course-Controllers.js");

// Create Course
router.post("/", courseController.addCourse)

// Get All Courses
router.get("/all", courseController.getAllCourses)

// Delete All Courses
router.delete("/delete-all", courseController.deleteAllCourses)

module.exports = router;