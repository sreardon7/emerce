$(document).ready(function() {
	
	// $.validator.addMethod("isDate", function(value){
	// 	{
	// 	if(value) {

	// 		if(value.length === 10)
	// 		{
	// 			for(var i = 0; i < value.length; i++)
	// 			{
	// 				if(i === 4 || i === 7) //must be a - 
	// 				{
	// 					if(value.charAt(i) != '-')
	// 					{
						
	// 						return false; 
	// 					}
	// 				}
	// 				else { //must be a number
	// 					if(value.charAt(i) < '0' || value.charAt(i) > '9')
	// 					{
	// 						return false;
	// 					}
	// 				}
	// 			}
	// 			return true; 
	// 		}
	// 		else {
	// 			return false; //false if wrong length
	// 		}
	// 	} 
	// 	else {
	// 		return false; //false if no date
	// 	}
	// }

	// })


	// $('.form-signin').validate({
	// 	rules: {
	// 		name: {
	// 			required: true
	// 		},
	// 		email: {
	// 			required: true,
	// 			email: true
	// 		},
	// 		password: {
	// 			minlength: 6,
	// 			required: true
	// 		},
	// 		confirmation: {
	// 			minlength: 6,
	// 			equalTo: "#password"
	// 		}
	// 	},
	// 	success: function(element) {
	// 		element
	// 		.text('Brokay').addClass('valid')
	// 	}
	// });

	$('.form-transaction').validate({
		rules: {
			dateOne: {
				required: true
			

			},
			dateTwo: {
				required: true

			},
			success: function(element) {
			element
			.text('Brokay').addClass('valid')
		}

		}
	})

});