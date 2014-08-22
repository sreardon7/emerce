module.exports = {
	'isDate': function(date) {
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
	}
}