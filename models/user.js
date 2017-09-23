var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   username: String,
   password: String,
   
   posts: [{
      
      id:{
    
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
       }, 
       
       title: String,
       price: Number,
       image: String,
       desc: String
       
       
       }],
   
   comments: [{
    
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
       
   }]
   
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);