
var tortuga = require('../services/tortuga/tortuga')
module.exports = {

	'products': function (req, res){
		tortuga.products(function (err, products) {
   			if (err) res.redirect ('/user/new');
   			res.view({products: products})
   			
   		})


	 },

	 'pretopups': function (req, res, json) {
	 	var json = {
			amount: req.param('amount'),
			carrier_code: req.param('carrier_code'),
			country_code: req.param('country_code')
		}
	 	res.view ({
	 		json: json
	 	})
	 },

	 'payment': function (req, res, json) {
	 	var json = {
			amount: req.param('amount'),
			carrier_code: req.param('carrier_code'),
			country_code: req.param('country_code'),
			phone_number: req.param('phone_number')
		}
	 	res.view ({
	 		json: json
	 	})
	 },

	 'topups': function (req, res, json)
	 {

	 	var json = {
			phone_number: req.param('phone_number'),
			amount: req.param('amount'),
			carrier_code: req.param('carrier_code'),
			country_code: req.param('country_code')
		}

		tortuga.topups_post(json, function(err, sponse)
		{
			if (err) {
				console.log(err);
				res.redirect('/user/new');
			}
			else {
				
			res.view( {
				sponse: sponse,
				json: json
			})
			}
		})
	 }
	//,

	// 'checkout': function() {


	// }

}