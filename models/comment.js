var mongoose = require("mongoose");


var comSchema = new mongoose.Schema({
    
    text: String,
    author: String
    
});

module.exports = mongoose.model("Comment", comSchema);