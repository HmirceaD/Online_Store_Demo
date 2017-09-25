var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    
    title: String,
    price: Number,
    image: String,
    desc: String,
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    
    author: {
      
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      
      username: String
      
   },
   
   category: String
    
});

module.exports = mongoose.model("Post", postSchema);