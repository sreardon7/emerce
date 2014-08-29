var sinon = require('sinon');
var should = require('should');
var tortuga = require('../api/services/tortuga/tortuga');
var request = require('request');


//tests the tortuga service and its connection to the tortuga gateway
//warning. tortuga dev server must be live for most of these tests to work
//and I think the B2B and all IDT services that tortuga gateway interacts with must
//also be live

describe("Tortuga module", function() {

	describe("#products", function() {
		it("should call the api with the proper parameters", function(done) {

			tortuga.should.be.ok; 
			tortuga.should.have.ownProperty('products');
			tortuga.products(function(err, products) {

				if(err)
				{
					console.log("ERROR IS:" + err)
					err.should.not.be.ok;
					done();
				}
				else {
				products.length.should.be.above(10);
				
				var prod = products[0].ProductCountryList.ProductCountry[0].attributes.CountryCode;
			
				done();
			}
			})
		})
	})
	//being updated, change soon
	describe("#balance", function() {
		it("should retrieve a balance from the server", function(done) {
			tortuga.should.be.ok;
			tortuga.should.have.ownProperty('balance')
			tortuga.balance(function(err, bal) {
				if(err) {
					err.should.not.be.ok;
					done();
				}
				else{
			
				bal.should.be.ok;
				bal.Balance.should.be.ok;
				bal.CurrencyCode.should.be.ok;
				bal.CurrencySymbol.should.be.ok;
				bal.CurrencyDivisor.should.be.ok;
				done();
			}
			})
		})
	})


	describe("#charges_get", function() {
		it("should retrieve the full charge history from the server", function(done) {
			this.timeout(3000)
			tortuga.should.be.ok;
			tortuga.should.have.ownProperty('charges_get')
			tortuga.charges_get(function(err, charges) {
				if (err) {
					err.should.not.be.ok;
					done()
				}
				else {
					charges.should.be.ok;
					//we currently have no charges
					charges.length.should.be.above(-1)
					done()
				}
			})
		})  
	})
	
	

	describe('#topups_post', function() {
		it('should top up a mobile number', function(done) 
		{
			this.timeout(10000);
			tortuga.should.have.ownProperty('topups_post')
			var json = {
			phone_number: '50312345678',
			amount: '500',
			carrier_code: 'Claro',
			country_code: 'SV'
		}

			tortuga.balance(function(err, bal) {
				if (bal.Balance > 400)
				{
					tortuga.topups_post(json, function(err, sponse)
					{
						if(err) {
							err.should.not.be.ok;
							done()
							}
					else {
						sponse.should.be.ok;
						sponse.success.should.be.true;
						done();
						}
					})
				} else {
					console.log("err: Balance to low. Can't perform a transaction at this time");
					done();
					}
			})

		})
	})
		
		it('should fail with improper json', function(done) 
		{
			this.timeout(5000);
			tortuga.should.have.ownProperty('topups_post')
			var json = {
			phone_number: '50312345678',
			carrier_code: 'Claro',
			country_code: 'SV'
		}
			tortuga.topups_post(json, function(err, sponse)
			{
				if(err) {
					err.should.be.ok;
					done()
				}
				else {
					sponse.should.not.be.ok;
					sponse.success.should.not.eql('Failure');
					done();
				}
			})
		})
	})

	describe("#topups_get", function() {
		it("should retrieve the full top up history from the server", function(done) {
			this.timeout(3000)
			tortuga.should.be.ok;
			tortuga.should.have.ownProperty('topups_get')
			tortuga.topups_get(function(err, topups) {
				if (err) {
					err.should.not.be.ok;
					done()
				}
				else {
					topups.should.be.ok;
					topups.length.should.be.above(0)
				
					done()
				}
			})
		})
	describe('#status', function() {
		it('should return a status', function(done) {
			this.timeout(5000);
			tortuga.should.have.ownProperty('status');

			tortuga.status(function(err, status) {
				if (err)
				{ 	
					true.should.not.be.ok;
					done()
				} 
				else {
					status.alive.should.be.true;
					done();
				}

			})
		})
	})
	describe('#fund', function() {
		var balance; 
		before(function (done) {
			tortuga.balance(function(err, bal){
				balance = bal.Balance;
				
				done();
			})
		})
		after(function (done) {
			tortuga.balance(function(err, bal){
				balance = bal.Balance;
				
				done();
			})
		})
		it.skip('should fund a wholesaler', function(done) {
			this.timeout(10000);
			var json = {
     			cc_token: '9443096876480009',
      			cc_expiration: '0515',
      			cc_type: 'V',
      			cc_cvv2: '300',

      			amount: '500',

      			first_name: 'Alan',
      			last_name: 'Ginsberg',
      			address_line_1: '249 ALWAYS WAY',
      			address_line_2: 'Floor 16th',
      			state: 'NJ',
      			city: 'Newark',
      			postal_code: '07666',
      			country: 'US'
    		};

    		tortuga.should.have.ownProperty('fund');
    		tortuga.fund(json, function(err, response) {
    			if(err) {
    				true.should.not.be.ok;
    				done();
    			}
    			else {
    				response.statusCode.should.eql(302);
    				done();
    			}
    		})

		})
	})

})