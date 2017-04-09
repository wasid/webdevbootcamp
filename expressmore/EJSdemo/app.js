var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/inlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingvar: thing});
});


app.get("/posts", function(req, res){
    var posts = [
        {title: "Is Coding not easy!", author: "Ocean"},
        {title: "Best programming language!", author: "Wasid"},
        {title: "Can you believe this PHP?", author: "Hossain"}
    ];
    
    res.render("posts", {posts: posts});
})

app.get("*", function(req, res){
    res.send("Route not Available!!!")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For EJSdemo!!!")
});