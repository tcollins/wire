
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Wire' });
};

exports.notfound = function(req, res){
	res.render('404', { title: 'Wire - Page Not Found' });
};