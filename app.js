
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



passport.use(new LocalStrategy(
	function(username, password, done) {
		//User.findOne({ username: username, password: password }, function (err, user) {
		//	done(err, user);
		//});
		console.log('my LocalStrategy');
		console.log(username + " / " + password);

		var user = {name: 'Timmy C'};

		done(null, user);
	}
));





var testFilter = function(req, res, next){
	console.log('testFilter');	
	var allowed = true;

	if(allowed){
		next();
	}	
	else{
		//next('route');			
		//res.send({error: 'You are not authenticated'});
		res.redirect('/api/notauthorized');
		
	}
};

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api', api.index);
app.get('/api/login', api.login);
app.get('/api/notauthorized', api.notauthorized);
app.get('/api/failedlogin', api.failedlogin);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
