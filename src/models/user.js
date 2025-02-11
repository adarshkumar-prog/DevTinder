const mongoose = require("mongoose");

const Userschema =  mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});

const UserModel = mongoose.model("User", Userschema);

module.exports = UserModel;