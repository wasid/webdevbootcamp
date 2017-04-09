var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ["Ocean", "Wasid", "Hossain", "Nurul", "Ripon"];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});


app.post("/addfriend", function(req, res){
    var newfriend= req.body.newfriend;
    friends.push(newfriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.get("*", function(req, res){
    
    res.send("Route not Available!!!")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For Post Request Demo!!!")
});