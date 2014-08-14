module.exports = function(req, res, next) {
	//needs fix for server restart and other things. wrap in an if, if session
	var sessionUserMatchedId = req.session.User.id === req.param('id');
	var isAdmin = req.session.User.admin;
	//ERROR, req param id is undefined. fix when convienient

	if(!(sessionUserMatchedId || isAdmin)) {
		var noRightsError = [{name: 'no rights', message: 'you must be an admin'}]
		req.session.flash = {
			err: noRightError
		}
	res.redirect('/session/new');
	}
	next();
	};