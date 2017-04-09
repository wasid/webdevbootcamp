var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/inlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingvar: thing});
});


app.get("/posts", function(req, res){
    var posts = [
        {title: "Is Coding not easy!", author: "Ocean"},
        {title: "Best programming language!", author: "Wasid"},
        {title: "Can you believe this PHP?", author: "Hossain"}
    ];
    
    res.render("posts.ejs", {posts: posts});
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For EJSdemo!!!")
});