var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express();

// database connection
var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blog_app");

// App Config
app.set("view engine", "ejs"); // for user friendly view control
app.use(bodyParser.urlencoded({extended: true})); // for getting form data
app.use(express.static("public")); // for custom style

// Model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// manually create post
// Blog.create({
    
//     title: "First Blog Post",
//     image: "https://farm5.staticflickr.com/4095/4857508633_86fb572818.jpg",
//     body: "Blog post body is very important to attract the reader.",
        
//     })


// RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    
    Blog.find({}, function(err, allblogs){
         if (err) {
            console.log("Failed to fetch blogs data from the DB!");
            console.log(err);
        } else {
            res.render("index", {blogs: allblogs});
        }
    
    });
    
});

app.get("/blogs/new", function(req, res){
    

    res.render("new");
    
});

app.post("/blogs", function(req, res){
    
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var newPost = {title:title, image:image, body:body}
    console.log(newPost);
    Blog.create( newPost, function(err, addedpost){
            if (err) {
                console.log("Failed to save Post to the DB!");
            } else {
                console.log("Post saved to the DB!");
                res.redirect("/blogs");
            }
    });
    
    
});

app.get("/blogs/:id", function(req, res){
    var id = req.params.id
    Blog.findById(id, function(err, getinfo){
            if (err) {
                console.log("Failed to get Blog info!");
            } else {
                
                res.render("show", {bloginfo: getinfo});
            }
    });
    
});

app.get("/blogs/:id/edit", function(req, res){
    var id = req.params.id
    Blog.findById(id, function(err, geteditinfo){
            if (err) {
                console.log("Failed to get edit post info!");
            } else {
                
                res.render("edit", {editbloginfo: geteditinfo});
            }
    });
    
});

app.post("/blogs/:id/update", function(req, res){
    
    var id = req.params.id
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var editedbody = {title:title, image:image, body:body}

    Blog.findByIdAndUpdate( id, editedbody, function(err, updatedpost){
            if (err) {
                res.redirect("/blogs");
            } else {
                console.log("Post updated!");
                res.redirect("/blogs/"+id);
            }
    });
    
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BlogApp Server Has Started!!!")
});