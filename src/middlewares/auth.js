const jwt = require('jsonwebtoken');
const User = require("../models/user.js");


const adminAuth = async (req, res, next) => {

try{const cookie = req.cookies;
const { token } = cookie;

const decodedMessage = await jwt.verify(token, "DEVTinder@790");

const { _id } = decodedMessage;

const user = await UserActivation.findOne({_id});
if(!user) {
throw new Error("user not found");
}
next();
}
catch(err){
    res.status(400).send("ERROR: " + err.message);
}
};
module.exports = { 
    adminAuth, };