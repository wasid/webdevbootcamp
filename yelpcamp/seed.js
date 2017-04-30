var mongoose = require("mongoose");
var Comment = require("./models/Comment");
var Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        info: "Bacon ipsum dolor amet sirloin beef ribs beef tongue, chuck corned beef burgdoggen jerky bresaola pork loin salami venison. Tail bresaola ham venison sirloin. Ball tip pastrami kielbasa, shank pork belly kevin flank boudin capicola jerky short loin brisket. Beef capicola frankfurter, beef ribs tail pork belly kielbasa spare ribs brisket bresaola jowl ball tip short ribs pork loin cupim. Meatloaf kielbasa pork belly, ribeye pork loin boudin brisket venison jowl. Ground round pork loin shank boudin chicken."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        info: "Bacon ipsum dolor amet sirloin beef ribs beef tongue, chuck corned beef burgdoggen jerky bresaola pork loin salami venison. Tail bresaola ham venison sirloin. Ball tip pastrami kielbasa, shank pork belly kevin flank boudin capicola jerky short loin brisket. Beef capicola frankfurter, beef ribs tail pork belly kielbasa spare ribs brisket bresaola jowl ball tip short ribs pork loin cupim. Meatloaf kielbasa pork belly, ribeye pork loin boudin brisket venison jowl. Ground round pork loin shank boudin chicken."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        info: "Bacon ipsum dolor amet sirloin beef ribs beef tongue, chuck corned beef burgdoggen jerky bresaola pork loin salami venison. Tail bresaola ham venison sirloin. Ball tip pastrami kielbasa, shank pork belly kevin flank boudin capicola jerky short loin brisket. Beef capicola frankfurter, beef ribs tail pork belly kielbasa spare ribs brisket bresaola jowl ball tip short ribs pork loin cupim. Meatloaf kielbasa pork belly, ribeye pork loin boudin brisket venison jowl. Ground round pork loin shank boudin chicken."
    }
    ];

var seedDB = function(){
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Data removed successfully");
        }
        data.forEach(function(camp){
            Campground.create(camp, function(err, addeddata){
                if (err) {
                    console.log(err);
                } else {
                    Comment.create({
                         text: "Python is the best language!",
                         author: "wasid"
                    }, function(err, comment){
                                if (err) {
                                    console.log(err);
                                } else {
                                   console.log(comment);
                                   addeddata.comments.push(comment);
                                   addeddata.save(function(err, addedcomment){
                                        if (err) {
                                            console.log("Failed to save comment to the DB!");
                                        } else {
                                            console.log(addedcomment);
                                            
                                        }
                                    })
                                }
                            })
                    
                    
                
                
                }
            })
        })
    })
}

module.exports = seedDB;