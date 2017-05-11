var express               = require("express"),
    router                = express.Router(),
    passport              = require("passport"),
    User                  = require("../models/user");
    
// Campground home route

router.get("/", function(req, res){
    res.render("landing");
});


// Registration Route

// Sign up form
router.get("/register", function(req, res){
    res.render("register");
});

// Handle Sign up
router.post("/register", function(req, res){
    
    var newusername = new User({username: req.body.username});
    var newpassword = req.body.password;

    User.register(newusername, newpassword, function(err, user){
        if (err) {
            console.log(err);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res,  function(){
                req.flash('info', 'Welcome to YelpCamp!');
                res.redirect("/campgrounds");
            });
        }
    });
});

// Log in form
router.get("/login", function(req, res){
    res.render("login");
});

// Handle Log in
// middleware
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// Log Out
router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', 'See you soon!');
    res.redirect("/campgrounds");
});

module.exports = router;