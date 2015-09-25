var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Block = require('./app/models/block')
var config = require('./config');

//App Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Mongoose Config
mongoose.connect(config.database)

//CORS Config
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next();
});

app.use(morgan('dev'));

//Routes
app.get('/', function(req, res) {
  res.send('Welcome To Block')
})

var apiBlockRouter = require('./app/routes/block')(app, express)

// apiBlockRouter.get('/', function(req, res) {
//   res.send({message: "Welcome to my API"})
// })
app.use('/api', apiBlockRouter);

//Starting the Server
app.listen(config.port);
console.log('Server is spinning on ' + config.port);