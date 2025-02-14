const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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

