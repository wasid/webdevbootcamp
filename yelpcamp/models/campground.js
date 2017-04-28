var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String,
    comments:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Campground = mongoose.model("Campground", campSchema);

module.exports = Campground;