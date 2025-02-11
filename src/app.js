const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async(req, res) => {
    const userObj = {
        firstName : "Sachin",
        lastName : "Kumar",
        emailId : "sachin@gmail.com",
        password : "sachin@1234"
    };
    //creating a new instance of User model.
    const user = new User(userObj);
    await user.save();
    res.send("User added Successfully!");
})

connectDB().
then(() => {
    console.log("Database connection establishing...");
    app.listen(7777, () => {
        console.log("Server is successfully running on port 7777....");
    });
})
.catch((err) => {
    console.error("DataBase Connection error");
});

