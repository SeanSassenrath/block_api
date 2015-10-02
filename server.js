var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Block = require('./app/models/block')
var config = require('./config');

//App Config

//Mongoose Config
mongoose.connect(config.database)

//Express Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Session Support
//TODO
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

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
var apiAuthRouter = require('./app/routes/auth')(app, passport);

app.use('/api', apiBlockRouter);
app.use('/auth', apiUserRouter);

//Starting the Server
app.listen(config.port);
console.log('Server is spinning on ' + config.port);