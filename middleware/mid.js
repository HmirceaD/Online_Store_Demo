var Post    = require("../models/post");
var Comment = require("../models/comment"); 

var midObj = {
    
    checkAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        
        res.redirect("/login");
    },
    
    checkAllAuth: function(req, res, next){
        
        if(req.isAuthenticated()){
            
            Post.findById(req.params.id, function(err, post){
                
                if(err){
                    res.redirect("back");
                } else {
                    
                    if(!post){
                        
                        return res.redirect("back");
                    }
                    
                    if(post.author.id.equals(req.user._id)){
                        next();
                        
                    } else {
                        res.redirect("back");
                    }
                }
                
            });
            
        } else {
            
            res.redirect("/login");
        } 
        
    },
    
    checkAllCommentAuth: function(req, res, next){
        
        if(req.isAuthenticated()){
            
            Comment.findById(req.params.com_id, function(err, com){
                
                if(err){
                    res.redirect("back");
                } else {
                    
                    if(!com){
                        
                        return res.redirect("back");
                    }
                    
                    if(com.author.id.equals(req.user._id)){
                        next();
                        
                    } else {
                        res.redirect("back");
                    }
                }
                
            });
            
        } else {
            
            res.redirect("/login");
        } 
        
    }
    
}


module.exports = midObj;