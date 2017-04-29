var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Comment = require("./models/Comment");
var Campground = require("./models/campground");
var seedDB = require("./seed");

seedDB();
// database connection
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

// Schecma

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
//     ];
    
// Campground.create(
    
//     {
//         name: "Mountain Goat's Rest", 
//         image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
//         info: "Mountain Goat's Rest is the best campground for chilling with famiily and friends. Everyone should try this at least once in a year."
        
//     }, 

//     function(err, newcamp){
//         if (err) {
//             console.log("Failed to save Campground to the DB!");
//         } else {
//             console.log("Campground saved to the DB!");
//         }
// });

// Campground home route

app.get("/", function(req, res){
    res.render("landing");
});

// Campground Route to get all campgrounds

app.get("/campgrounds", function(req, res){
    
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

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var info = req.body.info;
    var newCamp = {name:name, image:image, info:info}
    console.log(newCamp);
    Campground.create( newCamp, function(err, addedcamp){
            if (err) {
                console.log("Failed to save Campground to the DB!");
            } else {
                console.log("Campground saved to the DB!");
                res.redirect("/campgrounds");
            }
    });
    
    
});

// Campground form Route for adding new campground

app.get("/campgrounds/new", function(req, res){
    

    res.render("campgrounds/new");
    
});

// Campground show Route for individual post

app.get("/campgrounds/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, getinfo){
            if (err) {
                console.log("Failed to get Campground info!");
            } else {
                res.render("campgrounds/show", {campinfo: getinfo});
            }
    });
    
});

// Comment Route

app.get("/campgrounds/:id/comments/new", function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
            if (err) {
                console.log(err);
            } else {
                res.render("comments/new", {campinfo: campground});
            }
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!!!")
});