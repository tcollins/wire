

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

WIRE.HomeViewModel =	function(){
							var self = this;

							self.message = ko.observable(""),	    // the text of inputted message
							self.messages = ko.observableArray([]);	// list of all the messages
							self.isChating = ko.observable(false);	// used to control input focus
							self.currentTab = ko.observable('messages'); // used to control active tab

							self.isMessagesTab = ko.computed(function() {
								return self.currentTab() === 'messages';	       
							});	
							self.isTeamTab = ko.computed(function() {
								return self.currentTab() === 'team';	       
							});	

							self.addMessage = function(message) {
	        					// adds message to the front of the list
	        					self.messages.unshift(message);
	    					};

	    					self.sendMessage = function(){	    						
	    						console.log(self.message());
	    						var currentUser = new WIRE.User(1,'frank999','205e460b479e2e5b48aec07710c08d50'); 	

	    						if(self.messages().length > 0) {
	    							var firstMsg = self.messages()[0];
	    						}

	    						console.log(firstMsg);

	    						if(firstMsg && firstMsg.user.id === currentUser.id){
	    							// same user, so just update firstMsg body
	    							//firstMsg.body(firstMsg.body() + '<br>' + self.message());
	    							firstMsg.bodylines.push(self.message());

	    						}else{
	    							self.addMessage(new WIRE.Message(currentUser, self.message()));	
	    						}	

	    						// clear message input and keep focus on input
	    						self.message("");
	    						self.isChating(true);
	    					};	

	    						//self.goToFolder = function(folder) { location.hash = folder };
    							//self.goToMail = function(mail) { location.hash = mail.folder + '/' + mail.id };


	    					//self.goToMessagesTab = function(){
	    						////self.currentTab('messages');
	    						//location.hash = 'tcollins-technology';	
	    					//};	

	    					//self.goToTeamTab = function(){
	    						////self.currentTab('team');
	    						//location.hash = 'tcollins-technology/team';
	    					//};	

	    					self.addMessage(new WIRE.Message(new WIRE.User(1,'frank999','205e460b479e2e5b48aec07710c08d50'), 'This is the message body'));
	    					self.addMessage(new WIRE.Message(new WIRE.User(2,'timmyc8m','58c494b702013c0dcb228915e14edeac'), 'Some awesome comments'));

	    					// Client-side routes    
						    Sammy(function() {
						        this.get('/wire#:wireslug', function() {
						            //self.chosenFolderId(this.params.folder);
						            console.log('messages');
						            console.log(this.params);
						            self.currentTab('messages');
						        });
						        this.get('/wire#:wireslug/team', function() {
						            //self.chosenFolderId(this.params.folder);
						            console.log('team');
						            console.log(this.params);
						            self.currentTab('team');
						        });
						        this.notFound = function(){
						        	console.log('NOT FOUND');
						        }
						        
						    }).run(); 	


						},

WIRE.setup =			function(){
							ko.applyBindings(new WIRE.HomeViewModel());
						};

WIRE.OLDsetup = 		function(){

	// Class to represent a row in the seat reservations grid
	function SeatReservation(name, initialMeal) {
	    var self = this;
	    self.name = name;
	    self.meal = ko.observable(initialMeal);

	    self.formattedPrice = ko.computed(function() {
	        var price = self.meal().price;
	        return price ? "$" + price.toFixed(2) : "None";        
	    });
	}

	// Overall viewmodel for this screen, along with initial state
	function ReservationsViewModel() {
	    var self = this;

	    // Non-editable catalog data - would come from the server
	    self.availableMeals = [
	        { mealName: "Standard (sandwich)", price: 0 },
	        { mealName: "Premium (lobster)", price: 34.95 },
	        { mealName: "Ultimate (whole zebra)", price: 290 }
	    ];    

	    // Editable data
	    self.seats = ko.observableArray([
	        new SeatReservation("Steve", self.availableMeals[0]),
	        new SeatReservation("Bert", self.availableMeals[0])
	    ]);
	    
	    self.addSeat = function() {
	        self.seats.push(new SeatReservation("", self.availableMeals[0]));
	    }
	    self.removeSeat = function(seat) { self.seats.remove(seat) }
	    
	    self.totalSurcharge = ko.computed(function() {
	       var total = 0;
	       for (var i = 0; i < self.seats().length; i++)
	           total += self.seats()[i].meal().price;
	       return total;
	    });
	}

	ko.applyBindings(new ReservationsViewModel());

};