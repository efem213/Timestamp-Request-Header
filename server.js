
// server.js
// where your node app starts
const dotenv = require("dotenv");

dotenv.config();
// init project
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.database_uri, { useNewUrlParser: true, useUnifiedTopology: true });

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});

app.get("/requestHeaderParser", function (req, res) {
  res.sendFile(__dirname + '/views/requestHeaderParser.html');
});

app.get("/urlShortener", function (req, res) {
  res.sendFile(__dirname + '/views/urlShortener.html');
});

//Build Schema and model to store saved URLs
var ShortUrl = mongoose.model('ShortURL', new mongoose.Schema({ 
  short_url: String,
  original_url: String,
  suffix: String
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/shorturl', (req, res) => {  
 
  let client_requested_url = req.body.url
  let suffix = shortid.generate();
  //console.log(suffix, " <= This will be our suffix");
  let newURL = ShortUrl({
    short_url: __dirname + "/api/shorturl/" + suffix,
    original_url: client_requested_url,
    suffix: suffix
  })
  newURL.save((err, doc) => {
    if(err) return console.error(err);
   // console.log("Document insterted succussfully");
    res.json({
      "saved": true,
      "short_url": newURL.short_url,
      "original_url": newURL.original_url,
      "suffix": newURL.suffix
    });
  });
  // create user in req.body
});






app.get("/api/shorturl/:suffix", (req, res) => {
  let userGeneratedSuffix = req.params.suffix;
  ShortUrl.find({suffix: userGeneratedSuffix}).then((foundUrls) => {
    let urlForRedirect = foundUrls[0];
    res.redirect(urlForRedirect.original_url);
  });
});





// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//Header Request
app.get("/api/whoami", (req, res) => {
 //console.log(req);
  res.json({
    "ipaddress": req.ip,
    "language": req.headers['accept-language'],
    "software": req.headers['user-agent']
  });
});





app.get("/api", (req, res) => {
  var now = new Date()
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});



//Timestamp Project
app.get("/api/:date", (req, res) => {

  let dateString = req.params.date;

  if (parseInt(dateString) > 10000) {
    let unixTime = new Date(parseInt(dateString));
    res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    });
  }

  let passedInValue = new Date(dateString);

  if (passedInValue == "Invalid Date" )  {
    res.json({"error" : "Invalid Date" });
  } else {
    res.json({
      "unix": passedInValue.getTime(),
      "utc": passedInValue.toUTCString()
    })
  }
});






// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
