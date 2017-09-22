var express = require("express");
var router  = express.Router();
var Post = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");

router.get("/shop/:id/comments/new", function(req, res) {
    
    Post.findById(req.params.id, function(err, post) {
        
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/new", {post:post}); 
        }
    });
   
});

router.post("/shop/:id/comments", function(req,res){
   
   Post.findById(req.params.id, function(err, post) {
      if(err){
          console.log(err);
      } else {
          
          Comment.create(req.body.comment, function(err, comment){
              
             if(err){
                 res.redirect("/shop/" + req.params.id);
             } else {
                 
                //com.save();
                post.comments.push(comment);
                post.save();
                res.redirect("/shop/" + req.params.id);
             }
          });
          
      }
   });
    
});

router.delete("/shop/:id/comments/:com_id", function(req, res){
   
   Post.findById(req.params.id, function(err, post) {
       if(err){
           res.redirect("/shop/" + req.params.id);
       } else {
           
           Comment.findByIdAndRemove(req.params.com_id, function(err){
              
              if(err){
                  
                  res.redirect("/shop/" + req.params.id);
              } else {
                  res.redirect("/shop/" + req.params.id);
              }
               
           });
           
       }
   });
    
});

router.get("/shop/:id/comments/:com_id", function(req, res) {
   
   Post.findById(req.params.id, function(err, post) {
      if(err){
          res.redirect("back");
      } else {
          
          Comment.findById(req.params.com_id, function(err, comment) {
              
            if(err){
                res.render("back");
            } else {
                res.render("comments/update", {comment:comment, post:post});
            }
        });
      }
   });
   
   
    
});

router.put("/shop/:id/comments/:com_id", function(req, res){
   
           Comment.findByIdAndUpdate(req.params.com_id, req.body.com, function(err, updatedComment){
              
              if(err){
                  
                  res.redirect("/shop/" + req.params.id);
              } else {
                  
                  res.redirect("/shop/" + req.params.id);
              }
               
           });
    
});


module.exports = router;