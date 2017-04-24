var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);

// Post.create({
//     title: "Nice Title 3",
//     content: "This post content 3."
// }, function(err, addedPost){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(addedPost);
//         User.findOne({email: "wasid@mail.com"}, function(err, getUser){
//             if (err) {
//                 console.log(err);
//             } else {
//                 getUser.posts.push(addedPost);
//                 getUser.save(function(err, userPost){
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(userPost);
//                     }                
//                 });
//             }
//         });
//     }
// });

// User.create({
//     email: "wasid@mail.com",
//     name: "Wasid Hossain"
// })


User.findOne({email: "wasid@mail.com"}).populate("posts").exec(function(err, userData){
    if (err) {
        console.log(err);
    } else {
        console.log(userData);
    }
});