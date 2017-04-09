var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});


app.post("/addfriend", function(req, res){
    res.send("post route for friends");
});

app.get("/friends", function(req, res){
    // var friends = req.params.thing;
    var friends = ["Ocean", "Wasid", "Hossain", "Nurul", "Ripon"];
    res.render("friends", {friends: friends});
});

app.get("*", function(req, res){
    res.send("Route not Available!!!")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For Post Request Demo!!!")
});