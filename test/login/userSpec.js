var appHelper = require('../helper/appHelper');
var userController = require('../../api/controllers/UserController');
var supertest = require('supertest')
//spyOn obj method, andCallThrough() hasBeenCalled(), andcallface
//try and lift the server in a nested describe
describe('everything', function () 
{
  beforeEach(function (done) {
    console.log("before each")
    appHelper.lift(function ()
      {
        console.log("inside before apphelper cb")
        done()
      });
    console.log('before each after test')
    
  })

  

  describe("the database", function ()
  {
  //testing existing data only. user controller tests will create and delete from the database 
    console.log("begining describe");
    // it("User model should be instantiated", function() {
    //   console.log("begining it: user exists")
    //   expect(User).toBeDefined();
    //   console.log("ending it: user exists");
    // });

    it("existing admin user should exist", function (done)
    {
     console.log("beggining it: user admin")
    
      User.findOneByName("Karma", function foundUser(err, user)
      {
        expect(user).toBeDefined();
        expect(user.admin).toBeDefined();
        expect(user.name).toBeDefined();
        expect(user.online).toBeDefined();
        expect(user.email).toBeDefined();
        console.log("ending it: admin callback");
        done();
      })
    });

    // it("existing regular user should exist", function (done)
    // {
    //   console.log("begining user test");
    //   User.findOneByName("Riven", function foundUser(err, user)
    //   {
    //     expect(user).toBeDefined();
    //     expect(user.admin).toBeDefined();
    //     expect(user.name).toBeDefined();
    //     expect(user.online).toBeDefined();
    //     expect(user.email).toBeDefined();
    //     console.log("ending user test");
    //     done(); 
    //   })
    // })
    console.log("ending describe");
  });

  describe("the user controller", function() 
  {
    console.log("begining user con describe");
    it("should be able to route", function(done)
    {
      console.log("begining new describe");
      expect(userController).toBeDefined();
      supertest = supertest(sails.express.app);
      supertest.get('/user/new').expect(200).end(function(err, res)
        {
          if (err) return done(err);
          console.log("ending new descibe");
          done();
        })
    })
    console.log("ending user controller");
  })

afterEach(function (done) {
    console.log("after each")
    appHelper.lower(function() 
    {
      console.log("insdie apphelp lower cb")
      done();
    });
  })
})