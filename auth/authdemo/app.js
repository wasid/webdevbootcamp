var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    passportLocal         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
   secret: "Ocean can be a great programmer.",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isSingedin, function(req, res){
    res.render("secret");
});

// Auth Routes

// Sign up form
app.get("/register", function(req, res){
    res.render("register");
});

// Handle Sign up
app.post("/register", function(req, res){
    var username = req.body.username
    var password = req.body.password
    User.register(new User({username: username}), password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("/register");
        } else {
            passport.authenticate("local")(req, res,  function(){
                res.redirect("/secret");
            })
        }
    });
});

// Log in form
app.get("/login", function(req, res){
    res.render("login");
});

// Handle Log in
// middleware
app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    console.log("Log Out Done!")
    res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Auth App Server Has Started!!!")
});

// Custom Middleware Function

function isSingedin(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}