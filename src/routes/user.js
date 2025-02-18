const express = require('express');
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");


userRouter.get("/user/requests", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
        });


        res.json({message: "Connection Requests", connectionRequest});
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = { userRouter };