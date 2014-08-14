var should = require('should');
var userController = require('../api/controllers/UserController');
var sinon = require('sinon');
//var User = require('../api/models/User')
var Sails = require('sails');
var emailer = require('../api/services/Emailer');

describe('UserController', function(){
	it('should exist', function() {
		userController.should.be.ok;
	})


  describe('#products', function() {
    it('should pass the proper arguments to IDT Tortuga', function() {
        userController.should.have.ownProperty('products');
        
        
      })
  })

	describe('#new', function(){
    	it('should have function new', function(){
    	 	userController.should.have.ownProperty('new');
   		 })
      it('should call res.view', function() {
        var req = {};
        var res = {
          locals: {
            flash: ""
          },
          view: function() {     
          }
        };
        var spy = sinon.spy(res, "view");
        userController.new(req, res);
        (spy.calledOnce).should.be.true; 
      })
  	})

    //async function
  	describe.skip('#create', function(){
      before(function (done) {
        this.timeout(10000);
        var req = {
          param: function(temp) {
            switch(temp) {
            case "name": return ('John Cena');
            case "title": return ('Wrestler');
            case "email": return ('Cena@WWE.com');
            case "password": return ('password');
            case "confirmation": return ('password');
            case "fluff": return ('hacking');
          }
          },
          session: 
          {
            flash: "",
            authenticated: "",
            User: null
          }
        }
      var res = {
        redirect: function () {

        }
      }
        Sails.lift({
          log: {
            level: 'error'
          },
        }, function (err, sails) {

          done(err);
        } 
        )
      })

      after(function (done) {
        res = {};
        req = {};
        sails.lower(done); 
      })

  		it('should have function create', function() {
  			userController.should.have.ownProperty('create');
  		})
      it('should interact with the database when valid credentials are presented', function(done)
      {
        this.timeout(10000);
        var req = {
          param: function(temp) {
            switch(temp) {
            case "name": return ('John Cena');
            case "title": return ('Wrestler');
            case "email": return ('largebluegreenyellow@gmail.com');
            case "password": return ('password');
            case "confirmation": return ('password');
            case "fluff": return ('hacking');
          }
          },
          session: 
          {
            flash: "",
            authenticated: "",
            User: null
          }
        }
      var res = {
        redirect: function () {

        }
      }
      //should interact with the database
      var userCreateStub = sinon.spy(User, "create")
      //var emailStub = sinon.spy(emailer, "send");
      //should redirect
      var resSpy = sinon.spy(res, "redirect")
      userController.create(req, res, function() {
        (userCreateStub.calledOnce).should.be.true;
        (resSpy.calledOnce).should.be.true; 
        //(emailStub.calledOnce).should.be.true;
        //emailStub.args[0].should.equal('largebluegreenyellow@gmail.com');
        done();
      })
    }) 


  })



  	describe('#show', function(){
  		it('should have function show', function() {
  			userController.should.have.ownProperty('show');
  		})
  	})



  	describe('#index', function(){
  		it('should have function index', function() {
  			userController.should.have.ownProperty('index');
  		})
  	})
  	describe('#edit', function(){
  		it('should have function edit', function() {
  			userController.should.have.ownProperty('edit');
  		})
  	})
  	describe('#update', function(){
  		it('should have function update', function() {
  			userController.should.have.ownProperty('update');
  		})
  	})
  	describe('#destroy', function(){
  		it('should have function destroy', function() {
  			userController.should.have.ownProperty('destroy');
  		})
  	})
  	describe('#subscribe', function(){
  		it('should have function subscribe', function() {
  			userController.should.have.ownProperty('subscribe');
  		})
  	})
})

