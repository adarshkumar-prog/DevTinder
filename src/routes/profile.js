const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    };
});

profileRouter.patch("profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error(("ERROR : " + err.message));
        }

        const loggedInUser = req.body;
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = { profileRouter };