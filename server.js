var express = require("express");
var mongoose = require("mongoose")

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/hwScraper", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();

      // Create a new Article using the `result` object built from scraping
      db.Video.create(result)
        .then(function(dbVideo) {
          // View the added result in the console
          console.log(dbVideo);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

app.get("/videos", function(req, res) {
  // Grab every document in the Videos collection
  db.Video.find({})
    .then(function(dbVideo) {
      // If we were able to successfully find Videos, send them back to the client
      res.json(dbVideo);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


let Port = 8080

app.listen(Port, function() {
  console.log("http://localhost:" + Port);
});