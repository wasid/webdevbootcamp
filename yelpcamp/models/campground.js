var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    info: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Campground = mongoose.model("Campground", campSchema);

module.exports = Campground;