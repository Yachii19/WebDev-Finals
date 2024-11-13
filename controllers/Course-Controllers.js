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
