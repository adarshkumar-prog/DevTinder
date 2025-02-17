const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const validators = require('validators/lib/validators');

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const cookie = req.cookies;
        const { token } = cookie;

        const isTokenValid = await Jwt.verify(token, "DEVTinder@790");
        if(!isTokenValid){
            throw new Error("Unauthorized User");
        }
            const { _id } = isTokenValid;
            console.log(`Logged in user is : ${_id}`);
            const user = await User.findById(_id);
            if(!user){
                throw new Error("User not found!");
            }
            res.send(user);
         }catch(err){
         res.status(400).send("ERROR : " + err.message);
    };
});

profileRouter.patch("profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error(("Invalid edit request"));
        }
        const loggedInUser = req.body;
    
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
    
        res.send(`${loggedInUser.firstName}, your profile is updated Successfully !`);

}catch(err){
    res.status(400).send("ERROR : " + err.message);
}
})

profileRouter.patch("/profile/password/edit", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.body;
        const { oldPassword, newPassword } = loggedInUser;
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, newPassword);
        const isNewPasswordStrong = validators.isStrongPassword(newPassword);
        if(isOldPasswordCorrect && isNewPasswordStrong){
            loggedInUser.password = newPassword;
            await loggedInUser.save();
            res.send(`${loggedInUser.firstName}, your password is updated Successfully !`);
        }
        else{
            throw new Error("Failed to change password!");
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = { profileRouter };