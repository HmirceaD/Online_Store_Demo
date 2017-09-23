var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");
var midObj  =  require("../middleware/mid");

router.get("/:user_id", midObj.checkAuth, function(req, res){
    
    User.findById(req.params.user_id, function(err, user){
       if(err){
           res.redirect("/shop");
       } else {
           
           res.render("user/account", {user: req.user});
       } 
    });
    
});

module.exports = router;