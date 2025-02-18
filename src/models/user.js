const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Userschema =  mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minLength: 4,
        maxLength: 25,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        lowerCase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email address");
            }
        }
    },
    password : {
        type : String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password: " + value);
            }
        },
    },
    age : {
        type : Number,
        min: 18
    },
    gender : {
        type : String,
        enum: {
            values : ["male", "female"],
            message: `{value} is not a valid gender type`
        },
    },
    skills: {
        type: [String],
    },
    about: {
        type: String,
        default: "This is a default about of the user",
    },
    photoUrl: {
        type: String,
        //default: "",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL : " + value);
            }
        },
    },
}, { timeStamp : true });

Userschema.index({firstName: 1, lastName: 1});

Userschema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id },
    "DEV@Tinder$790", { expiresIn: "7d", })
    return token;
};


Userschema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const UserModel = mongoose.model("User", Userschema);

module.exports = UserModel;