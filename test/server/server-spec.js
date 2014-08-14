// var request = require ('supertest');
// var ucon = require('../../api/controllers/UserController');
// var Sails = require('sails');
// describe('User Controller', function () {




// 	 beforeEach(function (done) 
//    {
//       Sails.lift(
//       {log: { level: 'error'} },
//       function (err, sails) {
//         console.log("sails")
//         app = sails;
//         done();
//       })
//       console.log('hey')
//    })


// 	it("should work with the configured server", function()
// 	{
// 		console.log(1)
// 		expect(1).toEqual(1);
// 	})

// 	afterEach(function (done)
// 	 {
//     	app.lower(done);
// 	 });
// })












	//var app = express();
	//describe('New call', function ()
	// {
	// 	//console.log(request);
	// 	ucon.new(request, request);
	// })









/*var server = require('sails');
var express = require('express');
describe('Routing', function() {

	var app;
	beforeEach(function(done) {
		console.log(express);
		
		server.lift({
			log: {
				level: 'error'
			},
		}, function(err, sails) {
			console.log('sails lifted');
			app = sails; 
		
			done(err, sails);
		});
		console.log('something');
	});

	it("a server should exist", function() {
		

			expect(app).toBeUndefined();
			expect(app).tobeDefined();
			expect(1).toEqual(2);
		})
	
})*/
/*
var request = require('supertest')
  , express = require('express');
var sails = require('sails');
describe('please work', function () {
//var app = express();
console.log(sails.express)
it("should do fail", function() {
sails.express.app.get('/user', function(req, res){
  res.send(200, { name: 'tobi' });
});

request(sails.express.app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });
  console.log(request(sails.express.app).get('/user'))

  expect(1).toEqual(1);
})
})


/*
   Global before() and after() launcher for Sails application
   to run tests like Controller and Models test
*/
/*
var supertest = require("supertest")
describe('pls', function() {
beforeEach(function(done) {
  // Lift Sails and store the app reference
  require('sails').lift({

    // turn down the log level so we can view the test results
    log: {
      level: 'error'
    },

  }, function(err, sails) {
       // export properties for upcoming tests with supertest.js
       console.log("test");
       sails.localAppURL = localAppURL = ( sails.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';
       // save reference for teardown function
       console.log("test");
       done(err);
     });

});

// After Function
afterEach(function(done) {
  sails.lower(done);

})

/*
   A simple test to demonstrate request checks
   with mocha and supertest




describe('HTTP Sails Test:', function () {
  describe('HTTP SuperTests:', function () {

    it ('should request "/" on server', function (done) {
      supertest(sails.express.app)
        .get('/')
        .expect(200, done);
    }),

    it ('should request "/foo" on server', function (done) {
      supertest(sails.express.app)
        .get('/foo')
        .expect(200, done)
    })

  })
})

*/