const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser')
const session = require('express-session')

//connect to db
mongoose.connect(config.database, {useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("success to connect db");
});

//Init App
const app = express();

//body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
//express-session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//express-messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//PORT
const PORT =process.env.PORT || 3300;

//setup view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

//setup static public
app.set(express.static(path.join(__dirname,'public')));

//routes
const pages = require('./routes/pages');

//adminroutes
const adminpages = require('./routes/adminPages');

app.use('/',pages);
app.use('/admin/pages',adminpages);




//Listen Request
app.listen(PORT,()=>{
    console.log(`Your Server is running at ${PORT}`)
})