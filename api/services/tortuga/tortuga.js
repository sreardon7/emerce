var request = require('request'); 
var use_key = '880bd6d29ec897d2c56b20b8f14e94c4';

//corresponding function for each api call to tortuga gateway, allows easy calling and can store user key

module.exports = {
	
	'status': function(callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		request.get('https://dev.app.idt.net/status?user_key=' + use_key, function(err, response, body)
		{
			if(err) callback(err);

			var status = JSON.parse(body);
			callback(err, status);
		})
	},
	'fund': function(json, callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		request.post({
			uri: 'https://dev.app.idt.net/fund?user_key=' + use_key,
			json: json,
			method: 'POST'
		},
		function(err, response, body) {
			if(err) callback(err);

			callback(err, response); 
		})

	},
	//charge
	'recharge': function(json, callback) {
		process.env['NODE_TLS_REJECT_UNAUTHORIZED']= '0';
		if (json.phone_number && json.amount && json.carrier_code && json.country_code)
		{
		request.post({
			uri: 'https://dev.app.idt.net/recharge?user_key=' + use_key,
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
		
		request.get('https://dev.app.idt.net/products?user_key=' + use_key, function (err, response, body) {
		
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

		request.get('https://dev.app.idt.net/applications/balance?user_key=' + use_key, function (err, response, body) {
			if(err) {
				callback(err);
			}
			else {
				var bal = JSON.parse(body);
				callback(err, bal);
			}
		})
	},

	'transactions': function(callback, from, tom) {
		
			
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
			//clear if they arnt both set, else client side checks for proper format
			if (from == null || tom  == null)
			{
				from = '';
				tom = '';
			}
			request.get('https://dev.app.idt.net/applications/transactions?user_key=' + use_key + '&date_from=' + (from) + '&date_to=' + (tom) + '', function(err, response, body) {
				if (err)
				{
					callback(err);
				} else {
					var trans = JSON.parse(body);
					callback(err, trans);
				}
			})
		
	}
}