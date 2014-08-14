var emailer = require('../api/services/Emailer');
var sinon = require('sinon');
var should = require('should');



describe.skip("Emailer for verifications", function() {
	describe.skip("#send", function() {
		it("Should send a mail to a supplied email", function(done) {
			this.timeout(10000);
			var Send = sinon.spy(emailer, "send");
			emailer.getMailOpt().to.should.equal('');
			emailer.send("largebluegreenyellow@gmail.com", function() {
				emailer.getMailOpt().to.should.equal('largebluegreenyellow@gmail.com');
				(Send.calledOnce).should.be.true;
				console.log("called");
				done();
			}); 
			
		}) 
	})
	it("should have a transporter with the proper details", function() {
	
		emailer.getTransport().transporter.options.service.should.equal("Mailgun");
		emailer.getTransport().transporter.options.auth.pass.should.equal("0m1wyv132ep5");
		emailer.getTransport().transporter.options.auth.user.should.equal("postmaster@app27515607.mailgun.org");
	})

	it("should have mailing options with certain details", function() {
		emailer.getMailOpt().should.be.ok;
		emailer.getMailOpt().from.should.equal('reardon@gmail.com');
		emailer.getMailOpt().should.have.property('to');
		emailer.getMailOpt().subject.should.equal("Emerce Verification");
		emailer.getMailOpt().text.should.equal("Please follow this link to verify your account");
		emailer.getMailOpt().html.should.equal('<b>Please follow the link to verify your account<b>');
	})

	//hid it
	// it("should be able to set the to property of the object mailingOptions", function() {
	// emailer.getMailOpt().to.should.equal('');
	// emailer.setTo('practice@email.com');
	// emailer.getMailOpt().to.should.equal('practice@email.com');
	// })

	// it("should cause an error if set to is called with no argument", function()
	// {
	// 	var spy = sinon.spy(emailer, 'setTo');
	// 	emailer.setTo();
	// 	spy.returnValues[0].should.equal("no email supplied");

	// })

})