var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Hi There!");
});

app.get("/test", function(req, res){
    res.send("Test There!");
});

app.get("/todo/:task", function(req, res){
    var todotask = req.params.task;
    res.send("Task is: " + todotask );
});

app.get("/:animal/post/:title", function(req, res){
    var animal = req.params.animal;
    var title = req.params.title;
    res.send( animal +" Post and title is:" + title);
});

app.get("*", function(req, res){
    res.send("Route not Available!!!")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started!!!")
});