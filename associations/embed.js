var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "ocean@gmai.com",
//     name: "wasid hossain"
    
// })

// newUser.posts.push({
//     title: "PHP",
//     content: "PHP is another best language!"
    
// })

// newUser.save(function(err, addeduser){
//             if (err) {
//                 console.log("Failed to save data to the DB!");
//             } else {
//                 console.log(addeduser);
                
//             }
//     });

// var newPost = new Post({
//     title: "JavaScript",
//     content: "JavaScript is the best language!"
    
// })
   
// newPost.save(function(err, addedPost){
//             if (err) {
//                 console.log("Failed to save data to the DB!");
//             } else {
//                 console.log(addedPost);
                
//             }
//     });
    

User.findOne({name:"wasid hossain"}, function(err, getuser){
            if (err) {
                console.log("Failed to get data from the DB!");
            } else {
                getuser.posts.push({
                    title: "Python",
                    content: "Python is the best language!"
                    
                });
                
                getuser.save(function(err, addedPost){
                                if (err) {
                                    console.log("Failed to save data to the DB!");
                                } else {
                                    console.log(addedPost);
                                    
                                }
                            })
            }
    })