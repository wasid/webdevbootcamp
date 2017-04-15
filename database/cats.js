var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    location: String
});

var Cat = mongoose.model("Cat", catSchema);

// var jerry = new Cat({
//     name: "tom",
//     age: 5,
//     location: "CN"
// });

// jerry.save(function(err, cat){
//     if (err) {
//         console.log("Failed to save Cat to the DB!");
//     } else {
//         console.log("Cat saved to the DB!");
//         console.log(jerry);
//     }
// });

Cat.create({
    name: "pussy",
    age: 6,
    location: "nick"
}, function(err, newcat){
    if (err) {
        console.log("Failed to save Cat to the DB!");
    } else {
        console.log("Cat saved to the DB!");
        console.log(newcat);
    }
});

Cat.find({}, function(err, allcat){
     if (err) {
        console.log("Failed to fetch Cat data from the DB!");
        console.log(err);
    } else {
        console.log("Cat info:");
        console.log(allcat);
    }
    
});

