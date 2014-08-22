var vdate = require('../api/services/tortuga/dateValidator')

describe("dateValidation", function() {
	describe("#isDate", function() {

		it("should return a boolean if the date is valid", function() {
			vdate.should.be.ok;
			vdate.isDate('2014-08-08').should.be.true;
		})
		it('should return false if an invalid format is supplied', function() {
			vdate.isDate('44-44-4444').should.be.false;
			vdate.isDate('23/33/3333').should.be.false;
			vdate.isDate('2333/33/33').should.be.false;
			vdate.isDate('2333:33:33').should.be.false;
		})
		it('should return false if an invalid date is supplied', function() {
			vdate.isDate('fred').should.be.false;
			vdate.isDate('333333').should.be.false;
			vdate.isDate('3333333333')
		})
		it('should return false if nothing is supplied', function() {
			vdate.isDate().should.be.false;
		})
	})

	describe('#isLarger', function() {
		var a, b;
		before(function(done) {
			a = {
				august: "2014-08-08"
			}
			b = {
				dayDown: "2014-08-07",
				monthDown: "2014-07-08",
				yearDown: "2013-08-08",
				yearDownDayUp: '2013-08-09',
				yearDownMonthUp: '2013-09-08',
				MonthDownDayUp: '2014-07-09'
		
			}
			done();
		})

		it("should return true if a > b", function() {
			
			vdate.isLarger.should.be.ok;
			//year
			vdate.isLarger(a.august, b.yearDown).should.be.true
			//month
			vdate.isLarger(a.august, b.monthDown).should.be.true
			//day
			vdate.isLarger(a.august, b.dayDown).should.be.true

			vdate.isLarger(a.august, b.yearDownDayUp).should.be.true
			vdate.isLarger(a.august, b.yearDownMonthUp).should.be.true
			vdate.isLarger(a.august, b.MonthDownDayUp).should.be.true

		})

		it('should return false if a < b', function () {
			vdate.isLarger.should.be.ok;
			//year
			vdate.isLarger(b.yearDown, a.august).should.eql('invalid year range')
			//month
			vdate.isLarger(b.monthDown, a.august).should.eql('invalid month range')
			//day
			vdate.isLarger(b.dayDown, a.august).should.eql('invalid day range')
		})
	})
	describe("#isLegal", function(){
		it("should be a real live date", function() {
			var dates = {
				a: "2013-08-09",
				b: "2014-01-01",
				c: "1992-07-08"
			}
			vdate.isLegal.should.be.ok;
			vdate.isLegal(dates.a).should.be.true;
			vdate.isLegal(dates.b).should.be.true;
			vdate.isLegal(dates.c).should.be.true;
		})
		it("should be an invalid", function() {
			var dates = {
				invalidYearA: "1900-08-09",
				invalidYearB: "3000-08-09",
				invalidMonthA: "2014-88-01",
				invalidMonthB: "2014-00-03",
				invalidDayA: "2014-09-00",
				invalidDayB: "2014-12-32"
			}

			var date = [1, 2, 3];
			console.log(date);
			vdate.isLegal.should.be.ok;
			vdate.isLegal(dates.invalidYearA).should.eql('invalid year');
			vdate.isLegal(dates.invalidYearB).should.be.eql('invalid year');
			vdate.isLegal(dates.invalidMonthA).should.be.eql('invalid month');
			vdate.isLegal(dates.invalidMonthB).should.be.eql('invalid month');
			vdate.isLegal(dates.invalidDayA).should.be.eql('invalid day');
			vdate.isLegal(dates.invalidDayB).should.be.eql('invalid day');
		})
	})

})