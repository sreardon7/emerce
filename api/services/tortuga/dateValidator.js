module.exports = {
	'isDate': function(date) {
		//checks formatting only
		if(date) {

			if(date.length === 10)
			{
				for(var i = 0; i < date.length; i++)
				{
					if(i === 4 || i === 7) //must be a - 
					{
						if(date.charAt(i) != '-')
						{
						
							return false; 
						}
					}
					else { //must be a number
						if(date.charAt(i) < '0' || date.charAt(i) > '9')
						{
							return false;
						}
					}
				}
				return true; 
			}
			else {
				return false; //false if wrong length
			}
		} 
		else {
			return false; //false if no date
		}
	},

	isLarger: function(a, b) {
		//assumes dates pass the isDate test
		var date1 = {
			year: parseInt(a.substring(0, 4)),
			month: parseInt(a.substring(5, 7)),
			day: parseInt(a.substring(8))
		}
		var date2 = {
			year: parseInt(b.substring(0, 4)),
			month: parseInt(b.substring(5, 7)),
			day: parseInt(b.substring(8))
		}
		
		var err; 
		if(date1.year < date2.year)
		{
			err = 'invalid year range';
			return err; 
		} else if(date1.year > date2.year)
		{
			return true;
		} else {
			if (date1.month < date2.month)
			{
				err = 'invalid month range'
				return err;
			} else if (date1.month > date2.month)
			{
				return true; 
			} else {
				if (date1.day < date2.day)
				{
					err = 'invalid day range'
					return err;
				} else {
					return true;
				}
			}
		}	
	},

	isLegal: function(qdate) {
		var date = {
			year: parseInt(qdate.substring(0, 4)),
			month: parseInt(qdate.substring(5, 7)),
			day: parseInt(qdate.substring(8))
		}
		var err; 
		var months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		if(date.year < 1991 || date.year > 2100)
		{
			err = "invalid year"
			return err;
		}
		if(date.month <= 0 || date.month > 12)
		{
			err = "invalid month"
			return err;		
		}
		if(date.day <= 0 || date.day > 31)
		{
			err = "invalid day"
			return err;
		}

		return true;
	}
}