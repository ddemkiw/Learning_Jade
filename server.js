var express = require('express');
var app = express();
var server = require('http').createServer(app);
var stylus = require('stylus')
var nib = require('nib')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))


app.get('/', function(request, response){
  response.render('index',  { title : 'Home' });
  
});

server.listen(3000, function(){
  console.log("Server listening on port 3000");
});

module.exports = server;