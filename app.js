require('dotenv').config();
//https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522
const PORT = process.env.ENV === 'PROD' ? process.env.PORT : process.env.DEV_PORT || 8001;
const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const sslRedirect = require('heroku-ssl-redirect');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {is_logged_handler} = require( './lib/isLoggedIn' );
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// enable ssl redirect
app.use(sslRedirect());

require('./models/user.model');
require('./models/shoppinglist.model');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true,  useFindAndModify: false, useCreateIndex: true } || null);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  if( process.env.ENV == 'DEV' )
  {
    console.log(m);
  }
  
  next();
});

app.use( cookieParser() );
app.use( session( {
	secret: 'kjf&/(),jhdsfpius98ersfk(/&()',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000000
	}
}));
app.use(passport.initialize());
app.use(passport.session());

const userModel = mongoose.model('User');
passport.use( new LocalStrategy(
    {
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        userModel.findOne( { username: username }, function( err, user ) {
            if( err )
                return done( err );

            if( !user )
                return done( null, false, { message: 'Käyttäjänimi tai salasana väärin!' } );
            
        
            if( !user.validPassword( password ) )
                return done( null, false, { message: 'Käyttäjänimi tai salasana väärin!' } );
            return done( null, user );
        });
    }
));
passport.serializeUser(function(user, done) {
  // console.log( user );
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userModel.findById(id, function(err, user) {
    // console.log( user );
    done(err, user);
  });
});


if( process.env.ENV === 'PROD' && process.env.DO_REDIRECT == "true" )
{
	app.use (function (req, res, next) {
    	if( req.protocol === 'https' || req.headers.host == 'node.local' )
        	next();
    	else
    		return res.redirect('https://' + req.headers.host + req.url);
	});
}

app.get('/', (req, res, next) => {
    if( !req.user )
        return res.status(401).redirect('/login');

    next();
});

app.use('/logout', (req, res, next) => {
    req.session.destroy();
    req.logout();
    return res.redirect('/login');
});

const userRoutes = require('./routes/user.routes')(app, passport);
const listRoutes = require('./routes/list.routes');
app.use('/api', userRoutes);
app.use('/api', listRoutes);

app.use( '/api' , ( req, res, next ) =>{
	return res.status(404).end();
} );

if (process.env.ENV === 'PROD') 
{
  app.use("/", expressStaticGzip( 'client/dist' ));
	app.use(express.static('client/dist'));
	const path = require('path');
	app.get('*', (req,res) => {
  		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
	});
}

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});