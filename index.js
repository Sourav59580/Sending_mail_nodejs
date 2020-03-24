const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();

//set view engine
app.set("view engine","ejs");

//middleware
app.use(bodyParser.urlencoded({extended:false}));




//routes
app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/send",(req,res)=>{
    var email = req.body.email;
    var subject = req.body.subject;
    var text = req.body.text;
    var transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : "enter your email",
            pass : "password"
        }
    });

    var mailOption = {
        from : "enter your email",
        to : email,
        subject : subject,
        text : text 
    };

    transport.sendMail(mailOption,(err,info)=>{
        if(err) throw err
        res.send('Email sent: ' + info.response);
    })
})



//server connection
const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
    console.log("server in running at port 3000");
})