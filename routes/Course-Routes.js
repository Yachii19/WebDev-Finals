const express = require("express");
// Express routing component
const router = express.Router();
const courseController = require("../controllers/Course-Controllers.js");
const { verify } = require("../auth.js");

// Create Course
router.post("/", courseController.addCourse)

// Get All Courses
router.get("/all", courseController.getAllCourses)

// Get Active Courses
router.get("/all-active", courseController.getAllActive)

// Get Inactive Courses
router.get("/all-inactive", courseController.getAllInactive)

// Get Specific Course
router.get("/search/:courseId", courseController.getSpecificCourse)

// Arhive Course
router.put("/archive/:courseId", courseController.archiveCourse)

// Unarchive Course
router.put("/unarchive/:courseId", courseController.activateCourse)

// Delete All Courses
router.delete("/delete-all", courseController.deleteAllCourses)

module.exports = router;