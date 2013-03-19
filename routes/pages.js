
var config = require('../config');


// Home Page
exports.index = function(req, res){
	
	console.log('pages:index');
	console.log('req.user');
	console.log(req.user);

	res.render('index', { title: config.title, tab: 'signup' });
};

// Login
exports.login = function(req, res){
	res.render('index', { title: config.title, tab: 'login' });
};

exports.loginSuccess = function(req, res){
	console.log('loginSuccess');
	console.log(req.user);

	var user = req.user;
	if(user.email && user.email.length > 2){
		return res.redirect('/wire');
	}else{
		return res.redirect('/first-time-setup');
	}
};

exports.loginFailed = function(req, res){
	console.log('loginFailed');
	console.log(req.user);
	return res.redirect('/');
};

exports.firstTimeSetup = function(req, res){
	
	console.log('pages.firstTimeSetup');
	res.render('first-time-setup', { title: config.title });
};


exports.wire = function(req, res){
	
	console.log('pages:index');
	console.log('req.user');
	console.log(req.user);



	res.render('wire', { title: 'Wire' });
};

exports.notfound = function(req, res){
	res.render('404', { title: 'Wire - Page Not Found' });
};