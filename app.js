
/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'development';
//process.env.NODE_ENV = 'production';

var config = require('./config');

//console.log(config);

var express = require('express')    
  , pages = require('./routes/pages')
  , api = require('./routes/api')
  , auth = require('./services/auth')
  , http = require('http')
  , path = require('path');

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

var MongoStore = require('connect-mongo')(express);



console.log(config.mongoUrl);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  //app.use(express.cookieSession({ secret: 'blackbeermmm!', cookie: { maxAge: 60 * 60 * 1000 }}));
  app.use(express.session({secret: 'blackbeermmm!', store: new MongoStore(config.mongoStoreConfig)}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.session({ secret: 'blackbeermmm' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api', api.notfound);
  app.use(pages.notfound);
  app.use('/api', api.errorHandler);
  // TODO add a catch all error handler for production
});


app.configure('development', function(){	
	app.use(express.errorHandler());
});

// initialize authentication
auth.initialize();


app.get('/', pages.index);
app.get('/login', pages.login);
app.get('/login-success', pages.loginSuccess);
app.get('/login-failed', pages.loginFailed);
app.get('/login', pages.login);
app.get('/first-time-setup', pages.firstTimeSetup);
app.get('/wire', pages.wire);

app.get('/api', api.index);
app.get('/api/test', api.test);
app.get('/api/login', api.login);
app.get('/api/notauthorized', api.notauthorized);
app.get('/api/failedlogin', api.failedlogin);

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter', { session: false }));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/login-success',
                                     failureRedirect: '/login-failed' }));


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + " - " + process.env.NODE_ENV);
});
