/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var emailer = require('../services/Emailer');
var tortuga = require('../services/tortuga/tortuga')
module.exports = {
	'error': function(req, res) {
		res.view(); 
	},
	'pretopups_post': function(req, res) {
		var json = {
			amount: req.param('amount'),
			carrier_code: req.param('carrier_code'),
			country_code: req.param('country_code')
		}

		res.view({
			json: json
		})
	},
    'topups_post': function(req, res) {
    	var json = {
			phone_number: req.param('phone_number'),
			amount: req.param('amount'),
			carrier_code: req.param('carrier_code'),
			country_code: req.param('country_code')
		}
		var sponse = {
			success: true
		}
		res.view( {
			sponse: sponse,
			json: json
		})
		// tortuga.recharge(json, function(err, sponse)
		// {
		// 	if (err) {
		// 		res.redirect('/user/new');
		// 	}
		// 	else {
		// 	res.view( {
		// 		sponse: sponse,
		// 		json: json
		// 	})
		// 	}
		// })
    },
    // 'trans': function(req, res) {
    // 	res.view()
    // },
	'topups_get' : function(req, res) {
		tortuga.topups_get(function (err, topups) {
			if(err) res.redirect ('user/new');
			res.view({
				topups: topups
			})
		})
	},

	'balance': function(req, res) {
		tortuga.balance(function (err, balance) {
			if (err) res.redirect ('/user/new');
			res.view( {
				balance: balance
			});
		})
	},

   'products': function(req, res){
   		tortuga.products(function (err, products) {
   			if (err) res.redirect ('/user/new');
   			res.view( {
   				products: products
   			});
   		})
   },
   'email': function(req, res){
   	emailer.send("largebluegreenyellow@gmail.com");
   	res.redirect('/user/new'); 
   },
 	//leads a user to the new user page
	'new': function (req, res) {
		console.log(res.locals.flash)
		res.view();
		
	},

	//creates a new user
	//client side validation
	//model also has validation
'create': function (req, res, next) {


		var userObj = {
			name: req.param('name'),
			title: req.param('title'),
			email: req.param('email'),
			password: req.param('password'),
			confirmation: req.param('confirmation')

		}
		User.create(userObj, function userCreate (err, user) {
			if (err)
			{

				console.log(err)
				req.session.flash = 
				{
					err: err
				}
				console.log(req.session.flash)
				res.redirect("/user/new")
			} else
			{
				emailer.send("largebluegreenyellow@gmail.com");
				req.session.authenticated = true;
				req.session.User = user;
				user.online = true; 
				user.save(function(err, user) {
					if (err) return next(err);

				user.action = ' signed-up and logged in.'
				User.publishCreate(user);


				//res.json(user);
				res.redirect('/user/show/'+user.id)
				})
			}

		})	
	},


	'show': function(req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if(err) return next(err);
			if (!user) return next();

			res.view({
				user: user
			});
		}) ;
	},

	'index': function(req, res, next) {
		User.find(function foundUsers (err, users)
		{
			if(err) return(next);
			res.view({
				users: users
			})
		})
	},

	'edit': function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err, user) 
		{
			if(err) return next(err);
			if(!user) return next();
			res.view({ 
				user: user
			})
		})
	},

	'update': function (req, res, next) 
	{

		if(req.session.User.admin) {
			var userObj = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email'),
				admin: req.param('admin')
			}
		} else {
			var userObj = {
				name: req.param('name'),
				title: req.param('title'),
				email: req.param('email')
			}
		}

		User.update(req.param('id'), userObj, function userUpdated(err)
		{
			if (err) return res.redirect('/user/edit/'+req.param('id'));

			res.redirect('/user/show/'+req.param('id'));
		})
	},


	'destroy': function (req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist');

			User.destroy(req.param('id'), function userDestroyed(err)
			{
				if(err) return next(err);

				User.publishUpdate(user.id, {
					name: user.name,
					action: ' has been destroyed'
				}) 
				
				User.publishDestroy(user.id)
		
			})

			res.redirect('/user');
		});
	},

	subscribe: function(req, res) {
		User.find(function foundUser(err, users) {
			if(err) return (err);

			User.subscribe(req.socket); //class
			User.subscribe(req.socket, users); //instance

			res.send(200);
		})
	},

	'validate': function(req, res) {
		res.redirect('/');
	},


	/*regular user methods */
	'userBalance': function(req, res) {

		res.view();
	},
	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
