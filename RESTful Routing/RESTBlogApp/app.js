var bodyParser           = require("body-parser"),
    expressSanitizer     = require("express-sanitizer"),
    express              = require("express"),
    app                  = express();

// database connection
var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blog_app");

// App Config
app.set("view engine", "ejs"); // for user friendly view control
app.use(bodyParser.urlencoded({extended: true})); // for getting form data
app.use(expressSanitizer());
app.use(express.static("public")); // for custom style

// Model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// Home
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// Home/All Posts
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

// Add new post form
app.get("/blogs/new", function(req, res){
    

    res.render("new");
    
});

// Add new post
app.post("/blogs", function(req, res){
    
    var title = req.body.title;
    var image = req.body.image;
    
    // req.body.body = req.sanitize(req.body.body);
    var body = req.sanitize(req.body.body);
    var newPost = {title:title, image:image, body:body}

    Blog.create( newPost, function(err, addedpost){
            if (err) {
                console.log("Failed to save Post to the DB!");
            } else {
                console.log("Post saved to the DB!");
                res.redirect("/blogs");
            }
    });
    
    
});

// Show individual post
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

// Update form
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

// Update post
app.post("/blogs/:id/update", function(req, res){
    
    var id = req.params.id
    req.body.data.body = req.sanitize(req.body.data.body)
    Blog.findByIdAndUpdate( id, req.body.data, function(err, updatedpost){
            if (err) {
                res.redirect("/blogs");
            } else {
                console.log("Post updated!");
                res.redirect("/blogs/"+id);
            }
    });
    
    
});

// Delete post
app.post("/blogs/:id/delete", function(req, res){
    
    var id = req.params.id

    Blog.findByIdAndRemove( id, function(err){
            if (err) {
                res.redirect("/blogs");
            } else {
                console.log("Post Deleted!");
                res.redirect("/blogs");
            }
    });
  
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BlogApp Server Has Started!!!")
});