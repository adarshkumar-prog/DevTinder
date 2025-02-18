const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');

authRouter.post("/signup", async(req, res) => {
    
    try{
        validateSignUpData(req);

        const { firstName, lastName, emailId, password , age, gender, skills, about} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password,
            age,
            gender,
            skills,
            about,
        });
      console.log(user);

        user.password = passwordHash;
        await user.save();
        res.send("User added Successfully!");
    }
    catch(err){
        res.status(400).send("error saving the user:" + err.message);
    }
});

authRouter.post("/login", async(req, res)=> {
    try{

        const { emailId, password } = req.body;

        const user = await User.findOne({emailId});

        if(!user){
            throw new Error("Invalid Credentials not user found!!");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT();

            res.cookie("token", token,

            {expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});

            res.send("Login successful!");
        }
        else{
            throw new Error("Invalid Credentials!!");
        }

    }catch(err){
        res.status(400).send("Error logging in the user:" + err.message);
    }
});

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    });
    res.send("Logged Out successful!");
});

module.exports = { authRouter, };