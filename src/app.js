const express = require("express");

const app = express();


app.get("/test", (req, res) => {
  res.send({firstName : "Adarsh", lastName : "Kumar"});
})
app.post("/test", (req, res)=>{
  res.send("Data Saved Successfully");
})
// app.use("/test", (req, res) => {
//   res.send("Hello from the server!");
// });
app.delete("/test", (req, res)=>{
  res.send("data deleted successfully");
})
app.use("/tester", (req, res) => {
  res.send("Hello from the server!!!");
});
app.use("/hello", (req, res) => {
  res.send("Hello from the server!!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
