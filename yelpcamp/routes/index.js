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
            req.flash('error', err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res,  function(){
                req.flash('info', 'Welcome to YelpCamp! '+ user.username);
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

// router.post("/login", passport.authenticate("local", {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login",
//         successFlash:   "Welcome Back!",
//         failureFlash:   true
//     }), function(req, res){
// });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    
    if (err) {
        req.flash("error", err.message);
        return next(err); 
    }
    if (!user) { 
        req.flash("error", "Invalid email or password!");
        return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
      if (err) { 
          req.flash("error", err.message);
          return next(err); 
      }
      req.flash("success", "Welcome back to YelpCamp " + user.username);
      res.redirect('/campgrounds');
    });
  })(req, res, next);
});

// Log Out
router.get("/logout", function(req, res){
    req.logout();
    req.flash('info', 'See you soon!');
    res.redirect("/campgrounds");
});

module.exports = router;