var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Hi There!");
});

app.get("/bye", function(req, res){
    res.send("Bye There!");
});

app.get("/cat", function(req, res){
    res.send("Meow!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started!!!")
});