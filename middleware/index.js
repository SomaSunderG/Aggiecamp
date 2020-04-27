var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(campground.author.id.equals(req.user._id) || req.user.isAdmin){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
			   req.flash("error","Comment not found");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
               next();
            } else {
                req.flash("error", "User does not have authorization to perform the action!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","User should login first!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","User should login first!");
    res.redirect("/login");
}

module.exports = middlewareObj;