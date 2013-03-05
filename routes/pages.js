
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
	return res.redirect('/');
};

exports.loginFailed = function(req, res){
	console.log('loginFailed');
	console.log(req.user);
	return res.redirect('/');
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