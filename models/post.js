var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    
    title: String,
    price: Number,
    image: String,
    desc: String
    
});

module.exports = mongoose.model("Post", postSchema);