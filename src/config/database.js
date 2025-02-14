const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://adarshkumarjha193:eMBEKzO6B6Oxkn4r@namastenode.isqmw.mongodb.net/devTinder");
};

module.exports = connectDB;



