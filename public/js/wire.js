

//*********************************************
//** CUSTOM KNOCKOUT BINDINGS
//*********************************************

/**
* RETURN key binding
*/
ko.bindingHandlers.returnKey = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		ko.utils.registerEventHandler(element, 'keydown', function(evt) {
			if (evt.keyCode === 13) {
				evt.preventDefault();
				evt.target.blur();
				valueAccessor().call(viewModel);
			}
		});
	}
};


//*********************************************
//** WIRE NAMESPACE
//*********************************************
var WIRE	= {};

//*********************************************
//** Models
//*********************************************
WIRE.User =				function(id, username, hash){
							var self = this;
							self.id = id;
							self.username = username;
							self.hash = ko.observable(hash);

							self.avatarUrl = ko.computed(function() {
								var md5 = self.hash();
								return 'http://www.gravatar.com/avatar/'+md5+'?s=40';        
							});

						};

WIRE.Message =			function(user, body){
							var self = this;
							self.user = user; // should be set to a User Model
							//self.body = ko.observable(body);
							self.bodylines = ko.observableArray([body]);
						};
