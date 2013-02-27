var config = {}

if(process.env.NODE_ENV === 'production'){
	//==================================================
	//== PRODUCTION
	//==================================================
	config.twitter = {
		consumerKey: 'not-ready-yet',
	    consumerSecret: 'not-ready-yet',
	    callbackURL: "not-ready-yet"
	};



}else{
	//==================================================
	//== DEVELOPMENT
	//==================================================
	config.twitter = {
		consumerKey: '8yNsGpWeenbrvmEexx08yw',
	    consumerSecret: 'KolQiz9CBe8W5Vmrdt26qbQInU8MMHka2ZuNR8',
	    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	};
}

module.exports = config;