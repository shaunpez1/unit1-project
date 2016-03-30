// Require the module
var Forecast = require('forecast');

module.exports = function(robot) {

  // Initialize
  var forecast = new Forecast({
    service: 'forecast.io',
    key: '6922f6cf9387167222f65a41a234122a',
    units: 'fahrenheit', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 15,
    seconds: 45
    }
  });

  forecast.get([37.7771,-122.4196], function(err, weather) {
    if(err) return console.dir(err);

    // Get overall weather
    robot.hear(/^weather$/i, function(msg) {
      msg.emote("Right now it is " + weather.currently.temperature + " degrees");
      msg.emote("Currently " + weather.currently.summary);
      msg.emote("Feels Like " + weather.currently.apparentTemperature + " degrees");
    });

    // Get parts of weather depending on response
    robot.hear(/^weather [A-z]+/i, function(msg) {
      var pattern = /temperature/ig;
      var pattern_two = /today/ig;
      var pattern_three = /this week/ig;

      // Display current temp
      if(pattern.test(msg.message.text) && !pattern_three.test(msg.message.text)){
        msg.emote("Right now it is " + weather.currently.temperature + " degrees");
      }
      // Display todays forcast
      if(pattern_two.test(msg.message.text)){
        msg.emote("Today: " + weather.hourly.summary);
      }
      // Display this weeks forcast
      if(pattern_three.test(msg.message.text)){
        msg.emote("Next 7 Days: " + weather.daily.summary);
      }
    });

  });
}
