var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Post           = require("./models/post"),
    Comment        = require("./models/comment"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    User           = require("./models/user");

var postsRoutes    = require("./routes/posts"),
    commentRoutes  = require("./routes/comments"),
    indexRoutes    = require("./routes/index"),
    userRoutes     = require("./routes/user");

// ========= Dependsss ===========
//mongoose.connect("mongodb://localhost/online_shop_demo", {useMongoClient: true});
mongoose.connect("mongodb://doru:eyeofthetiger@ds042527.mlab.com:42527/online_shop");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//========

//===sessions

app.use(require("express-session")({
    secret: "Cum sa nu iti placa manelele",
    resave: false,
    saveUninitialized: false
}));

//=== passport config

 app.use(function(req, res, next){
     res.locals.crr_user = req.user;
     next();
 });

//===== every path has access to user ^^^^

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//===

app.use("/shop", postsRoutes);
app.use("/user", userRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

//===== 404 error
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("error_404");
    return;
  }

});

//========

app.listen(process.env.PORT || 8080, function(){
   console.log("Server Started");
});
