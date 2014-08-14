var prodjson = {
  "attributes": {
   "Code": "76561",
   "Name": "CLARO UNIVERSAL $10",
   "ProductType": "I",
   "DisplayName": "CLARO UNIVERSAL $10",
   "Denomination": "1000",
   "CustomerServiceNumber": "8665995752",
   "Default": "N"
  },
  "ProductCountryList": {


   "ProductCountry": [{
     "attributes": {
      "CountryCode": "SV",
      "CountryName": "El Salvador"
     },
     "CarrierList": {
      "Carrier": [
       {
        "attributes": {
         "CarrierCode": "Claro",
         "CarrierName": "Claro"
        }
       }
      ]
     }
    }]
    }
  }

module.exports = {
  'prodlist': function() {
    return prodjson;
  }
}
