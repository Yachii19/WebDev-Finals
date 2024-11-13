const User = require("../models/User-Model.js");
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: bcryptjs.hashSync(req.body.password, 10)
    })

    return newUser.save().then(result =>{
        res.send({
            code: "REGISTRATION-SUCCESS",
            message: "You are now registred!",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "REGISTRATION FAILED",
            message: "We've encountered an error during the registration. Please try again!",
            result: error
        })
    })
}

// User Login
module.exports.loginUser = (req, res) => {
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result => {
        if(result == null){
            return res.send({
                Code: "USER-NOT-REGISTERED",
                message: "Please register to login."
            });
        }else{
            const isPasswordCorrect = bcryptjs.compareSync(password, result.password);

            if(isPasswordCorrect){
                return res.send({
                    code: "USER-LOGIN-SUCCESS",
                    token: auth.createAccessToken(result)
                })
            }else{
                return res.send({
                    code: "PASSWORD-INCORRECT",
                    message: "Password is not correct. Please try again."
                })
            };
        };
    });
};

// Check email if existing
module.exports.checkEmail = (req, res) => {
    let {email} = req.body;
    return User.find({email: email}).then(result => {
        if(result.length > 0){
            return res.send({
                code: "EMAIL-EXISTS",
                message: "The user is registered."
            })
        }else{
            return res.send({
                code: "EMAIL-NOT-EXISTING",
                message: "The user is not registered"
            })
        }
    })
}

// Check details
module.exports.getProfile = (req, res) => {
    let {_id} = req.body;
    return User.findOne({_id: _id}).then(result => {
        if(result == null){
            return res.send({
                code: "USER-WITH-THE-GIVEN-ID-NOT-FOUND",
                message: "Please register to view."
            });
        }else{
            if (result.password) {
                result.password = '*'.repeat(result.password.length);
            }

            return res.send({
                code: "USER-SUCCESSFULLY-FOUND",
                message: "One User has been found",
                result: result
            })
        }
    })
}