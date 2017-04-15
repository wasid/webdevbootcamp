var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// database connection
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

// Schecma

var campSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campSchema);

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
//     ];
    
// Campground.create(
    
//     {
//         name: "Mountain Goat's Rest", 
//         image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"
        
//     }, 

//     function(err, newcamp){
//         if (err) {
//             console.log("Failed to save Campground to the DB!");
//         } else {
//             console.log("Campground saved to the DB!");
//             console.log(newcamp);
//         }
// });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allcamp){
         if (err) {
            console.log("Failed to fetch campgrounds data from the DB!");
            console.log(err);
        } else {
            console.log("Campgrounds info:");
            console.log(allcamp);
            res.render("campgrounds", {campgrounds: allcamp});
        }
    
    });
    
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name:name, image:image}
    console.log(newCamp);
    Campground.create( newCamp, function(err, addedcamp){
            if (err) {
                console.log("Failed to save Campground to the DB!");
            } else {
                console.log("Campground saved to the DB!");
                console.log(addedcamp);
                res.redirect("/campgrounds");
            }
    });
    
    
});
app.get("/campgrounds/new", function(req, res){
    

    res.render("new");
    
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!!!")
});