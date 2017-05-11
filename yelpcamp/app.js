var express               = require("express"),
    app                   = express(),

    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    
    User                  = require("./models/user"),

    passport              = require("passport"),
    passportLocal         = require("passport-local"),

    seedDB                = require("./seed");
    
    // seedDB(); //seed DB
    
// All routes

var campgroundRoutes      = require("./routes/campgrounds"),
    commentRoutes         = require("./routes/comments"),
    indexRoutes           = require("./routes/index");

// Database connection
mongoose.connect("mongodb://localhost/yelp_camp");

// View & Form config
app.set("view engine", "ejs");  // view 
app.use(bodyParser.urlencoded({extended: true})); // Form submit data
app.use(express.static(__dirname + "/public")); // for custom style
app.use(methodOverride("_method")); // for covering put method to maintain REST route
app.use(flash()); // for flash messages

// Passport Config
app.use(require("express-session")({
   secret: "Again Ocean can be a great programmer.",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passing data to every routes
app.use(function(req, res, next){
    res.locals.loggedinuser = req.user;
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!!!");
});