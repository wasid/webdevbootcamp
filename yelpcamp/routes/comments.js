var express               = require("express"),
    router                = express.Router({mergeParams: true}),
    Campground            = require("../models/campground"),
    Comment               = require("../models/comment"),
    middleware            = require("../middleware");

// Comment Route
// New Comment
router.get("/new", middleware.isSingedin, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
            if (err) {
                req.flash('error', err.message);
            } else {
                res.render("comments/new", {campinfo: campground});
            }
    });
});

// Create Comment
router.post("/", middleware.isSingedin, function(req, res){
    var id = req.params.id;
    var comment = req.body.comment;
    Campground.findById(id, function(err, campground){
            if (err) {
                req.flash('error', err.message);
            } else {
                Comment.create(comment, function(err, createdcomment){
                    if (err) {
                        console.log(err);
                    } else {
                        createdcomment.author.id = req.user._id;
                        createdcomment.author.username = req.user.username;
                        createdcomment.save();
                        campground.comments.push(createdcomment);
                        campground.save();
                        req.flash('success', "Comment posted successfully");
                        res.redirect("/campgrounds/" + campground._id);
                    }
                });
            }
    });
});

// Edit Comment

router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var comment_id = req.params.comment_id;

    Comment.findById(comment_id, function(err, getcomment){
        if (err) {
            req.flash('error', err.message);
        } else {
            res.render("comments/edit", {campinfo_id: camp_id, fetchcomment: getcomment});
        }
    });

});

// update/PUT route

router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var comment_id = req.params.comment_id;
    var comment = req.body.comment;

    // req.body.comment.text = req.sanitize(req.body.comment.text)
    Comment.findByIdAndUpdate( comment_id, comment, function(err, updatedComment){
            if (err) {
                req.flash('error', err.message);
                res.redirect("back");
            } else {
                req.flash('info', "Comment updated successfully");
                res.redirect("/campgrounds/" + camp_id);
            }
    });
});


// Delete/Destroy Route

router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var id = req.params.comment_id;

    Comment.findByIdAndRemove( id, function(err){
           if (err) {
                req.flash('error', err.message);
            } else {
                req.flash('warning', "Comment deleted successfully");
                res.redirect("/campgrounds/" + camp_id);
            }
    });
  
});

module.exports = router;