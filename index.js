const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');
const { DB_URL } = require('./management/params.js');

const setUpPassport = require('./setuppassport');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, {useUnifiedTopology:true,
  useNewUrlParser:true,
  useCreateIndex:true});

mongoose.set('useFindAndModify', false);

setUpPassport();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json( { limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded( { limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(session({
    secret:'GENERATE_SECURE_SKEY',
    resave: false,
    saveUninitialized: false
}));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./routes/web'));
app.use('/api', require('./routes/api'));

app.use(express.static('public'));
app.use('/modules', express.static(__dirname + '/node_modules'));

server.listen(app.get('port'), function(){
  console.log('Server started on port ' + app.get('port'));
});
