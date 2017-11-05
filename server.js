
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();



app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});



var routes = require('./routes/app.js');


app.get('/', routes.index); 


app.post('/api/create', routes.create); 
app.get('/api/get/:id', routes.getOne); 
app.get('/api/get', routes.getAll); 
app.put('/api/update/:id', routes.update); 
app.post('/api/delete/:id', routes.remove); 


app.use(function(req, res, next){

  var jsonData = {
    status: 'ERROR',
    message: 'Sorry, we cannot find the requested URI'
  }
  
  res.status(404).send(jsonData);

});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});