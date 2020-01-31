require('dotenv').config();

const PORT = process.env.ENV === 'PROD' ? process.env.PORT : process.env.DEV_PORT || 8001;
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('./models/user.model');

app.use( bodyParser.urlencoded( {
	extended: true
}) );

// const corsConfig = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://node.local:8000')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     next()
// }

// app.use(corsConfig);

app.use( session( {
	secret: 'kjf&/(),jhdsfpius98ersfk(/&()',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000000
	}
}));

const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

app.use( '/api' , ( req, res, next ) =>{
	return res.status(404).json( { 'error': true } );
} );

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});