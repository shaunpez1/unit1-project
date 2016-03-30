module.exports = function(robot) {

    // Get current date
    var today = new Date();
    var month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    var date = today.getFullYear() + month + day;

    // Pull in data daily data from Hornblower cruises
    robot.http("https://hornblower-web.ungerboeck.com/datadisplay/EventData.svc/GetEventCalData/10/ALL/14/ALL/" + date + "/" + date).header('Accept', 'application/json').get()(function(err, res, body) {
        if(err) return console.dir(err);

        var data = JSON.parse(body);
        data = data.GetEventCalDataResult.DataResults;

        // Get general list of tours for the day
        robot.hear(/^cruises|tours$/i, function(msg){
            for(var i = 0; i < data.length; i++){
                msg.emote((i+1) + ". " + data[i].EventName);
            }
        });

        robot.hear(/^choose a cruise|tour [A-z]+/i, function(msg){
          var cruises = [];
          for(var i = 0; i < data.length; i++){
            cruises[i] = data[i].EventName;
          }
          msg.emote(msg.random(cruises));
        });

        // Get more detailed information about said cruise
        robot.hear(/^cruise|tour [0-9]+/ig, function(msg){
            var message = msg.message.text.split(" ");
            var number = message[1] - 1;

            if(number < data.length){
              msg.emote(data[number].EventName + "\n Price: $" + data[number].AdultTicket.toFixed( 2 ) + "\n Boarding Location: " + data[number].BoardingLocation  + "\n Start Time: " + getFormattedTime(data[number].StartTime));
            }else{
              msg.emote("Invalid cruise choice");
            }
        });

    });

}
// Convert military time to normal time
function getFormattedTime(fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);

    return hours + ':' + minutes + amPm;
};
