
var config = require('../config');

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

// Models
var User = require('../models/user');
var Token = require('../models/token');



/**
* This gets called after the user has been successfully logged in.
* This is chance to grab info from the profile to populate our user object
* 
*/
function setupUserAfterLogin(token, tokenSecret, profile, done){

  console.log('in twitter strategy callback');

  var provider = {};
  provider.providername = profile.provider;  
  provider.username = profile.username;
  provider.displayname = profile.displayName;
  provider.location = profile._json.location;
  provider.url = profile._json.url;

  var finalReturnCallback = function(err, user, done){
    console.log("inside finalReturnCallback");
    if(err){          
      return done(err);
    }else{
      return done(null, user);
    }
  };

  User.findByProviderUserName(provider.providername, provider.username, function(err, users){
    if(err){
      console.log("Error in save");
      console.log(err);      
      return done(err);

    }else{

      console.log('---------- users -------------');

      var user;

      if(users.length > 0){

        console.log('-- populating existing');

        // user exists, so populate it
        user = new User(users[0]);

        
        Token.generateTokenAndSave(user.id, function(err){
          return finalReturnCallback(err, user, done);
        });


      }else{
        // new user, so create it
        console.log('-- creating new user');
        user = new User();
        user.name = provider.displayname;
        user.username = provider.username;
        user.email = "";
        user.providers.push(provider);

        // save the user
        user.save(function(err){
          if(err){              
            return done(err);
          }else{
            console.log("User Saved");  
            console.log(user.id); 
             
            Token.generateTokenAndSave(user.id, function(err){
              console.log("inside generateTokenKey callback");
              return finalReturnCallback(err, user, done);
            });
          }
        });

      }

      
      

    }
  });

/*
  var provider = {};
  provider.providername = profile.provider;  
  provider.username = profile.username;
  provider.displayname = profile.displayName;
  provider.location = profile._json.location;
  provider.url = profile._json.url;

  var user = new User();
  user.name = provider.displayname;
  user.username = provider.username;
  user.email = "";
  user.providers.push(provider);

  console.log(user);

  user.save(function(err){
    if(err){
      console.log("Error in save");
      console.log(err);      
      return done(err);
    }else{
      console.log("User Saved");      
      return done(null, user);
    }
  });

*/
  
  //console.log(user);

  //return done(null, user);
}



exports.initialize = function(){

  passport.serializeUser(function(user, done) {    
    //console.log('passport.serializeUser');    
    done(null, user.id);
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


