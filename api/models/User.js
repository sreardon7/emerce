/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

  	title: {
  		type: 'string'
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string'
  	},

    admin: {
      type: 'Boolean',
      defaultsTo: false
    },

    online: {
      type: 'Boolean',
      defaultsTo: false
    },

    balance: {
      type: 'number',
      defaultsTo: 0
    },

  	toJSON: function() {
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  	  return obj; 	
    }
    
  },

  beforeValidation: function (values, next) {
    console.log(values)
    if (typeof values.admin !== 'undefined') {
      if(values.admin === 'unchecked') {
        values.admin = false;
      } else if (values.admin[1] === 'on') {

      }
     } 
      next()
  },
  beforeCreate: function (values, next) {
    //password validation
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });

  }

};
