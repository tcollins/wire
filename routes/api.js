
var passport = require('passport');

/*
 * GET api index.
 */

exports.index = function(req, res){
  res.send("api index !!!");
};

exports.login = function(req, res, next){
	//var json = {};
	//json.token = 'sd7sgf8ba7d9c7vsdczxs-f97sdg0-ojhkgfjh7908favxz';  

//res.send(json);

	req.query.username = 'timmyc8m';
	req.query.password = 'password12345';

	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/api/failedlogin');
		}
		
		console.log('exports.login');
		console.log(user);

		var json = {};
		json.token = 'sd7sgf8ba7d9c7vsdczxs-f97sdg0-ojhkgfjh7908favxz';  

		res.send(json);		

	})(req, res, next);




};


exports.notfound = function(req, res){
	var json = {};
	json.error = 404;
	json.message = 'Invalid API URL';    
	res.send(json.error, json);
};

exports.notauthorized = function(req, res){
	var json = {};
	json.error = 401;
	json.message = 'Not Authorized';    
	res.send(json.error, json);
};

exports.errorHandler = function(err, req, res, next){
	var json = {};
	json.error = 500;
	json.message = 'An unknown error occurrec'; 
	json.details = err;   
	res.send(json.error, json);
};

exports.failedlogin = function(req, res){
	var json = {};
	json.error = 9991;
	json.message = 'Login Failed';    
	res.send(json);
};
