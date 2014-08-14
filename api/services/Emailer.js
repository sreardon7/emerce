//Emailer. Use to send emails. Tested directly, if you wanna test with a controller,
//make sure it uses the proper arguements and thats it. SEE testEmailer.js in the test
//directory!!!
nodemailer = require('nodemailer')
module.exports = {
	//reuable transport obj. i suppose this should be hidden, but for the sake of testing it isnt
	'getTransport': function() {
		return transporter; 
	},

	'getMailOpt': function() {
		return mailingOptions; 
	},

	'send': function(to) {
		setTo(to);
		transporter.sendMail(mailingOptions, function(err, info){
			if(err) return err;
			else {
				console.log('Message sent: '+ info.response);
			}
		})
	},


}

	var mailingOptions =
	 {
		from: 'reardon@gmail.com',
		to: '',
		subject:'Emerce Verification',
		text:'Please follow this link to verify your account',
		html:'<b>Please follow the link to verify your account ' +
		'<a href = "localhost:1337/user/validate"> link </a><b>'
	}

	var transporter = nodemailer.createTransport({
		service: 'Mailgun',
		auth: {
			user: 'postmaster@app27515607.mailgun.org',
			pass: '0m1wyv132ep5'
		}
	})

	function setTo(to){
		if (to)
		{
		mailingOptions.to = to;
		} else 
		{
			err = "no email supplied"
			return(err);
		}
	}
	