

WIRE.VM	= {
	init: 				function(){
							var self = this;

							console.log('WIRE.VM.init');	

							this.message = ko.observable("");	    // the text of inputted message
							this.messages = ko.observableArray([]);	// list of all the messages
							this.isChating = ko.observable(false);	// used to control input focus
							this.currentTab = ko.observable('messages'); // used to control active tab

							this.newWireName = ko.observable("");	// the text inputed in the add new wire dialog
							this.newWireNameInvalid = ko.observable(false);	// used to control validation styles in the add new wire dialog

							this.isMessagesTab = ko.computed(function() { return self.currentTab() === 'messages'; });	
							this.isTeamTab     = ko.computed(function() { return self.currentTab() === 'team'; });	

							

							this.addMessage(new WIRE.Message(new WIRE.User(1,'frank999','205e460b479e2e5b48aec07710c08d50'), 'This is the message body'));
	    					this.addMessage(new WIRE.Message(new WIRE.User(2,'timmyc8m','58c494b702013c0dcb228915e14edeac'), 'Some awesome comments'));
	
							// setup clientside routes
							this.initSammy();

							// setup knockout bindings
							ko.applyBindings(this);	

						},

	initSammy: 			function(){
							var vm = this;

							// Client-side routes    
						    Sammy(function() {
						        this.get('/wire#new-wire',				function() { vm.addNewWire() });
						        this.get('/wire#:wireslug',				function() { vm.currentTab('messages'); });
						        this.get('/wire#:wireslug/team',		function() { vm.currentTab('team'); });
						        this.notFound = 						function() { console.log('NOT FOUND'); };						        
						    }).run(); 	
						},

	addMessage: 		function(message){
							// adds message to the front of the list
	        				console.log(message);
	        				this.messages.unshift(message);
						},

	sendMessage: 		function(){
							console.log(this.message());
    						var currentUser = new WIRE.User(1,'frank999','205e460b479e2e5b48aec07710c08d50'); 	

    						if(this.messages().length > 0) {
    							var firstMsg = this.messages()[0];
    						}

    						console.log(firstMsg);

    						if(firstMsg && firstMsg.user.id === currentUser.id){
    							// same user, so just update firstMsg body
    							//firstMsg.body(firstMsg.body() + '<br>' + self.message());
    							firstMsg.bodylines.push(this.message());

    						}else{
    							this.addMessage(new WIRE.Message(currentUser, this.message()));	
    						}	

    						// clear message input and keep focus on input
    						this.message("");
    						this.isChating(true);
						},

	addNewWire: 		function(){
							var vm = this;

				            console.log('new wire');
				            console.log(this.params);
				            // this will make the dropdown go away after being clicked
				            $('li.dropdown.open').removeClass('open');

				            // TODO... need to only add this event handler once
				            // TODO... need to handle pressing return key
							$('#newWireModal')
								.modal()
								.on('hidden', function () {
									console.log('modal hidden');
									vm.newWireNameInvalid(false);
									vm.newWireName('');
									location.hash = '#';
								})
								.modal('show');
						},

	saveNewWire: 		function(){
							console.log('save new wire');
							//var wireName = $('#newWireModalInputName')	

							console.log(this.newWireName());
								
							if(this.newWireName() && this.newWireName().length > 0){
								$('#newWireModal').modal('hide');	
							}else{
								this.newWireNameInvalid(true);
							}

							
							//this.newWireNameValid(false);


							//$('#newWireModal').modal('hide');
						}					
					
};
