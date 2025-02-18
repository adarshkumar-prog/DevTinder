const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",// reference to the user collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{value} is incorrect`
        }
    }
}, 
{ timestamps: true }
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre('save', function(next){  
    const connectionRequest = this;
    if(this.fromUserId === this.toUserId){
        throw new Error("You cannot send connection request to yourself");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;