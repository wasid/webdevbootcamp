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
                        createdcomment.author.id = req.user._id;
                        createdcomment.author.username = req.user.username;
                        createdcomment.save();
                        campground.comments.push(createdcomment);
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id);
                    }
                });
            }
    });
});

// Edit Comment

router.get("/:comment_id/edit", checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var comment_id = req.params.comment_id;

    Comment.findById(comment_id, function(err, getcomment){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", {campinfo_id: camp_id, fetchcomment: getcomment});
        }
    });

});

// update/PUT route

router.put("/:comment_id", checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var comment_id = req.params.comment_id;
    var comment = req.body.comment;

    // req.body.comment.text = req.sanitize(req.body.comment.text)
    Comment.findByIdAndUpdate( comment_id, comment, function(err, updatedComment){
            if (err) {
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + camp_id);
            }
    });
});


// Delete/Destroy Route

router.delete("/:comment_id", checkCommentOwner, function(req, res){
    
    var camp_id = req.params.id;
    var id = req.params.comment_id;

    Comment.findByIdAndRemove( id, function(err){
           if (err) {
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + camp_id);
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

function checkCommentOwner(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, getupdatetinfo) {
           if (err) {
               res.redirect("back");
           } else {
               
                  if (getupdatetinfo.author.id.equals(req.user._id)) {
                      next();
                  } else {
                        res.redirect("back");
                  }
           } 
        });
    } else{
        res.redirect("/login");
    }
}

module.exports = router;