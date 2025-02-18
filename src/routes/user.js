const express = require('express');
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const req = require('express/lib/request');

const USER_SAFE_DATA = "firstName lastName age gender about skills";

userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);


        const data = connectionRequest.map((row) => {
            if(row.fromUserId.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            row.fromUserId});
        res.json({message: "Connection Requests", connectionRequest});
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/user/connctions", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA);
    }catch(err){
        res.status(400).send({ message: err.message});
    }
})

module.exports = { userRouter };