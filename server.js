var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = process.env.PORT || 8080;


app.get('/scrape', function(req, res){
  //Scrapies go here
});

app.listen(port);
console.log('Listening on port ' + port);

exports = module.exports = app;
