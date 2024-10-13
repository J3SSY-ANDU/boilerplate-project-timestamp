// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(`/api/:date?`, (req, res) => {
  let dateParam = req.params.date;
  let date;
  if (!dateParam) {
    // If no date provided, use current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If the date is a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Try to parse the date string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),  // Full Unix timestamp
      utc: date.toUTCString() // UTC string format
    });
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
