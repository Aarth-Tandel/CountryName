'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const {dialogflow} = require('actions-on-google');

const app = dialogflow({ debug: true });
const COUNTRY = {
  "United States": 1,
  "Canada": 2,
  "Afghanistan": 3,
  "Albania": 4,
  "Algeria": 5,
  "American Samoa": 6,
  "Andorra": 7,
  "Angola": 8,
  "Anguilla": 9,
  "Antarctica": 10,
  "Antigua and/or Barbuda": 11,
  "Argentina": 12,
  "Armenia": 13,
  "Aruba": 14,
  "Australia": 15,
  "Austria": 16,
  "Azerbaijan": 17,
  "Bahamas": 18,
  "Bahrain": 19,
  "Bangladesh": 20,
  "Barbados": 21,
  "Belarus": 22,
  "Belgium": 23,
  "Belize": 24,
  "Benin": 25,
  "Bermuda": 26,
  "Bhutan": 27,
  "Bolivia": 28,
  "Bosnia and Herzegovina": 29,
  "Botswana": 30,
  "Bouvet Island": 31,
  "Brazil": 32,
  "British lndian Ocean Territory": 33,
  "Brunei Darussalam": 34,
  "Bulgaria": 35,
  "Burkina Faso": 36,
  "Burundi": 37,
  "Cambodia": 38,
  "Cameroon": 39,
  "Cape Verde": 40,
  "Cayman Islands": 41,
  "Central African Republic": 42,
  "Chad": 43,
  "Chile": 44,
  "China": 45,
  "Christmas Island": 46,
  "Cocos (Keeling) Islands": 47,
  "Colombia": 48,
  "Comoros": 49,
  "Congo": 50,
  "Cook Islands": 51,
  "Costa Rica": 52,
  "Croatia": 53,
  "Cuba": 54,
  "Cyprus": 55,
  "Czech Republic": 56,
  "Denmark": 57,
  "Djibouti": 58,
  "Dominica": 59,
  "Dominican Republic": 60,
  "East Timor": 61,
  "Ecudaor": 62,
  "Egypt": 63,
  "El Salvador": 64,
  "Equatorial Guinea": 65,
  "Eritrea": 66,
  "Estonia": 67,
  "Ethiopia": 68,
  "Falkland Islands": 69,
  "Faroe Islands": 70,
  "Fiji": 71,
  "Finland": 72,
  "France": 73,
  "Gabon": 74,
  "Gambia": 75,
  "Georgia": 76,
  "Germany": 77,
  "Ghana": 78,
  "Gibraltar": 79,
  "Greece": 80,
  "Greenland": 81,
  "Grenada": 82,
  "Guadeloupe": 83,
  "Guam": 84,
  "Guatemala": 85,
  "Guinea": 86,
  "Guinea-Bissau": 87,
  "Guyana": 88,
  "Haiti": 89,
  "Heard and Mc Donald Islands": 90,
  "Honduras": 91,
  "Hong Kong": 92,
  "Hungary": 93,
  "Iceland": 94,
  "India": 95,
  "Indonesia": 96,
  "Iran": 97,
  "Iraq": 98,
  "Ireland": 99,
  "Israel": 100,
  "Italy": 101,
  "Ivory Coast": 102,
  "Jamaica": 103,
  "Japan": 104,
  "Jordan": 105,
  "Kazakhstan": 106,
  "Kenya": 107,
  "Kiribati": 108,
  "South Korea": 109,
  "North Korea": 110,
  "Kuwait": 111,
  "Kyrgyzstan": 112,
  "Lao People's Democratic Republic": 112,
  "Latvia": 113,
  "Lebanon": 114,
  "Lesotho": 115,
  "Liberia": 116,
  "Libyan Arab Jamahiriya": 117,
  "Liechtenstein": 118,
  "Lithuania": 119,
  "Luxembourg": 120,
  "Macau": 121,
  "Macedonia": 122,
  "Madagascar": 123,
  "Malawi": 124,
  "Malaysia": 125,
  "Maldives": 126,
  "Mali": 127,
  "Malta": 128,
  "Marshall Islands": 129,
  "Martinique": 130,
  "Mauritania": 131,
  "Mauritius": 132,
  "Mayotte": 133,
  "Mexico": 134,
  "Micronesia": 135,
  "Moldova": 136,
  "Monaco": 137,
  "Mongolia": 138,
  "Montserrat": 139,
  "Morocco": 140,
  "Mozambique": 141,
  "Myanmar": 142,
  "Namibia": 143,
  "Nauru": 144,
  "Nepal": 145,
  "Netherlands": 146,
  "New Caledonia": 147,
  "New Zealand": 148,
  "Nicaragua": 149,
  "Niger": 150,
  "Nigeria": 151,
  "Niue": 152,
  "Norfork Island": 153,
  "Northern Mariana Islands": 154,
  "Norway": 155,
  "Oman": 156,
  "Pakistan": 157,
  "Palau": 158,
  "Panama": 159,
  "Papua New Guinea": 160,
  "Paraguay": 161,
  "Peru": 162,
  "Philippines": 163,
  "Pitcairn": 164,
  "Poland": 165,
  "Portugal": 166,
  "Puerto Rico": 167,
  "Qatar": 168,
  "Reunion": 169,
  "Romania": 170,
  "Russian": 171,
  "Rwanda": 172,
  "Saint Kitts and Nevis": 173,
  "Saint Lucia": 174,
  "Saint Vincent and the Grenadines": 175,
  "Samoa": 176,
  "San Marino": 177,
  "Sao Tome and Principe": 178,
  "Saudi Arabia": 179,
  "Senegal": 180,
  "Seychelles": 181,
  "Sierra Leone": 182,
  "Singapore": 183,
  "Slovakia": 184,
  "Slovenia": 185,
  "Solomon Islands": 186,
  "Somalia": 187,
  "South Africa": 188,
  "South Georgia South Sandwich Islands": 189,
  "Spain": 190,
  "Sri Lanka": 191,
  "St. Helena": 192,
  "St. Pierre and Miquelon": 193,
  "Sudan": 194,
  "Suriname": 195,
  "Svalbarn and Jan Mayen Islands": 196,
  "Swaziland": 197,
  "Sweden": 198,
  "Switzerland": 199,
  "Syrian Arab Republic": 200,
  "Taiwan": 201,
  "Tajikistan": 202,
  "Tanzania": 203,
  "Thailand": 204,
  "Togo": 205,
  "Tokelau": 206,
  "Tonga": 207,
  "Trinidad and Tobago": 208,
  "Tunisia": 209,
  "Turkey": 210,
  "Turkmenistan": 211,
  "Turks and Caicos Islands": 212,
  "Tuvalu": 213,
  "Uganda": 214,
  "Ukraine": 215,
  "United Arab Emirates": 216,
  "United Kingdom": 217,
  "United States minor outlying islands": 218,
  "Uruguay": 219,
  "Uzbekistan": 220,
  "Vanuatu": 221,
  "Vatican City State": 222,
  "Venezuela": 223,
  "Vietnam": 224,
  "Virigan Islands": 225,
  "Wallis and Futuna Islands": 226,
  "Western Sahara": 227,
  "Yemen": 228,
  "Yugoslavia": 229,
  "Zaire": 230,
  "Zambia": 231,
  "Zimbabwe:": 232
}

