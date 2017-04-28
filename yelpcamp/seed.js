var mongoose = require("mongoose");
var Comment = require("./models/Comment");
var Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        info: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        info: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        info: "blah blah blah"
    }
    ];

var seedDB = function(){
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Data removed successfully");
        }
        data.forEach(function(camp){
            Campground.create(camp, function(err, addeddata){
                if (err) {
                    console.log(err);
                } else {
                    Comment.create({
                         text: "Python is the best language!",
                         author: "wasid"
                    }, function(err, comment){
                                if (err) {
                                    console.log(err);
                                } else {
                                   console.log(comment);
                                   addeddata.comments.push(comment);
                                   addeddata.save(function(err, addedcomment){
                                        if (err) {
                                            console.log("Failed to save comment to the DB!");
                                        } else {
                                            console.log(addedcomment);
                                            
                                        }
                                    })
                                }
                            })
                    
                    
                
                
                }
            })
        })
    })
}

module.exports = seedDB;