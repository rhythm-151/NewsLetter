const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");

const bodyParser=require('body-parser');

const app =express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
res.sendFile(__dirname+"/signup.html");
});
app.post("/",function (req,res) {
var firstName = req.body.fName;
var lastName = req.body.LName;
var email = req.body.Email;

mailchimp.setConfig({
 apiKey: "c42275cf112a7b52e87e8d28853f2763-us18",
 server: "us18",
});
const list_id = "620c59f541";
const run = async () => {
 try {
   const response = await mailchimp.lists.batchListMembers
   (list_id, {
     members: [{
       email_address:email,
       status:"subscribed",
       merge_fields:{
           FNAME:firstName,
           LNAME:lastName
       }
       }],
     });
       res.sendFile(__dirname + "/success.html")
     } catch (e) {
       {
         console.log(e);

         res.sendFile(__dirname + "/failure.html")
       }
     }

   };


run();

})





app.listen(process.env.PORT || 3000,function () {
console.log("Server running on 3000");
});
//c42275cf112a7b52e87e8d28853f2763-us18-api key
//  620c59f541
