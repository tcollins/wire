
var config = require('../config');

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;


/**
* This gets called after the user has been successfully logged in.
* This is chance to grab info from the profile to populate our user object
* 
*/
function setupUserAfterLogin(token, tokenSecret, profile, done){
      /*
      User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
      */

  var user = {};
  user.token = token;
  user.tokenSecret = tokenSecret;
  user.provider = profile.provider;
  user.displayName = profile.displayName;
  user.username = profile.username;
  user.oauthId = profile._json.id_str;
  user.location = profile._json.location;
  user.url = profile._json.url;

  // TODO we should probably persist the user here

  console.log('in twitter strategy callback');
  //console.log(user);

  return done(null, user);
}



exports.initialize = function(){

  passport.serializeUser(function(user, done) {    
    //console.log('passport.serializeUser');    
    done(null, user.username);
  });

  passport.deserializeUser(function(obj, done) {
    //console.log('passport.deserializeUser');
    done(null, obj);
  });

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    setupUserAfterLogin    
  ));

};





/*
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
*/


/*
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
*/


