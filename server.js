// server.js
// where your node app starts

'use strict'

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.route('/api/timestamp/:input?')
  .get( (req,res) => {
    let date = null

    if (req.params.input !== undefined) {
      let unixTime = parseInt(req.params.input * 1)

      if (!isNaN(unixTime)) {
        date = new Date(unixTime)
      }
      else {
        date = new Date(req.params.input)
      }
    }
    else {
      date = new Date(Date.now())
    }

    let result = {
        'unix': date == 'Invalid Date' ? null: date.getTime(),
        'utc': date == 'Invalid Date' ? 'Invalid Date': date.toUTCString()
      }

    res.json(result)
})


app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('404 Not Found')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});