var express               = require("express"),
    router                = express.Router(),
    Campground            = require("../models/campground");

// Campground Route to get all campgrounds

router.get("/", function(req, res){
    
    Campground.find({}, function(err, allcamp){
         if (err) {
            console.log("Failed to fetch campgrounds data from the DB!");
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcamp});
        }
    
    });
    
});

// Campground Route to create new campground using post

router.post("/", isSingedin, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var info = req.body.info;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {name:name, image:image, info:info, author:author};
    console.log(newCamp);
    Campground.create( newCamp, function(err, addedcamp){
            if (err) {
                console.log(err);
            } else {
                console.log("Campground saved to the DB!");
                res.redirect("/campgrounds");
            }
    });
    
    
});

// Campground form Route for adding new campground

router.get("/new", isSingedin, function(req, res){
    

    res.render("campgrounds/new");
    
});

// Campground show Route for individual post

router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, getinfo){
            if (err) {
                console.log("Failed to get Campground info!");
            } else {
                res.render("campgrounds/show", {campinfo: getinfo});
            }
    });
    
});

// edit route
router.get("/:id/edit", function(req, res){
    
    var id = req.params.id;
    Campground.findById(id, function(err, geteditinfo){
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/edit", {fetchcampinfo: geteditinfo});
            }
    });
    
});

// update/PUT route

router.put("/:id", function(req, res){
    
    var id = req.params.id;
    // req.body.campground.info = req.sanitize(req.body.campground.info)
    Campground.findByIdAndUpdate( id, req.body.campground, function(err, updatedCampground){
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/"+id);
            }
    });
    
});

// Custom Middleware Function

function isSingedin(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}


module.exports = router;
