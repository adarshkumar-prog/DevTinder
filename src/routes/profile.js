const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require('validator');
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = req.user;
            res.send(user);
         }catch(err){
         res.status(400).send("ERROR : " + err.message);
    };
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error(("Invalid edit request"));
        }
        const loggedInUser = req.user;
        console.log("Before : " + loggedInUser);
    
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        console.log("after : " + loggedInUser);
    
        res.send(`${loggedInUser.firstName}, your profile is updated Successfully !`);

}catch(err){
    console.log(err);
    res.status(400).send("ERROR : " + err.message);
}
});

// PATCH: Change Password
profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const { oldPassword, newPassword } = req.body;

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, loggedInUser.password);
        if (!isOldPasswordCorrect) {
            return res.status(400).send("ERROR: Old password is incorrect!");
        }

        
        const isNewPasswordStrong = validator.isStrongPassword(newPassword);
        if (!isNewPasswordStrong) {
            return res.status(400).send("ERROR: New password is not strong enough!");
        }

        loggedInUser.password = await bcrypt.hash(newPassword, 10);
        await loggedInUser.save();

        res.send(`${loggedInUser.firstName}, your password has been updated successfully!`);
    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;



module.exports = { profileRouter };