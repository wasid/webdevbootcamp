var express               = require("express"),
    router                = express.Router(),
    Campground            = require("../models/campground"),
    middleware            = require("../middleware");

// Campground Route to get all campgrounds

router.get("/", function(req, res){
    
    Campground.find({}, function(err, allcamp){
         if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcamp});
        }
    
    });
    
});

// Campground Route to create new campground using post

router.post("/", middleware.isSingedin, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var info = req.body.info;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {name:name, image:image, info:info, author:author};
    Campground.create( newCamp, function(err, addedcamp){
            if (err) {
                req.flash('error', err.message);
            } else {
                req.flash('success', "Campground created successfully");
                res.redirect("/campgrounds");
            }
    });
    
    
});

// Campground form Route for adding new campground

router.get("/new", middleware.isSingedin, function(req, res){
    

    res.render("campgrounds/new");
    
});

// Campground show Route for individual post

router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, getinfo){
            if (err) {
                req.flash('error', err.message);
            } else {
                res.render("campgrounds/show", {campinfo: getinfo});
            }
    });
    
});

// edit route
router.get("/:id/edit", middleware.checkCampOwner, function(req, res){
    
    var id = req.params.id;
    Campground.findById(id, function(err, geteditinfo){
            if (err) {
                req.flash('error', err.message);
            } else {
                res.render("campgrounds/edit", {fetchcampinfo: geteditinfo});
            }
    });
    
});

// update/PUT route

router.put("/:id", middleware.checkCampOwner, function(req, res){
    
    var id = req.params.id;
    // req.body.campground.info = req.sanitize(req.body.campground.info)
    Campground.findByIdAndUpdate( id, req.body.campground, function(err, updatedCampground){
            if (err) {
                req.flash('error', err.message);
                res.redirect("/campgrounds");
            } else {
                req.flash('info', "Campground updated successfully");
                res.redirect("/campgrounds/"+id);
            }
    });
    
});

// Delete/Destroy Route

router.delete("/:id", middleware.checkCampOwner, function(req, res){
    
    var id = req.params.id;

    Campground.findByIdAndRemove( id, function(err){
            if (err) {
                req.flash('error', err.message);
                res.redirect("/campgrounds");
            } else {
                req.flash('warning', "Campground deleted successfully");
                res.redirect("/campgrounds");
            }
    });
  
});

module.exports = router;
