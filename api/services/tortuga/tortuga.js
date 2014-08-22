var request = require('request'); 
var use_key = 'e0ee2bc6d1979f49c6437e27b06a0101';

//corresponding function for each api call to tortuga gateway, allows easy calling and can store user key

module.exports = {
	
	'status': function(callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		request.get('https://dev.app.idt.net/v1/status?user_key=' + use_key, function(err, response, body)
		{
			if(err) callback(err);

			var status = JSON.parse(body);
			callback(err, status);
		})
	},
	'fund': function(json, callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		request.post({
			uri: 'https://dev.app.idt.net/v1/charges?user_key=' + use_key,
			json: json,
			method: 'POST'
		},
		function(err, response, body) {
			if(err) callback(err);

			callback(err, response); 
		})

	},
	//charge
	'topups_post': function(json, callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		if (json.phone_number && json.amount && json.carrier_code && json.country_code)
		{
		request.post({
			uri: 'https://dev.app.idt.net/v1/imtu/topups?user_key=' + use_key,
			json: json,
			method: 'POST'
		}, function (err, response, body) {
			callback(err, body);

		})
		}
		else {
			err = "Please call with a full request json"
			callback(err);
		}

	},
	'products': function(callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		
		request.get('https://dev.app.idt.net/v1/imtu/products?user_key=' + use_key, function (err, response, body) {
		
				if (err) {
					callback(err);
				}
				else {
				var prod = JSON.parse(body);
				callback(err, prod);
				}
		})			
	},

	'balance': function(callback) {
		
		process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

		request.get('https://dev.app.idt.net/v1/imtu/balance?user_key=' + use_key, function (err, response, body) {
			if(err) {
				callback(err);
			}
			else {
				var bal = JSON.parse(body);
				callback(err, bal);
			}
		})
	},

	'topups_get': function(callback) {
		//from and tom deleted, might get that functionality back
			
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
			//clear if they arnt both set, else client side checks for proper format
			/*if (from == null || tom  == null)
			{
				from = '';
				tom = '';
			}*/
			request.get('https://dev.app.idt.net/v1/imtu/topups?user_key=' + use_key, function(err, response, body) {
				if (err)
				{
					callback(err);
				} else {
					var topup = JSON.parse(body).data;
					callback(err, topup);
				}
			})
		
	},
	'charges_get': function(callback) {
		
			
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

			request.get('https://dev.app.idt.net/v1/imtu/charges?user_key=' + use_key, function(err, response, body) {
				if (err)
				{
					callback(err);
				} else {
					var charge = JSON.parse(body).data;
					callback(err, charge);
				}
			})
		
	}
}