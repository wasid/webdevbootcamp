// All middleware goes here:
var Campground            = require("../models/campground"),
    Comment               = require("../models/comment");

var middlewareObj= {};

middlewareObj.checkCampOwner = function (req, res, next){
    
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, geteditinfo) {
           if (err) {
               res.redirect("back");
           } else {
               
                  if (geteditinfo.author.id.equals(req.user._id)) {
                      next();
                  } else {
                        res.redirect("back");
                  }
           } 
        });
    } else{
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwner = function (req, res, next){
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
};

middlewareObj.isSingedin = function (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
};


module.exports = middlewareObj;