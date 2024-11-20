const Course = require("../models/Course-Model")

module.exports.addCourse = (req, res) => {
    let {name, description, price} = req.body;
    let newCourse = new Course({
        name: name,
        description: description,
        price: price
    });

    return newCourse.save().then(result => {
        return res.send({
            code: "COURSE-ADDED",
            message: "The course is now posted in the application",
            result: result
        });
    })
    .catch(error => {
        res.send({
            code: "SERVER-ERROR",
            message: "We've encountered an error during the registration. Please try again!",
            result: error
        });
    });
};

module.exports.getAllCourses = (req, res) => {
    return Course.find({}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet"
            })
        }else{
            return res.send({
                code: "ALL-COURSES-RESULT",
                message: "Here are the list of courses",
                result: result
            })
        }
    })
}

module.exports.getAllActive = (req, res) => {
    return Course.find({isActive: true}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet"
            })
        }else{
            return res.send({
                code: "ALL-ACTIVE-COURSES-RESULT",
                message: "Here are the list of courses that are active",
                result: result
            })
        }
    })
}

module.exports.getAllInactive = (req, res) => {
    return Course.find({isActive: false}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet"
            })
        }else{
            return res.send({
                code: "ALL-INACTIVE-COURSES-RESULT",
                message: "Here are the list of courses that are inactive",
                result: result
            })
        }
    })
}

module.exports.getSpecificCourse = (req, res) => {
    const {courseId} = req.params
    return Course.findById(courseId).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-NOT-FOUND",
                message: "There is no course with the given ID"
            })
        }else{
            return res.send({
                code: "COURSE_FOUND",
                message: `The data from ${courseId.toUpperCase()}`,
                result: result
            })
        }
    })
}

// Archive Course
module.exports.archiveCourse = (req,res) => {
    const {courseId} = req.params;
    const updateField = {
        isActive: false
    }

    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result.isActive === false){
            return res.send({
                code: "COURSE-IS-ALREADY-ACTIVATED",
                message: `${result.name} is already archived`,
                result: result
            })
        }
        if(result === null || result.lenght === 0){
            return res.send({
                code: "COURSE-NOT-FOUND",
                message: "Cannot find course with the provided ID."
            })
        }else{
            return res.send({
                code: "COURSE-ARCHIVED-SUCCESSFULLY",
                message: "The course has been archived",
                result: result
            })
        }
    })
}

// Activate Course
module.exports.activateCourse = (req,res) => {
    const {courseId} = req.params;
    const updateField = {
        isActive: true
    }

    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result.isActive === true){
            return res.send({
                code: "COURSE-IS-ALREADY-ACTIVATED",
                message: `${result.name} is already available`,
                result: result
            })
        }
        if(result === null || result.lenght === 0){
            return res.send({
                code: "COURSE-NOT-FOUND",
                message: "Cannot find course with the provided ID."
            })
        }else{
            return res.send({
                code: "COURSE-ACTIVATED-SUCCESSFULLY",
                message: `${result.name} is now available.`,
                result: result
            })
        }
    })
}

module.exports.deleteAllCourses = (req, res) => {
    return Course.deleteMany({isActive: true}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "There is no added course yet to be deleted"
            })
        }else{
            return res.send({
                code: "ALL-COURSES-DELETED",
                message: "There are no course addded",
                result: result
            })
        }
    })
}
