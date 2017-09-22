var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Post           = require("./models/post"),
    Comment        = require("./models/comment"),
    methodOverride = require("method-override");


// ========= Dependsss ===========
mongoose.connect("mongodb://localhost/online_shop_demo", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//= ================


// ====== Routes for the posts and the index
app.get("/", function(req, res){
   res.render("landing"); 
});
    
app.get("/shop", function(req, res){
    
     Post.find({}, function(err, posts){
         if(err){
             console.log("aoleo");
         } else {
             
            res.render("posts/index", {posts:posts});
         }
     });
    
});

app.get("/shop/new", function(req, res) {
    res.render("posts/new");
})

app.get("/shop/:id", function(req, res) {
   
   Post.findById(req.params.id).populate("comments").exec(function(err, post){
       if(err){
           res.redirect("back");
       } else {
           res.render("posts/show", {post:post});
       }
   });
    
});

app.delete("/shop/:id", function(req, res){
   
  Post.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/shop");
      } else {
          res.redirect("/shop");
      }
  });
   
});

app.get("/shop/:id/update", function(req, res) {
   
   Post.findById(req.params.id, function(err, post){
      if(err){
          res.redirect("back");
      } else {
          res.render("posts/update", {post:post});
      } 
   })
    
});

app.put("/shop/:id", function(req,res){
   
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err,post){
     if(err){
         res.redirect("/shop");
     } else {
         res.redirect("/shop/" + req.params.id);
     }
  });
    
});

app.post("/shop", function(req, res){
    
    Post.create(req.body.post, function(err, post){
       if(err){
           res.redirect("/shop");
       } else {
           res.redirect("/shop");
       }
    });
    
});

// ============ routes for the comments

app.get("/shop/:id/comments/new", function(req, res) {
    
    Post.findById(req.params.id, function(err, post) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/new", {post:post}); 
        }
    });
   
});

app.post("/shop/:id/comments", function(req,res){
   
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

app.delete("/shop/:id/comments/:com_id", function(req, res){
   
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

app.get("/shop/:id/comments/:com_id", function(req, res) {
   
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

app.put("/shop/:id/comments/:com_id", function(req, res){
   
           Comment.findByIdAndUpdate(req.params.com_id, req.body.com, function(err, updatedComment){
              
              if(err){
                  
                  res.redirect("/shop/" + req.params.id);
              } else {
                  
                  res.redirect("/shop/" + req.params.id);
              }
               
           });
    
});
    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Started"); 
});    
