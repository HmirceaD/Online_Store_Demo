var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");
var midObj  =  require("../middleware/mid");

router.get("/:user_id", midObj.checkAuth, function(req, res){

});

module.exports = router;