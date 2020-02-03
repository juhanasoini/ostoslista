require('dotenv').config();

const PORT = process.env.ENV === 'PROD' ? process.env.PORT : process.env.DEV_PORT || 8001;
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('./models/user.model');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true,  useFindAndModify: false  } || null);

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

app.use((req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  if( process.env.ENV == 'DEV' )
    console.log(m);
  
  next();
});

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

if (process.env.ENV === 'PROD') {
  app.use(express.static('client/dist'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});