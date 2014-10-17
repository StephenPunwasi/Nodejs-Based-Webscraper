var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = process.env.PORT || 8080;


app.get('/scrape', function(req, res){

  //Input url to scrape

  url = 'http://www.imdb.com/title/tt1495708/'
  request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        //CREATE VARIABLES YOU WOULD LIKE TO SCRAPE
        var title, release, rating;

        //CREATE A JSON HOLDER FOR INFORMATION TO BE SCRAPED
        var json = {title :"", release:"",rating:""};

        //DEFINE WHERE THE SCRAPER SHOULD FIND THE INFORMATION
        $(".header").filter(function(){
          var data = $(this);
          title = data.children().first().text();
          json.title = title;
        });
        $(".header .nobr").filter(function(){
          var data = $(this);
          release = data.text();
          json.release = release;
        })
        $('.star-box-giga-star').filter(function(){
          var data = $(this);
          rating = data.text();
          json.rating = rating;
        })
      }

      //WRITE TO FILE OR DATABASE
      fs.writeFile('output.json', JSON.stringify(json, null, 4),
      function(err){
          console.log('File successfully written! - Check the directory for output.json')
      });

      //NOTIFICATION IT'S DONE
      res.send('message in console');
  });
});

app.listen(port);
console.log('Listening on port ' + port);

exports = module.exports = app;
