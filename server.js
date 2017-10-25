const express = require('express');
const app = express();

const path = require('path');

// If an incomuing request uses a protocol other than HTTPS,
// redirect that request to th esame url but with https

const forceSSL = function(){
  return function(req, res, next){
    if (req.headers['x-forwarded-proto'] != 'https'){
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}


// Instruct the app to use the forceSSL middleware

app.use(forceSSL());


// Run the app by serving the static files in the dist directory

app.use(express.static(__dirname + '/dist'));


// Start the app by listening on the default Heroku protractor

app.listen(prcoess.env.PORT || 8080);


// For all GET requests, send back index.html so that
// PathLocationStrategy can be used

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})