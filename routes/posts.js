var express = require("express");
var router  = express.Router(),
    passport = require("passport");
var Post    = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");
var midObj  =  require("../middleware/mid");

router.get("/", function(req, res){
    
     Post.find({}, function(err, posts){
         if(err){
             console.log("aoleo");
         } else {
            res.render("posts/index", {posts:posts, crr_user: req.user});
         } 
     });
    
});

router.get("/categories/:cat_id", function(req, res) {
    
    Post.find({category: req.params.cat_id}, function(err, posts){
       if(err){
           res.redirect("/shop");
       } else {
           res.render("posts/index", {posts:posts, crr_user: req.user});
       }
    });
    
});

router.get("/new", midObj.checkAuth, function(req, res) {
    res.render("posts/new");
});

router.post("/", midObj.checkAuth, function(req, res){
    
    var postObj = { title: req.body.post.title, price: req.body.post.price, image: req.body.post.image, desc: req.body.post.desc,
        author: {
            id: req.user._id,
            username: req.user.username
        },
        
        category: req.body.post.category
    }
    
    
    User.findById(req.user._id, function(err, user) {
        if(err){
            
            console.log(err);
            
        } else {
            
            Post.create(postObj, function(err, post){
                if(err){
                    res.redirect("/shop");
                } else {
                    
                    user.posts.push(postObj);
                    user.save();
                    
                    res.redirect("/shop");
                }
            });
        }
    });
    
    
});

router.get("/:id", function(req, res) {
   
   Post.findById(req.params.id).populate("comments").exec(function(err, post){
       if(err){
           res.redirect("back");
       } else {
           res.render("posts/show", {post:post, crr_user: req.user});
           
       }
   });
    
});

router.delete("/:id", midObj.checkAllAuth, function(req, res){
   
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/shop");
        } else {
            res.redirect("/shop");
        }
    });
  
  
   
});

router.get("/:id/update", midObj.checkAllAuth, function(req, res) {
   
   Post.findById(req.params.id, function(err, post){
      if(err){
          res.redirect("back");
      } else {
          res.render("posts/update", {post:post});
      } 
   });
    
});

router.put("/:id", midObj.checkAllAuth, function(req,res){
   
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err,post){
     if(err){
         res.redirect("/shop");
     } else {
         res.redirect("/shop/" + req.params.id);
     }
  });
    
});

function arr_remove(arr, ps){
    
    for (var i = 0; i < arr.length; i++){
        
        if( arr[i]._id == ps._id ){
            
            arr.splice(i, 1);
        }
        
    }
    
};

module.exports = router;