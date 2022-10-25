const mongoose = require("mongoose");

let posttodo = mongoose.model("posttodo", 
    mongoose.Schema({
        task: String,
        date: String,
        time: String  
    }, {timestamps: true}));

module.exports = posttodo;