var COUNTRY_CODE = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

app.intent('Country', (conv) => {
  console.log("DEBUG : " + JSON.stringify(conv.body));
  console.log("User List : " + JSON.stringify(conv.body.originalDetectIntentRequest.payload.user['userStorage']));

  // get what country user said and respective countryCode
  var userCountry = JSON.stringify(conv.body.queryResult.parameters['geo-country']);
  userCountry = JSON.parse(userCountry);
  var userCountryCode = COUNTRY[userCountry];
  console.log("User Country : " + userCountry);
  console.log("COUNTRY CODE : " + userCountryCode);

  // get current user countryCodeList
  var countryCodeList = [];
  var alreadySopkenCountryCodeDummy = (conv.body.originalDetectIntentRequest.payload.user['userStorage']);
  var alreadySopkenCountryCode = JSON.parse(alreadySopkenCountryCodeDummy);
  console.log("DB : " + alreadySopkenCountryCode.data);
  for (var x = 0; x < alreadySopkenCountryCode.data.length; x++) {
    countryCodeList.push(alreadySopkenCountryCode.data[x]);
    console.log("From DB : " + alreadySopkenCountryCode.data[x]);
  }
  var lastAssistantChar = '-1';
  if (countryCodeList.length > 0) {
    var lastCountryCode = countryCodeList[countryCodeList.length - 1];
    for (var country in COUNTRY) {
      var countryCode = COUNTRY[country];
      if (countryCode === lastCountryCode) {
        lastAssistantChar = country[0];
        
      }
    }
  }

  if ((userCountry[0].toLowerCase() !== lastAssistantChar.toLowerCase()) && (lastAssistantChar !== '-1')) {
    conv.ask("Please Name a country starting with '" + lastAssistantChar + "'");
  } else {

    //countryCodeList = JSON.parse(countryCodeList);

    // check userCountryCode present in current seesion countryCodeList
    var found = false;
    for (var i = 0; i < countryCodeList.length; i++) {
      console.log("Already Spoken : " + countryCodeList[i]);
      if (countryCodeList[i] === userCountryCode) {
        found = true;
        break;
      }
    }
    if (found) {
      conv.user.storage = countryCodeList;
      conv.ask("Hey, You Can't name same country again, Think Hard (:_:)");
    } else {
      // add userCountry to current session CountryCodeList

      countryCodeList.push(userCountryCode);
      var countryCodeDict = {};
      for (i = 0; i < countryCodeList.length; i++) {
        countryCodeDict[countryCodeList[i]] = i;
      }
      console.log(countryCodeDict);

      var lastChar = userCountry[userCountry.length - 1];
      var possibleCountryList = []
      for (country in COUNTRY) {
        //if (COUNTRY.hasOwnProperty(country)) {
        //console.log("2Country = " + country);
        //console.log("2Country Code = " + COUNTRY[country]);
        countryCode = COUNTRY[country];
        if (!(countryCode in countryCodeDict) && (country[0] === lastChar.toUpperCase())) {
          possibleCountryList.push(country);
        }
        //}
      }
      if (possibleCountryList.length > 0) {
        // choose random country from possible courty List
        var nextCountry = possibleCountryList[Math.floor(Math.random() * possibleCountryList.length)];
        var assistantCountryCode = COUNTRY[nextCountry];
        countryCodeList.push(assistantCountryCode);
        conv.user.storage = countryCodeList;
        conv.ask(nextCountry);
      } else {
        // User won the game So congratulation him !!!.
        // reset user storage
        conv.user.storage = {};
        conv.ask("You Played really Well. Congratulation ... ");
        conv.ask("Want to play one more time ...? ");
      }
    }
  }

});

app.intent('Default Welcome Intent', (conv) => {
  var countryCodeList = COUNTRY_CODE;
  console.log("Welcome : " + countryCodeList);
  conv.user.storage = {};
  conv.ask('Hey, Welcome to Country Game, Please name a country')
});

app.intent('Default Fallback Intent', (conv) => {
  conv.ask('Sorry, can you please repeat')
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);





