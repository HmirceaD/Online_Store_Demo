var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");
var midObj  =  require("../middleware/mid");

router.get("/", function(req, res){
    
     Post.find({}, function(err, posts){
         if(err){
             console.log("aoleo");
         } else {
             
            res.render("posts/index", {posts:posts});
         }
     });
    
});

router.get("/new", midObj.checkAuth, function(req, res) {
    res.render("posts/new");
})

router.get("/:id", function(req, res) {
   
   Post.findById(req.params.id).populate("comments").exec(function(err, post){
       if(err){
           res.redirect("back");
       } else {
           res.render("posts/show", {post:post});
       }
   });
    
});

router.delete("/:id", function(req, res){
   
  Post.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/shop");
      } else {
          res.redirect("/shop");
      }
  });
   
});

router.get("/:id/update", function(req, res) {
   
   Post.findById(req.params.id, function(err, post){
      if(err){
          res.redirect("back");
      } else {
          res.render("posts/update", {post:post});
      } 
   })
    
});

router.put("/:id", function(req,res){
   
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err,post){
     if(err){
         res.redirect("/shop");
     } else {
         res.redirect("/shop/" + req.params.id);
     }
  });
    
});

router.post("/", function(req, res){
    
    Post.create(req.body.post, function(err, post){
       if(err){
           res.redirect("/shop");
       } else {
           res.redirect("/shop");
       }
    });
    
});

module.exports = router;