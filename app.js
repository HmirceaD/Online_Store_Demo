var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Post           = require("./models/post"),
    methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/online_shop_demo", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", function(req, res){
   res.render("landing"); 
});
    
app.get("/shop", function(req, res){
    
     Post.find({}, function(err, posts){
         if(err){
             console.log("aoleo");
         } else {
             
            res.render("index", {posts:posts});
         }
     });
    
});

app.get("/shop/:id", function(req, res) {
   
   Post.findById(req.params.id, function(err, post){
       if(err){
           res.redirect("back");
       } else {
           res.render("show", {post:post});
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
          res.render("update", {post:post});
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

app.get("/shop/new", function(req, res) {
    res.render("new");
})
    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Started"); 
});    
