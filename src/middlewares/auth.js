const jwt = require('jsonwebtoken');
const User = require("../models/user.js");


const userAuth = async (req, res, next) => {

try{
    const {token} = req.cookies;
    console.log(token);
    console.log("Verifying Token");
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    console.log(decodedMessage);

    if(!decodedMessage){
        throw new Error("Invalid Token");
    };

    const { _id } = decodedMessage;
    const user = await User.findOne({_id});
    if(!user) {
    throw new Error("user not found");
    }
    req.user = user;
    next();
}
  catch(err){
    res.status(400).send("ERROR: " + err.message);
}
};
module.exports = { 
    userAuth, };