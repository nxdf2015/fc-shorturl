'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require("body-parser")
var {URLMap}= require("./helper.js")

var dns = require("dns")
var URL = require("url").URL



// console.log(URLMap)
var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: true }));




  

app.post("/api/shorturl/new/", function (req, res) {
  
  const url = req.body.url.trim()
  
 try {
  var urlClient = new URL(url);
     //dns.lookup(url,(err,data) => {if (err!=null) {throw new Error()}})
    const id = URLMap.setUrl(url)
    res.json({"original_url":url , "short_url" : id})
  }
  catch(e){
    res.json({error: "invalid URL"})
  }
   
});

app.get("/api/shorturl/:id" ,function(req,res){
  const id = parseInt(req.params.id)
   
  res.redirect(URLMap.getUrl(id))
})


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});