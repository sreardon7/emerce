
var sails = require('sails/lib/app')
var Sails = new sails();
process.env.PORT = 1111;

var sailsprocess;

module.exports.lift = function (cb) {
  console.log("begining lift on port: " + process.env.PORT)
  Sails.lift({
    log: {
      level: 'error'
    },
  
    hooks: {
      grunt: false,
    }
  }, function (err, sails) {
 
    sailsprocess = sails;
    console.log("lift callback")
    //done(err);
    cb();
  });
};

module.exports.lower = function (back) {
  console.log("begining lower")
  sailsprocess.lower(function(err)
    {
      console.log("lower callback")
      console.log(back);
      back();
    })
      
};

