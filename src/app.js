const express = require("express");
const app = express();

const { adminAuth } = require("./middlewares/auth.js");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Usr deleted");
});

app.listen(7777, () => {
    console.log("Server is running on port 7777");
})