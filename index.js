// index.js
// where your node app starts

// init project
require('dotenv').config();
let bodyParser = require("body-parser");
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your first API endpoint...
app.get("/api/whoami", function (req, res) {
  console.log("req", req.headers);
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  var lang = req.headers["accept-language"];
  var software = req.headers["user-agent"];

  console.log("reeee", ip, lang, software);
  //   {"ipaddress": req.ip ,"language":"en-US,en;q=0.5",
  // "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}
  res.json({ ipaddress: ip, language: lang, software: software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
