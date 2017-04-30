var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post    = require("./models/post");

var User    = require("./models/user");



// Post.create({
//     title: "Nice Title 4",
//     content: "This post content 4."
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