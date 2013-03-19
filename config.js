var config = {}

	config.title = "Wire";

if(process.env.NODE_ENV === 'production'){
	//==================================================
	//== PRODUCTION
	//==================================================
	config.twitter = {
		consumerKey: 'not-ready-yet',
	    consumerSecret: 'not-ready-yet',
	    callbackURL: "not-ready-yet"
	};

	config.mongoUrl = 'mongodb://localhost/wire';
	//config.mongoUrl = 'mongodb://username:password@host:port/database?options...';
	config.mongoStoreConfig = {url: config.mongoUrl};
	

}else{
	//==================================================
	//== DEVELOPMENT
	//==================================================
	config.twitter = {
		consumerKey: '8yNsGpWeenbrvmEexx08yw',
	    consumerSecret: 'KolQiz9CBe8W5Vmrdt26qbQInU8MMHka2ZuNR8',
	    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	};

	config.mongoUrl = 'mongodb://localhost/wire';
	config.mongoStoreConfig = {url: config.mongoUrl};

	
}

module.exports = config;
