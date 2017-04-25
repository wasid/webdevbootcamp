var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String
});

var Campground = mongoose.model("Campground", campSchema);

module.exports = Campground;