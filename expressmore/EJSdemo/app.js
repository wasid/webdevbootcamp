var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/inlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingvar: thing});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For EJSdemo!!!")
});