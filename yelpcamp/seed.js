var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
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
                    console.log("New data added!");
                }
            })
        })
    })
}

module.exports = seedDB;