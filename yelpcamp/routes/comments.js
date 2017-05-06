var express               = require("express"),
    router                = express.Router({mergeParams: true}),
    Campground            = require("../models/campground"),
    Comment               = require("../models/comment");

// Comment Route
// New Comment
router.get("/new", isSingedin, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
            if (err) {
                console.log(err);
            } else {
                res.render("comments/new", {campinfo: campground});
            }
    });
});

// Create Comment
router.post("/", isSingedin, function(req, res){
    var id = req.params.id;
    var comment = req.body.comment;
    Campground.findById(id, function(err, campground){
            if (err) {
                console.log(err);
            } else {
                Comment.create(comment, function(err, createdcomment){
                    if (err) {
                        console.log(err);
                    } else {
                        campground.comments.push(createdcomment);
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id);
                    }
                });
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